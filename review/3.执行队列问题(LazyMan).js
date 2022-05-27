/* 
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 
以此类推。 
*/

function LazyMan(name) {
  return new TasKList(name);
}

class TasKList {
  constructor(name) {
    this.tasks = [];
    this.tasks.push(() => {
      console.log(`Hi! This is ${name}!`);
      this.next();
    });
    Promise.resolve().then(() => this.next());
  }

  delay(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time * 1000);
    });
  }

  next() {
    const fn = this.tasks.shift();
    fn && fn();
  }

  sleep(time) {
    this.tasks.push(async () => {
      await this.delay(time);
      this.next();
    });
    return this;
  }

  sleepFirst(time) {
    this.tasks.unshift(async () => {
      console.log(`sleepFirst ${time} 秒...`)
      await this.delay(time);
      this.next();
    });
    return this;
  }

  eat(food) {
    this.tasks.push(() => {
      console.log(`Eat ${food} ~~`);
      this.next();
    });
    return this;
  }
}

LazyMan("Hank").sleep(1).eat("dinner").sleep(2).eat("supper").sleepFirst(3);
