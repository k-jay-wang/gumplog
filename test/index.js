/*
* @Author: wangyan
* @Date:   2018-05-05 10:54:49
* @Last Modified by:   wangyan
* @Last Modified time: 2018-05-05 16:53:58
*/
var express = require('express');
var app = express();
var log = require('../index.js');

app.get('/', function (req, res) {
	logFunction(456);
	log.log('this is log');
	log.debug('this is debug');
	log.info('this is info');
	log.warn('this is warn');
	log.error('this is error')
  res.send('Hello World!');
});

function logFunction(msg) {
	log.log('this is log' + msg);
	log.debug('this is debug ' + msg);
	log.info('this is info ' + msg);
	log.warn('this is warn ' + msg);
	log.error('this is error ' + msg);
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});