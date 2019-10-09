const express = require('express');
const path = require('path');
const chalk = require('chalk');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

let port = 8085;

app.listen(port, function(req, res) {
  console.log(`[${new Date().toLocaleString()}]`);
  console.log(chalk.green('INFO'), ` connect to http://localhost:${port}`);
});
