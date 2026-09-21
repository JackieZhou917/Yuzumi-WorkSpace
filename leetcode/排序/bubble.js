const arr = [1, 4, 7, 2, 5, 3]



function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let swapped = false; // 标记本轮是否发生交换
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素交换
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swapped = true;
      }
    }
    // 如果本轮一次交换都没有，数组已有序，直接退出
    if (!swapped) break;
  }
}

bubbleSort(arr)
console.log(arr);
