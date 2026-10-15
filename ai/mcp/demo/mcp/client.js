import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

export async function createClient() {
  const client = new Client({
    name: 'Demo',
    version: '1.0.0'
  })

  const transport = new StdioClientTransport({ // 定义可以启用MCPServer 的指令
    command: 'node',
    args: ['mcp/server.js']
  })

  try {
    await client.connect(transport)
    console.log('mcp客户端连接成功');
  } catch (error) {
    console.error(`mcp客户端链接失败${error}`)
    throw error
  }

  return client

}
