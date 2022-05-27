
function toBaseNumber(num, base){
  const stack = [];
  let result = ''
  while(num > 0) {
    const reset = num % base;
    stack.push(reset);
    num = Math.floor(num / base);
  }
  console.log(stack)
  while(stack.length > 0){
    result+=stack.pop()
  }
  return result
}

/* note: 
 *  先取余, 将余数放入栈中, 然后再除以进制数
 *  42 转 2进制
 *  42 / 2 = 21 -------0 （低位）
 *  21 / 2 = 10 -------1
 *  10 / 2 = 5 -------0
 *  5 / 2 = 2 -------1
 *  2 / 2 = 1 -------0 （高位）
 *  1 / 2 = 0 -------1
 *  结果 ==> 101010
 * 
 * /