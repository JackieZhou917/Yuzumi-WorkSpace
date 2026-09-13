// https://mock.presstime.cn/mock/6aa658b87cc06682f8b63e41/zjj/question-naire#!method=get
// 1. 向后端发请求
// 2. 展示数据

let current_num = 1  // 第几题
let questionList = []
let userAnswer = []  // 存放用户的答案
let selectedId = null
let userSocore = null

getData().then((data) => {
    console.log(data);
    questionList = data
    setHead(data)  // 设置页面头部
    setQuestion(data)  // 设置问题
})

function getData() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://mock.presstime.cn/mock/6aa658b87cc06682f8b63e41/zjj/question-naire#!method=get', true)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText).questions)
            }
        }
    })

}

function setHead(arr) {
    // 总题数
    const totalNum = document.querySelector('.totalNum')
    totalNum.innerText = arr.length

    // 第几题，应该用一个变量来表示，将来点击下一题，该变量要累加
    const currentNum = document.querySelector('.currentNum')
    currentNum.innerText = current_num

    // 进度条的宽度
    const rangeProgress = document.querySelector('.range-progress')
    rangeProgress.style.width = (current_num / arr.length) * 100 + '%'
}

function setQuestion(arr) {
    // 设置 Q 第几题
    const num = document.getElementById('num')
    num.innerText = current_num

    // 设置问题
    const questionTitle = document.querySelector('.question-title')
    questionTitle.innerText = arr[current_num - 1].topic_name

    // 设置选项
    const topicAnswer = arr[current_num - 1].topic_answer
    // 循环创建 li 选项
    let lis = ''
    for (let i = 0; i < topicAnswer.length; i++) {
        const li = `<li class="item" onClick=selectItem(${topicAnswer[i].topic_answer_id})>
                        <input type="radio" name="item" id="item${topicAnswer[i].topic_answer_id}">
                        <label for="item${topicAnswer[i].topic_answer_id}">${topicAnswer[i].answer_name} </label>
                    </li>`
        lis = lis + li
    }
    // 往 ul 中添加 li
    const list = document.querySelector('.list')
    list.innerHTML = lis
}

function selectItem(id) {
    selectedId = id
}

// 点下一题
const next = document.querySelector('.next')
const submit = document.querySelector('.submit')

next.addEventListener('click', () => {
    if(selectedId == null){
        alert('请选择答案')
        return
    }
    // 保存答案
    userAnswer.push(selectedId)
    selectedId = null
    current_num ++
    // 更新页面(头部、问题)
    setHead(questionList)
    setQuestion(questionList)

    // 当来到最后一题时，应该展示提交按钮
    if(questionList.length == current_num){
        next.classList.add('hide')
        submit.classList.remove('hide')
    }
})

submit.addEventListener('click', () => {
    if(selectedId == null){
        alert('请选择答案')
        return
    }
    // 保存答案
    userAnswer.push(selectedId)
    // 计算分数
    calulateScore()
    // 跳转页面并携带数据
    location.href = `./result.html?score=${userSocore}`
})

function calulateScore() {
    let score = 0
    for(let i = 0; i < questionList.length; i++){
        const questionItem = questionList[i]
        for(let j = 0; j < questionItem.topic_answer.length; j++) {
            const answerItem = questionItem.topic_answer[j]
            if(answerItem.topic_answer_id == userAnswer[i] && answerItem.is_standard_answer)
                score += (100 / questionList.length)
        }
    }
    userSocore = score
}