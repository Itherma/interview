/*
 * @Description: 二分查找
 * @Author: xujian
 * @Date: 2022-02-16 14:17:35
 */

const data = [2, 3, 6, 10, 23, 45, 67, 99]

// 找出 值为 10 的索引
function erfen(arr, target) {
  let left = 0 // 左边索引
  let right = arr.length - 1 // 右边索引
  while (left <= right) { // 左边索引小于等于右边索引条件成立
    let mid = Math.floor((left + right) / 2) // 中间索引
    const guess = arr[mid] // 中间索引的值
    if (target === guess) { // 值相等直接返回中间索引
      return mid
    }
    if (target < guess) { // 目标值比中间小，则右索引等于中间索引-1
      right = mid - 1
    } else {
      left = mid + 1 // 目标值比中间大，则左索引等于中间索引+1
    }
  }
  return -1
}

const idx = erfen(data, 23)

console.log(idx);