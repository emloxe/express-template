const express = require("express");
const compression = require("compression");
const timeout = require("connect-timeout");
const proxy = require("http-proxy-middleware");
const portfinder = require('portfinder');
const cors = require('cors');
const chalk = require('chalk');

const app = express();

let basePort = 8080;

// 设置超时 返回超时响应
const TIME_OUT = 30 * 1e3;
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use(compression()); // 压缩
app.use(cors()); // 跨域
app.use(function(req, res, next) {
  // 允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(__dirname)); // 当前目录作为资源目录
app.use(express.static("assets")); // 指定目录作为资源目录
app.use("/js", express.static("dist")); // 指定目录添加路由前缀

// 反向代理
const proxyPath = "http://192.168.0.48:9005"; // 目标后端服务地址(公司同事电脑地址)
const proxyOption = { target: proxyPath, changeOrigoin: true };
app.use(proxy("/api/test", proxyOption)); // 这里要注意"/api/test" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)

portfinder.basePort = basePort;
portfinder.getPort((err, port) => {
  if (err) {
    console(err);
  } else {
    app.listen(port, function(req, res) {
      console.log(`[${new Date().toLocaleString()}]`);
      console.log(chalk.green('INFO'), ' connect to', chalk.underline(`http://127.0.0.1:${port}`));
    });
  }
});
