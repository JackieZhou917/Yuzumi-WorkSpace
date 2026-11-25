# 项目起手
1. pnpm init 初始化项目

2. pnpm install typescript --save-dev 安装typescript

3. tsc --init 初始化tsconfig.json

4. pnpm add ai @ai-sdk/openai dotenv (ai 这个SDK 主要是以openai的标准用来调用openai的api)

5. pnpm add -D tsx @types/node

# ai 这个SDK
- generateText 生成文本
- streamText 流式生成文本, 得到一个可迭代对象, 可以用for await of 循环遍历, 每次循环得到一个文本块

# 进程持续
- readline 读取用户输入
- process.stdout.write 写入标准输出
- process.stdin.write 写入标准输入
- process.exit 退出进程

# 基本的模型调用三要素
1. 模型调用：StreamConsumer --- 解析工具调用，推理过程，Token用量等多种事件
<!-- streamText + model -->
2. 消息管理：四层上下文管理 --- 截断、时间衰减修剪、LLM摘要压缩、Cache优化
<!-- 全量messages -->
3. 交互循环： AgentLoop --- while(true) {think -> act -> observe}
<!-- ask递归调用 -->

# 从能聊天到能干活
- user: 南昌今天的天气怎么样? agent: [调用get_waether 工具] -> 南昌今天晴，30摄氏度，东南风2级

- SDK ai 提供的 streamText 方法存在自动循环机制
  用户提问 -> 模型说要调用工具 -> 调用工具 -> 得到工具返回结果 -> 再次调用模型 -> 返回给用户

  - 可定制性太差 --- 我们没有办法在循环的步骤中间插入自定义的逻辑（比如：添加日志、添加缓存、添加错误处理等）

# 上保险丝
1. 死循环检测：连续调用相同工具 + 相同参数？ 打断循环
2. Token 预算：烧了多少token？超过预算？ 打断循环
3. API容错：请求重试，降低模型

  - 从能跑 到 ‘跑不挂’