/*
 * @Description: js模板引擎实现
 * @Author: xujian
 * @Date: 2022-02-17 10:14:28
 */
// 模板引擎函数实现的本质，就是将模板中HTML结构与JavaScript语句、变量分离，
// 通过Function构造函数 + apply(call)动态生成具有数据性的HTML代码。
// 而如果要考虑性能的话，可以将模板进行缓存处理。

const template = `
<ul>
  <% if (obj.show) { %>
    <% for (var i = 0; i < obj.users.length; i++) { %>
      <li>
        <a href="<%= obj.users[i].url %>">
          <%= obj.users[i].name %>
        </a>
      </li>
    <% } %>
  <% } else { %>
    <p>不展示列表</p>
  <% } %>
</ul>
`
/*
 * 1. 创建数组arr，再拼接字符串【arr.push('】
 * 2. 遇到换行回车，替换为空字符串【''】
 * 3. 【\ 】反引号 和【' 】单引号 转义
 * 4. 遇到<%= xxx %>时，替换为【');arr.push(xxx); arr.push('】
 * 5. 遇到<%时，替换为【');】
 * 6. 遇到>%时，替换为【arr.push('】
 * 7. 最后拼接字符串【'); return p.join('');】
*/

// 在代码中，因为有优先级的原因，一定要这样的顺序，否则会匹配出错。如下

function getTemplate(tpl, data) {
  // 1. 创建数组arr，再拼接字符串【arr.push('】
  let result = `let p = []; p.push('`

  // 2. 遇到换行回车，替换为空字符串【''】
  result += `${tpl.replace(/[\r\n\t]/g, '')

    //  3. 【\ 】反引号 和【' 】单引号 转义
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")

    // 3. 遇到<%= xxx %>，替换为【');arr.push(xxx); arr.push('】
    .replace(/<%=\s*([^%>]+?)\s*%>/g, "'); p.push($1); p.push('")

    // 4. 遇到<%时，替换为【');】
    .replace(/<%/g, "');")

    // 5. 遇到>%时，替换为【arr.push('】
    .replace(/%>/g, "p.push('")
    }`

  // 6. 最后拼接字符串【'); return p.join('');】
  result += "'); return p.join('');"
  return result
}

const res = getTemplate(template)

console.log(res);


