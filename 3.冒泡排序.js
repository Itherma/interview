/*
 * @Description: 冒泡排序
 * @Author: xujian
 * @Date: 2022-02-16 14:17:24
 */

const data = [2, 3, 6, 10, 23]

// 冒泡排序
function maopao(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
}

maopao(data);

console.log(data);