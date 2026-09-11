let nums = [1,3,-1,-3,5,3,6,7], k = 3

// var maxSlidingWindow = function(nums, k) {
//     const len = nums.length
//     const res = []
//     let i = 0, j = k-1
//     while(j < len) {
//         res.push(getMax(nums, i, j))
//         i++
//         j++
//     }
//     return res
// };

// function getMax(nums, i, j) {
//     let max = nums[i]
//     for(let k = i+1; k <= j; k++) {
//         if(nums[k] > max) {
//             max = nums[k]
//         }
//     }
//     return max
// }

var maxSlidingWindow = function(nums, k) {
    const deQueue = []
    const res = []

    for (let j = 0; j < nums.length; j++) {

        // 1. 队尾小于当前元素的全部删除
        while (
            deQueue.length && nums[deQueue[deQueue.length - 1]] <= nums[j]
        ) {
            deQueue.pop()
        }

        // 2. 当前元素入队
        deQueue.push(j)

        // 3. 队头元素已经离开窗口
        if (deQueue[0] <= j - k) {
            deQueue.shift()
        }

        // 4. 窗口形成后，记录最大值
        if (j >= k - 1) {
            res.push(nums[deQueue[0]])
        }
    }

    return res
}