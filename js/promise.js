function doSomething(callback) {
    setTimeout(() => {
        console.log('hello');
        callback('Operation completed');
    }, 3000);
}

doSomething((message) => {
    console.log(message); // 输出: Operation completed
});

// 回调地狱
function firstOperation(callback) {
    setTimeout(() => {
        console.log('First operation');
        callback('First result');
    }, 1000);
}

function secondOperation(input, callback) {
    setTimeout(() => {
        console.log('Second operation with input:', input);
        callback('Second result');
    }, 1000);
}

function thirdOperation(input, callback) {
    setTimeout(() => {
        console.log('Third operation with input:', input);
        callback('Third result');
    }, 1000);
}

firstOperation((firstResult) => {
    secondOperation(firstResult, (secondResult) => {
        thirdOperation(secondResult, (thirdResult) => {
            console.log('All operations completed with result:', thirdResult);
        });
    });
});

// 用promise改善
function firstOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('First operation');
            resolve('First result');
        }, 1000);
    });
}

function secondOperation(input, callback) {
    setTimeout(() => {
        console.log('Second operation with input:', input);
        callback('Second result');
    }, 1000);
}

function thirdOperation(input, callback) {
    setTimeout(() => {
        console.log('Third operation with input:', input);
        callback('Third result');
    }, 1000);
}

firstOperation((firstResult) => {
    secondOperation(firstResult, (secondResult) => {
        thirdOperation(secondResult, (thirdResult) => {
            console.log('All operations completed with result:', thirdResult);
        });
    });
});


// 内部实现原理

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 使用封装的delay函数
delay(2000).then(() => {
    console.log('2 seconds have passed');
});

// 事件循环执行顺序
// 执行所有的同步任务（在调用栈中）。
// 执行所有的微任务（在微任务队列中）。
// 执行一个宏任务（从宏任务队列中取出）。
// 重复以上步骤。
// 宏任务（Macrotasks）：包括 setTimeout、setInterval、setImmediate（Node.js）以及一些 I / O 操作和 UI 渲染任务。宏任务在每次事件循环的迭代中执行一个，然后检查微任务队列。

// 微任务（Microtasks）：包括 Promise 的.then() 回调、MutationObserver 回调和 queueMicrotask 等。微任务在当前宏任务完成后、下一个宏任务开始前执行。
// 先微后宏:


// 在JavaScript中，微任务（Microtasks）优先于宏任务（Macrotasks）执行的设计目的是为了更快地处理异步操作，从而提高代码的响应性和性能。以下是具体的原因和目的：

// 1. 确保更快的异步操作处理
// 微任务通常用于执行那些需要在当前事件循环内尽快处理的操作，例如：

// Promise 的.then() 回调
// MutationObserver 回调
// queueMicrotask
// 将这些任务放在微任务队列中，并在当前事件循环末尾优先执行，可以确保这些重要的异步操作尽快得到处理。

// 2. 保持代码的顺序和逻辑一致性
// 通过优先处理微任务，可以确保在处理更大、更复杂的宏任务之前，完成一些小而重要的任务。这有助于保持代码的顺序和逻辑一致性。

// 例如，当使用 Promise 时，.then() 回调将被放入微任务队列，确保在下一个宏任务执行之前立即处理。这意味着依赖于 Promise 结果的代码可以尽快执行，而不必等待较长时间的宏任务完成。

// 3. 减少延迟，提高响应速度
// 微任务通常用于那些需要迅速处理的小任务，例如 DOM 变更通知和 Promise 的回调。这些任务的延迟较短，通过优先执行它们，可以减少用户界面的延迟，提高应用的响应速度和性能。

// 4. 改善用户体验
// 优先处理微任务有助于在用户界面操作和后台任务之间提供更平滑的体验。例如，当用户界面更新依赖于异步操作（如 Promise），通过优先处理这些微任务，可以确保界面尽快更新，提供更好的用户体验。

