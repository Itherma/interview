/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-03-11 14:55:19
 */

const weakMap = new WeakMap()
const map = new Map()

  (function () {
    const obj1 = { a: 1 }
    const obj2 = { b: 2 }

    weakMap.set(obj1, 'weakMap')
    map.set(obj2, 'map')

  })()

console.log(weakMap)
console.log(map)

