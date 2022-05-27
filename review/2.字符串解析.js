/* 
用例：
const test1 = "a22[b]a11[b33[c]]";
// abbabccbcc
const test2 = "2[3[c]]a2a";
// cccccca2a
const test3 = "[abc][d]3[e2]4";
// abcde2e2e24
*/

function parseString(str) {
  // 匹配多位数字和单个非数字:  a22[b]a11[b33[c]] => a、22、[、b、]、a、11、[、b、33、[、c、]、]
  const matchArr = str.match(/\d+|\D/g);

  // // 当前字符串是否包含嵌套规则 或 嵌套栈是否处理完成
  let stackCleared = !matchArr.some((s) => s.includes("["));

  // // 不包含直接返回字符串
  if (stackCleared) return str;

  // 声明状态栈
  const stack = [];

  // 重复次数
  let multiple = 1;

  // 当前结果
  let result = "";

  // 循环判断处理每一个字符串
  for (let s of matchArr) {
    if (!isNaN(s)) {
      // 如果是数字，并且栈中元素没有处理完，就让当前的 multiple 等于这个数字，用于后续入栈做状态保留
      // 否则直接拼接到当前 result 后面
      if(s==='2'){
        console.log(first)
      }
      if (!stackCleared ) {
        multiple = s;
      } else {
        result += s;
      }
      // multiple = s
    } else if (s === "[") {
      stackCleared = false;
      // 如果左括号, 将当前的 multiple 和 result 推入栈中用于保留状态
      stack.push({ mult: multiple, res: result });
      // 这里需要将 result 置为空字符串，为什么?
      // 因为不重置为 ""，就会影响到下一次的 stack 元素入栈时 result 的结果，因为次时的 multiple 仅仅是针对之前的 result
      result = "";
      multiple = 1;
    } else if (s === "]") {
      // 如果是右括号, 说明到了全是右括号的那一边，因为左右括号总是一一对应的，就需要出栈做字符串拼接。
      // 这也是最关键一步：最终字符串结果是 当前的 result 重复出栈元素的 mult 次数, 然后加上出栈元素的 res
      // 仔细思考下为啥要这样做？
      // 实际上字符串拼接并不是栈中每一个元素的 res 重复 mult 加上之前的，而是当前元素的 res 加上当前 result 重复下一个元素的 mult 次数
      // 因为数字总是在字母前面，所以要向前错位取值拼接
      const { mult, res } = stack.pop();
      result = res + result.repeat(mult);
      console.log("--->", result);
      // 如果栈是空的，说明嵌套循环的已经处理完了，再出现数字，直接做拼接就好了
      if (!stack.length) stackCleared = true;
    } else {
      // 如果是字符串，就正常累加到 result
      console.log(result);
      result += s;
    }
  }
  return result;
}

// const test1 = "a2[b]a2[b2[c]]";
// console.log(parseString(test1)) // abbabccbcc
// const test2 = "2[3[c]]a2a";
// console.log(parseString(test2)) // cccccca2a
const test3 = "[abc][d]3[e2]4";
console.log(parseString(test3)); // abcde2e2e24
