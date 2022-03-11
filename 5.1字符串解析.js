/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-03-10 17:16:23
 */
function decodeString(str) {
  const match = str.match(/\d+|\D/g)

  let stack = [], multi = 0, result = '';

  for (s of match) {
    if (s === '[') { // 当 `s` 为 `[` 时，将当前 `multi` 和 result 入栈，并分别置空置 0
      stack.push([multi, result]);
      result = ''
      multi = 0
    } else if (s === ']') { // 当 `s` 为 `]` 时，`stack` 出栈，拼接字符串 `result = res + result.repeat(mul)`
      const [mul, res] = stack.pop()
      result = res + result.repeat(mul)
    } else if (!isNaN(s)) {
      multi = s // 当 `s` 为数字时，将数字字符转化为数字 `multi`，用于后续倍数计算
    } else {
      result += s // 当 `s` 为字母时，在 `result` 尾部添加 `s`
    }
  }

  return result;
}

const test1 = "a2[b11[c]]";

const res = decodeString(test1)

console.log('结果-->', res);