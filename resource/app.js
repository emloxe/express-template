const express = require('express');
const chalk = require('chalk');
const path = require('path')
const app = express();

const argvs = process.argv;
const port = parseInt(argvs[argvs.length - 1]) || 8081;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`[${new Date().toLocaleString()}]`);
  console.log(chalk.green('INFO'), ` connect to http://localhost:${port}`);
})