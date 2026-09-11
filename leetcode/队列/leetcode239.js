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
    const len = nums.length  
    const deQueue = []
    let i = 0, j = k-1
};