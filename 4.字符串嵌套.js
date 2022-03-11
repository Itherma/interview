/*
 * @Description: 字符串嵌套
 * @Author: xujian
 * @Date: 2022-02-16 16:24:34
 */

/* 
const test1 = "a2[b]a2[b2[c]]";
// abbabccbcc
const test2 = "2[3[c]]a2a";
// cccccca2a
const test3 = "[abc][d]3[e2]4";
// abcde2e2e24
*/

const numberExp = /^[0-9]*$/

// 1.当前是字母, 直接加到结果上
// 2.当前是字母, 后面是数字

function stringGen(str) {
  let result = ''
  const stack = []
  let cur = 0
  while (str.length < cur) {
    const item = str[cur]
    const nextItem = str[cur + 1]
  }
}

const test1 = "a12[b]a22[b24[c]]";

// stringGen(test1);

function fn2(demoStr) {
  const arr = [];
  const splitArr = demoStr.match(/(\d+)|(\D)/g) || []; // 切割数字和非数字
  const len = splitArr.length;
  let tempArr = arr;
  let obj = null;
  let parent = null;
  while (splitArr.length) {
    const item = splitArr.shift();
    if (item === "[") {
      obj = {
        parent,
        children: [],
      };
      tempArr.push(obj);
      tempArr = obj.children
      parent = obj
      continue;
    }
    if (item === "]") {
      obj = obj.parent
      parent = obj?.parent || null
      tempArr = parent?.children || arr
      continue;
    }
    if (parent) {
      tempArr.push(item);
    } else {
      arr.push(item);
    }
  }
  return arr;
}

console.log(fn2(test1))


function fn3(arr) {
  const strArr = [];
  const tempArr = arr.reverse()
  tempArr.forEach((item, i) => {
    if (typeof item === 'object') {
      strArr.push(fn3(item.children).reverse().join(''))
      return
    }
    if (!Number.isNaN(Number(item)) && typeof tempArr[i - 1] === 'object') {
      const repeatNum = Number(item)
      const repeatStr = strArr.pop()
      strArr.push(repeatStr.repeat(repeatNum));
    } else {
      strArr.push(item)
    }
  })
  return strArr
}

// var s = fn3(fn2(test1))

// console.log(s);


/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (source) {
  const numStack = [];
  let res = '';
  let i = 0;
  while (i < source.length) {
    const char = source[i];

    const isLastCharNumber = !isNaN(Number(source[i - 1]));

    switch (true) {
      case /[a-z]/.test(char): {
        // 如果上一位字符是数字,那么代表前面至少有一位数字是源数据,需要直接添加到结果中
        if (isLastCharNumber) {
          res += String(numStack.pop());
        }
        res += char;
        i++;
        break;
      }
      case !isNaN(Number(char)): {
        // 处理连续数字的情况
        // 也可以方便处理末尾的多位数字源数据(下面的注释会解释)
        if (isLastCharNumber) {
          const lastNum = numStack.pop();
          const newNum = String(lastNum) + char;
          numStack.push(Number(newNum));
        } else {
          numStack.push(Number(char));
        }
        i++;
        break;
      }
      case char === '[': {
        const lastChar = source[i - 1];
        // 一开始就是左方括号或上一位字符不是数字
        // 表示本次重复次数为 1
        if (!lastChar || isNaN(Number(lastChar))) {
          numStack.push(1);
        }
        let j = i + 1;
        let param = '';
        const leftStack = ['['];

        // 在这里进行括号匹配,扫描方括号里面的输入
        // 用于递归调用得出结果
        while (leftStack.length > 0) {
          const char = source[j];

          if (char === '[') {
            param += char;
            leftStack.push('[');
          } else if (char === ']') {
            leftStack.pop();
            // 如果是本次扫描最开始的左方括号匹配的右方括号
            // 就不需要当做递归的入参的一部分
            // 否则需要当做入参的一部分传入
            if (leftStack.length > 0) {
              param += char;
            }
          } else {
            param += char;
          }

          j++;
        }

        // 取出本次结果的重复次数
        let count = numStack.pop();
        // 将扫描得到的方括号里面的值用来递归调用解码
        let result = decodeString(param);
        while (count > 0) {
          res += result;
          count--;
        }
        // 处理完这一串方括号的串之后
        // 直接把指针从左方括号处跳到与其匹配的右方括号的下一位
        i = j;
      }
    }
  }

  // 如果遍历完成数字栈里面仍有数据,表示这些是源数据结尾的数字
  // 需要拼接到输出的末尾
  // 因为上面已经对连续数字的输入情况做了处理,可以知道这个栈如果还有数据,一定只有一个数据
  // 直接取栈顶元素拼接即可
  if (numStack.length > 0) {
    res += numStack.pop();
  }

  return res;
};

function isWord(char) {
  const charCode = char.charCodeAt()
  return charCode >= 97 && charCode <= 122
}





