/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-02-16 11:14:26
 */
// 实现 ob 和 watch 方法，希望当方法传入 watch 函数时会执行一次，之后每次修改 data 上的属性时，会触发对应的 console

/* const data = ob({ count: 0, foo: 'test' });

watch(() => {
  console.log('watch-count', data.count);
});
watch(() => {
  console.log('watch-foo', data.foo);
});

data.count += 1;
console.log('showcount', data.count);
delete data.count;
data.foo = 'test2';
 */

const callbacks = []

function ob(data) {
  return new Proxy(data, {
    get: function (target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      callbacks.forEach(fn => fn())
      return true
    }
  });
}

function watch(fn) {
  callbacks.push(fn)
}

const data = ob({ count: 0, foo: 'test', obj: { a: 1 } });

watch(() => {
  console.log('watch-count', data.count);
});
watch(() => {
  console.log('watch-foo', data.foo);
});

// data.count += 1;
// console.log('showcount', data.count);
// delete data.count;
// data.foo = 'test2';
data.obj.a = 3