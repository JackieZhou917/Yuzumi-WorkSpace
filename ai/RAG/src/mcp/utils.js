import { join } from 'node:path'
import { promises as fs } from 'fs'


// --------------------------------------------------
const getCurrentDir = () => import.meta.dirname

export async function loadPrompt(promptName) {
  try{
    // 获取当前目录地址
    const currentDir = getCurrentDir()

    const promptPath = join(currentDir, 'prompts',`${promptName}.md`)

    // 读取提示词，返回内容
    const content = await fs.readFile(promptPath, 'utf-8')
    return content
  } catch(error){
    throw new Error(`读取${promptName}失败：${error.message}`)
  }

}