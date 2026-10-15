import { createClient } from '../mcp/client.js'
import axios from 'axios'

export class LLM {
  mcpClient = createClient()
  
  constructor (model, base_url, api_key = null) {
    this.model = model
    this.base_url = base_url
    this.api_key = api_key
  }

  get headers() {
    if (this.api_key) {
      return {
        'Authorization': `Bearer ${this.api_key}`
      }
    } else {
      return {
        'Content-Type': 'application/json'
      }
    }
  }

  async listTools() {
    return (await (await this.mcpClient).listTools()).tools.map(tool => (
      {
        type: 'function',
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema
        }
      }
    ))
  }

  async callTool(tool_name, tool_args) {
    const result = await (await this.mcpClient).callTool({
      name: tool_name,
      arguments: tool_args
    })
    return {
      role: 'tool',
      name: tool_name,
      content: result.content[0].text
    }
  }

  async chat (messages) {
    const tools = await this.listTools()  // [工具函数的表述]
    const response = await axios.post(`${this.base_url}/api/chat`, {
      model: this.model,
      messages,
      tools,
      stream: false
    }, {
      headers: this.headers
    })

    const data = response.data

    const reply = data.message.content  // LLM本身能解决问题，得到返回的结果
    
    const tool_calls = data.message.tool_calls  // LLM不能解决问题，说需要工具函数

    if (tool_calls && tool_calls.length > 0) {
      const toolResArr = tool_calls.map((tool_call) => (
        // 触发LLM需要的工具
        this.callTool(tool_call.function.name, tool_call.function.arguments)
      ))
      const results = await Promise.all(toolResArr)
      // 再次跟LLM通信，将工具的结果传给LLM
      return await this.chat([...messages, ...results])

    }

    return reply
  }

}

// new LLM('qwen3:1.7b', 'http://localhost:11434', xxx).chat([{rolxxxx}])