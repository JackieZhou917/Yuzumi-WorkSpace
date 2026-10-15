// 构建 MCPServer
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod'
import { exec } from 'child_process'

// 创建一个mcp server
const server = new McpServer({
  name: 'Demo',
  version: '1.0.0'
})

// 工具注册
server.tool('listFiles', '列出执行目录下的文件', { path: z.string() }, ({ path }) => {
  return new Promise((resolve, reject) => {
    exec(`dir ${path}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行命令出错：${error}`)
        resolve({
          content: [{type: 'text', text: `执行命令出错：${error}`}]
        })
        return 
      }

      if (stderr) {
        console.error(`命令stderr：${stderr}`)
      }

      resolve({
        content: [{type: 'text', text: `已获取到目录${path}下的文件列表：\n\`\`\`\n${stdout}\`\`\`\n`}]
      })

    })
  })
})



// 开始从某一个进程中接收消息和给该进程发送消息
const transport = new StdioServerTransport()  // transport 用来跟进程交互
await server.connect(transport)
console.log('mcp服务启动');


