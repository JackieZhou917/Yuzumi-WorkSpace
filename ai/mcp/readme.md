# FunctionCalling Tools
让LLM 唤起工具的这一行为，缺乏标准 (缺乏一套让LLM在工具池子中高效，准确的找到正确的工具并使用的交互规则)

导致：
1. 决策瘫痪：有些工具函数功能是相似的，容易选错
2. 感知过载：工具太多，选不过来，因为要传递工具函数的详情，所以这些描述都会被塞到上下文，占用过多上下文空间，挤占了模型用于推理和思考的空间


# MCP （Model Context Protocol）
- 主要是用来制定一套标准，统一LLM与外部工具、系统和数据源的交互方式
- 工具被定义为 服务器（MCPserver）上可执行的功能模块，通过MCP协议暴露给客户端，供LLM调用

1. 工具搜索
2. 程序化工具调用
3. 工具使用示例


客户端 --》 服务端  --》            LLM --》 服务端 -- 》 客户端
                       MCPserver 


# 一个MCP服务的开发流程
1. pnpm i @modelcontextprotocol/sdk zod   --- （zod 用来自动生成JSON Schema）
2. 创建一个MCP服务
3. 往MCP服务上注册工具
4. 将MCP服务关联到另一个进程

5. 开发一个MCP客户端来测试 MCPServer

<!-- 
用户在Trae提问 --》
问题给到Trae  --》 
Trae跟LLM交互（输出Tools列表） -- 》
LLM反馈无法解决（需要某个工具） --》
Trae将工具执行，并将结果传给LLM  --》 
LLM返回工具函数的执行结果给到Trae --》 
展示给用户 
-->

用户在Trae提问 --》 
问题给到Trae (MCPClient)  --》 
Trae跟LLM交互 -- 》 
LLM反馈无法解决（需要某个工具） --》 
Trae链接到MCPServer，调用MCPServer中注册好的那个工具 --》 
Trae将工具执行结果传给LLM  --》 
LLM返回工具函数的执行结果给到Trae --》 
展示给用户


- LLM如何借助MCP这一手段了解到有哪些工具函数可用，并且在某个场景下LLM如何准确知道自己此时血药那个工具函数来帮忙


# MCP 和 LLM 链接
1. 服务端先借助MCPClient 向MCPServer 获取已注册的工具函数
2. 跟LLM通信并配置好 tools 属性
3. 当模型返回需要调用 xx工具时，递归式的执行重复向LLM通信，并合并messages
4. 最终返回出 LLM 最后一次的结果


# MCP是什么？有什么作用？你在开发过程中写过什么MCP？怎么实现的？