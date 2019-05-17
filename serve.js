const express = require('express');
const chalk = require('chalk');

const app = express();
app.use(express.static(__dirname));

let port = 8085;

app.listen(port, function(req, res) {
  console.log(`[${new Date().toLocaleString()}]`);
  console.log(chalk.green('INFO'), ` connect to http://127.0.0.1:${port}`);
});