// 1. 调用`delay(2000)`
// 2. `delay` 函数返回一个 Promise 对象
// //调用 delay 函数并返回一个 Promise 对象时，Promise 构造函数内部的异步操作（例如 setTimeout）会立即开始执行。
// 3. `setTimeout` 设置计时器
// 4. 调用栈清空，事件循环开始检查微任务队列
// 5. 定时器到期，`setTimeout` 回调函数被放入消息队列
// 6. 事件循环执行消息队列中的回调函数，调用`resolve`
// 7. Promise 状态变为 `fulfilled`，`.then` 回调被放入微任务队列
// 8. 事件循环执行微任务队列中的 `.then` 回调，输出`2 seconds have passed`


// Promise中的resolve和then
// resolve：resolve是Promise构造函数中的一个参数，用于将Promise的状态从pending变为fulfilled。当调用resolve时，Promise的状态变为fulfilled，并且会触发通过.then()注册的回调函数。

// then：.then()方法用于注册一个回调函数，该回调函数将在Promise状态变为fulfilled（即调用resolve之后）时被执行。

https://juejin.cn/post/6844904147884441608  关于promise的原理


console.log(1); // 同步任务

setTimeout(() => {
    console.log(2); // 宏任务
}, 0);

let a = new Promise((resolve) => {
    console.log(3); // 立即执行
    resolve(); // 立即执行
}).then(() => {
    console.log(4); // 微任务
}).then(() => {
    console.log(5); // 微任务
});

console.log(6); // 同步任务

执行顺序: 1, 3, 6, 4, 5, 2



const fs = require('fs');

fs.readFile = function (path, callback) {
    // 使用异步 I/O 操作读取文件
    process.nextTick(() => {
        try {
            // 模拟文件读取操作
            const data = someLowLevelReadFileFunction(path); // 底层文件读取函数
            callback(null, data); // 文件读取成功，调用回调函数并传递数据
        } catch (err) {
            callback(err, null); // 文件读取失败，调用回调函数并传递错误
        }
    });
};

// 模拟底层文件读取函数
function someLowLevelReadFileFunction(path) {
    // 实际实现中，这个函数会调用操作系统的文件读取 API
    // 这里我们只是返回一个模拟的数据
    return Buffer.from('文件内容');
}

fs.readFile(path, (err, data) => {
    if (err) {
        throw err;
    }
    if (data) {
        console.log(data);
    }
});

// 后面的callback就是有结果后你要做什么

// 用promise封装

const promise = new Promise((resolve, reject) => {
    // 会立即执行这里当 promise返回时
    fs.readFile(path, (err, data) => {
        // 这里的callback会放到宏任务里, 等node 执行完fs.readfile操作后执行
        if (err) {
            reject(err); // 改promise对象状态为reject
        }
        if (data) {
            resolve(data); //改promise对象状态为fullfilled
        }
    });
});

promise.then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
});

// 简化版then
class MyPromise {
    constructor(executor) {
        this.state = 'pending'; // 初始状态
        this.value = null; // Promise 的值
        this.callbacks = []; // 存储回调函数

        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.callbacks.forEach(callback => this.handleCallback(callback));
            }
        };

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.value = reason;
                this.callbacks.forEach(callback => this.handleCallback(callback));
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.handleCallback({
                onFulfilled,
                onRejected,
                resolve,
                reject
            });
        });
    }

    handleCallback(callback) {
        if (this.state === 'fulfilled') {
            callback.onFulfilled(this.value);
        } else if (this.state === 'rejected') {
            callback.onRejected(this.value);
        } else {
            this.callbacks.push(callback);
        }
    }
}


//多个then的情况
fetch('https://api.example.com/data') // 这个api就是返回的Promise对象
    .then(response => response.json())
    .then(data => {
        console.log('第一步：获取数据', data);
        return fetch(`https://api.example.com/related-data/${data.id}`);
    })
    .then(response => response.json())
    .then(relatedData => {
        console.log('第二步：获取相关数据', relatedData);
        // 进一步处理相关数据
    })
    .catch(error => {
        console.error('发生错误:', error);
    });