/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// var merge = function(nums1, m, nums2, n) {
//     nums1.splice(m, n);
//     let i = 0, j = 0;
//     while (i < nums1.length && j < n){
//         if(nums2[j] < nums1[i]){
//             nums1.splice(i, 0, nums2[j]);
//             j++;
//         }
//         i++;
//     }
//     while(j < n){
//         nums1.push(nums2[j]);
//         j++;
//     }
// };

var merge = function(nums1, m, nums2, n) {
    let i = m - 1;         // nums1 有效元素的最后一个
    let j = n - 1;         // nums2 最后一个
    let k = m + n - 1;     // nums1 最后一个位置

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }

    // 如果 nums2 还有剩余，继续放进 nums1
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
};

var isValid = function(s) {
    const match = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    for(let i = 0; i < s.length; i++){
        cur = s[i];

        if(cur == '(' || cur == '[' || cur == '{'){
            stack.push(cur);
        } else {
            if (stack.length == 0 ) {
                return false
            } else if(match[stack.pop()] !== cur) {
                return false
            }
        }
    }
    return !stack.length;
};