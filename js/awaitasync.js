// 标志async 就代表这个函数会返回promise;

async function main() { }
let result = main();
// result instanceof Promise;
// await 右边一般是一个promise对象, 也可以是其他值
// 返回promise成功的值, 如果失败了用try catch 获取失败的值

// 如果是其他值, 则将此值作为await的返回值



