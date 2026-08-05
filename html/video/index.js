// 鼠标控制视频倍速播放
// 1. 鼠标控制滑块的高度
// 2. 获取到滑块这个容器
// 3. 鼠标移动，控制滑块的高度
// 4. 监听鼠标在白色容器中的移动事件

const speedBar = document.querySelector('.speed-bar');
const speed = document.querySelector('.speed');
const video = document.querySelector('.video');

speed.addEventListener('mousemove', (e) => {
    // 修改 bar 的高度
    // 获取鼠标在 Y 轴坐标的变化
    console.log(e.pageY);
    
    const y = e.pageY - speed.offsetTop;  // 鼠标在白色容器中移动的距离
    const percent = y / speed.offsetHeight;  // 鼠标在白色容器中移动的距离
    const height = Math.round(percent * 100) + '%';

    speedBar.style.height = height;

    // 文本修改
    const min = 0.5;
    const max = 5;
    const playbackRate = percent * (max - min) + min;
    speedBar.textContent = playbackRate.toFixed(2) + 'x';

    // 视频播放速修改
    video.playbackRate = playbackRate;
})

console.log(speedBar);
