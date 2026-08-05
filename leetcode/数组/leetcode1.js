
let nums = [2,7,11,15], target = 9;

var twoSum = function(nums, target) {
    // 暴力两层遍历
    // let arr = []
    // for (let i = 0; i < nums.length -1; i++){
    //     for(let j = i + 1; j < nums.length; j++){
    //         if(nums[i] + nums[j] == target){
    //             arr.push(i, j)
    //             break
    //         }
    //     }
    // }
    // return arr

    // 哈希表
    // const map = new Map();

    // for(let i = 0; i < nums.length; i++){
    //     let diff = target - nums[i]
    //     if(map.has(diff)){
    //         return [map.get(diff), i];
    //     }
    //     map.set(nums[i], i)
    // }
    // return []

    // 对象
    let obj = {}
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i]
        if(obj.hasOwnProperty(diff)){
            return [obj[diff], i]
        }
        obj[nums[i]] = i
    }
    return []
};

console.log(twoSum(nums, target))

// 时间复杂度
// 空间复杂度