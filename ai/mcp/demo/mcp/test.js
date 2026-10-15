import { createClient } from './client.js'

const client = await createClient()  // 创建MCPClient, 内部会自动连接到MCPServer

const result = await client.callTool({
  name: 'listFiles',
  arguments: {
    path: '.'
  }
})

console.log('Server 提供的 tools:')
console.log(JSON.stringify(await client.listTools(), null, 2))
console.log('\n\n调用listFiles');
console.log(result);

