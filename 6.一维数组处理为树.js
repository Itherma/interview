/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-02-18 13:54:00
 */

const data = [
  { "id": "01", "name": "张大大", "pid": "" },
  { "id": "02", "name": "小亮", "pid": "01" },
  { "id": "03", "name": "小美", "pid": "01" },
  { "id": "04", "name": "老马", "pid": "01" },
  { "id": "05", "name": "老王", "pid": "01" },
  { "id": "06", "name": "老李", "pid": "01" },
  { "id": "07", "name": "小丽", "pid": "02" },
  { "id": "08", "name": "大光", "pid": "02" },
  { "id": "09", "name": "小高", "pid": "03" },
  { "id": "10", "name": "小刘", "pid": "04" },
  { "id": "11", "name": "小华", "pid": "04" },
  { "id": "12", "name": "小李", "pid": "04" },
  { "id": "13", "name": "小赵", "pid": "05" },
  { "id": "14", "name": "小强", "pid": "05" },
  { "id": "15", "name": "小涛", "pid": "06" }
]

function generateTree(data) {
  const tree = []; // 用于存储树的数组
  const map = {} // 记录已经处理过的节点
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    // 创建一个树节点
    const node = { ...item, children: [] }

    map[item.id] = node  // 记录已生成节点的元素,key是id, value是该节点

    if (map[item.pid]) { // 如果记录中有当前节点的pid，说明当前节点是该节点的子集
      const parent = map[item.pid]
      parent.children.push(node) // 将当前节点放到其子集中
    } else {
      tree.push(node) // 否则直接放到树形数组里
    }

  }
  return tree
}

const tree = generateTree(data)

console.log(tree);



// 将树形拍平成一维数组
function flattenTree(tree, arr = []) {
  for (let i = 0; i < arr.length; i++) {
    const { id, name, pid, children } = tree[i]
    arr.push({ item, name, pid })
    if (children.length) {
      flattenTree(children, arr)
    }
  }
  return arr
}

function flattenTree2(tree, arr = []) {
  return tree.reduce((pre, { children, ...prop }) => {
    return flattenTree2(children, pre.concat(prop))
  }, arr)
}