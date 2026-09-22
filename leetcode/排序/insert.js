// const arr = [1, 4, 7, 2, 5, 3]
const arr = [5, 2, 1, 4,3]
// [1, 2, 5]
// 首先认定只有一个元素的数组就是有序的，所以我认为当前数组的第一位就是有序的
// 从数组的第二位开始读取，考虑将该值插入到已经有序的数组的哪个位置

function insertSort(arr) {
    let len = arr.length
    let res = [arr[0]]
    for(let i = 1; i < len; i++){
        // 从有序的数组中，找到第一个大于当前元素的位置
        let inserted = false // 标记是否已经插入
        for(let j = 0; j < res.length; j++){
            if (arr[i] < res[j]) {
                res.splice(j, 0, arr[i])
                inserted = true
                break
            }
        }
        // ✅ 如果比所有元素都大，插到末尾
        if (!inserted) {
            res.push(arr[i])
        }
    }
    return res
}

const res = insertSort(arr)
console.log(res); // [1,2,3,4,5,7]

