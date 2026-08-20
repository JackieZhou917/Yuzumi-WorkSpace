import dotenv from 'dotenv'
import path from 'path'   // node 内部封装好的路径模块
import { fileURLToPath } from 'url'
import {createCrawl, createCrawlOpenAI} from 'x-crawl'


dotenv.config({
    path: path.join(path.dirname(fileURLToPath(import.meta.url)), // 获取当前文件所在目录
        '..',                                                     // 上一级目录
        '.env.local'
    )
})

// 创建爬虫应用 (内置了 Puppeteer 浏览器，可以打开网页)
const crawlApp = createCrawl()

async function main() {
    const url = 'https://juejin.cn/hot/articles'
    const limit = 50

    console.log(`打开页面: ${url}`);
    
    // 用内置的 Puppeteer 浏览器打开页面
    const res = await crawlApp.crawlPage(url)
    const {page, browser} = res.data  // Page: 页面对象，browser: 浏览器对象

    // 等待文章加载完成
    await page.waitForSelector('article-item-link', { timeout: 30000 }) // 等待20秒 文章加载完毕
    
    // 提取整个文章列表的 html (后续交给 AI 解析)
    const targetHTML = await page.$eval('.hot-list', (el) => el.outerHTML)

    // console.log(targetHTML);

    // AI 解析 targetHTML 提取结构
}   

main()