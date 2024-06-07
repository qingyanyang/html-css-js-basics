// 在讨论 XMLHttpRequest、HTTP 和 AJAX 之间的区别时，我们实际上是在讨论不同层面的概念和技术：

// 1. HTTP
// HTTP（HyperText Transfer Protocol）是一种用于传输超文本（如 HTML 页面）的应用层网络协议。它是互联网上所有数据交换的基础，定义了客户端（通常是 web 浏览器）与服务器之间请求和响应的格式。

// 用途：HTTP 是一种无状态协议，主要用于在网络上从服务器获取资源，如网页、图片、视频等。
// 特点：HTTP 协议支持多种请求方法，如 GET、POST、PUT、DELETE 等，允许进行多种类型的数据交互。
// 2. XMLHttpRequest
// XMLHttpRequest（XHR）是一种浏览器内置的对象，允许 JavaScript 创建 HTTP 或 HTTPS 请求到服务器，不需要重新加载页面。这使得开发人员能够实现页面内容的动态更新。

// 用途：XMLHttpRequest 用于在背景中与服务器交换数据。它可以用来实现 AJAX 请求。
// 特点：
// 支持同步和异步通信。
// 可以发送各种 HTTP 请求，如 GET、POST 等。
// 能够处理包括但不限于文本和 XML 的数据格式。
// 3. AJAX
// AJAX（Asynchronous JavaScript and XML）不是一种新的技术，而是一种使用现有技术的新方法。AJAX 将多种技术组合在一起，包括 HTML 或 XHTML、层叠样式表、JavaScript、DOM、XML、XSLT 以及最重要的 XMLHttpRequest 对象。

// 用途：AJAX 允许网页异步地更新数据，这意味着可以在不重新加载整个网页的情况下，更新其部分内容。这对于创建快速动态网页体验非常有用。
// 特点：
// 通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着用户在网页上的操作不会被页面刷新打断。
// AJAX 通常用于加载页面或应用的小部分，从而保持页面的其余部分不变。
// 总结
// HTTP 是一种协议，定义了客户端和服务器之间的通信规则。
// XMLHttpRequest 是实现 AJAX 的一种方式，提供了在 JavaScript 中发起 HTTP 请求的能力。
// AJAX 是一种利用多种技术（包括 HTTP 和 XMLHttpRequest）来实现的网页技术，主要目的是实现页面的异步更新。
// 换句话说，HTTP 是交通规则，XMLHttpRequest 是运送工具，而 AJAX 是利用这些规则和工具来快速、高效地传送数据的一种方法。


// 原生js发送请求:
<script>
    // 创建请求实例对象
    var myAjax = new XMLHttpRequest();
    // 设置请求的url参数，这是做准备工作
    myAjax.open('get', 'https://autumnfish.cn/search?keywords="嘉宾"');
    // 发送请求
    myAjax.send();
    myAjax.onreadystatechange = function () {
      if (myAjax.readyState === 4 && myAjax.status === 200) {
        console.log(JSON.parse(myAjax.responseText));
      }
    }
</script>


// 创建XMLHttpRequest对象
// 设置请求的url和请求方法
// 发送请求
// 定义当readyState 改变时，onreadystatechange 事件函数所执行的任务
// Ajax正是把上面长长的代码给封装起来，我们只需要传递所需要的参数就能实现上述功能。

// <script>
//     function request(method, url, data, success) {
//       var ajax = new XMLHttpRequest();
//       if (method.toLowerCase() == 'get') {
//         if (data) {
//           // url += '?';
//           // url += data;
//           url = `${url + '?'}${data}`;
//         } else {
//         }
//         ajax.open(method, url);
//         ajax.send();
//       } else {//假设除了get 就是 post
//       }
//       ajax.onreadystatechange = function () {
//         if (ajax.readyState === 4 && ajax.status === 200) {
//           success(JSON.parse(ajax.responseText));
//         }
//       }
//     }
//     <!-- 调用自己定义的函数 -->
//     request('get', 'https://autumnfish.cn/search', 'keywords="Stay"', success);
//     function success(res) {
//       console.log(res);
//     }
//   </script>


// 2. AJAX 的工作流程
// 创建请求：

// 使用 JavaScript 创建一个 XMLHttpRequest 对象或调用 fetch API。
// 发送请求：

// 将请求发送到服务器，通常是通过 GET 或 POST 方法。
// 处理响应：

// 服务器处理请求并返回数据，数据格式通常为 JSON。
// JavaScript 接收服务器响应并解析数据。
// 更新页面：

// 使用 JavaScript 动态更新网页内容，而无需重新加载整个页面。

///////
/* 

     ajax不是api, 是一种技术, 是由回调based XMLHttpRequest api 或者 fetch api实现的
     这种技术可以只获得有用的数据,不加载整个页面即可更新部分内容

*/
