// 求最长递增子序列的基本思路

/**
 * 1. 贪心算法 + 二分查找 + 回溯还原
 * 2. 主要还是索引跟元素容易相互混淆,比较绕
 */

const sortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const unsortArr = [3, 2, 4, 6, 5, 8, 7, 9, 11];

// 1.首先实现一个简单版本的最长地址子序列：即不考虑结果的顺序正确性，只考虑求最长递增子序列的长度值
function getSeq1(seq) {
  const result = [seq[0]]; // 先预估第一项是最小的,放在结果数组里
  for (let i = 1; i < seq.length; i++) {
    const currItem = seq[i]; // 获取当前遍历的值

    // 当前值与结果数组的最后一项进行比较
    if (currItem > result[result.length - 1]) {
      // 如果当前元素比末尾元素大 则放到结果数组的末尾
      result.push(currItem);
    } else {
      // 如果当前值比最后一项小,就通过查二分找出结果元素数组里面比他大（更有潜力）的元素替换当前这个值
      let start = 0;
      let end = result.length;
      while (start < end) {
        let middleIdx = Math.floor((start + end) / 2);
        // 拿到中间值
        const middle = result[middleIdx];
        if (currItem > middle) {
          start = middleIdx + 1;
        } else {
          end = middleIdx;
        }
      }
      result[start] = seq[i]; // 直接用当前的索引换掉
    }
  }

  return result;
}

console.log(getSeq1(unsortArr)); // [ 2, 4, 5, 7, 9, 11 ]

// 2. 接下来实现一个完整顺序正确的最长递增子序列算法，采用的方法就是记录之前的索引序列，最后还原回去

function getSeq2(seq) {}
