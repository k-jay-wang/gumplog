/*
* @Author: wangyan
* @Date:   2018-05-02 10:19:57
* @Last Modified by:   wangyan
* @Last Modified time: 2018-05-05 16:55:14
*/

var log = {
	// 通用基础方法
	_log: function(msg, level) {
		var nowtime = getNowTime();
		var position = getLogStackPosition();
		var str = [];
		str.push(nowtime);
		str.push(': ' + msg);
		str.push('at ' + position);
		switch(level){
			case 'info':
				str.splice(1, 0, '[INFO]');
				console.log(str.join(' '));break;
			case 'debug':
				str.splice(1, 0, '[DEBUG]');
				console.log(str.join(' '));break;
			case 'warn':
				str.splice(1, 0, '[WARN]');
				console.warn(str.join(' '));break;
			case 'error':
				str.splice(1, 0, '[ERROR]');
				console.error(str.join(' '));break;
			default:
				str.splice(1, 0, '[INFO]');
				console.log(str.join(' '));break;
		}
	}
};

/**
 * 显示错误级别
 * args留着扩展吧，暂时没想到要放什么
 */
log.log = function(msg, args) {
	this._log(msg, 'info')
};

log.debug = function(msg) {
	this._log(msg, 'debug')
};

log.info = function(msg) {
	this._log(msg, 'info')
};

log.warn = function(msg) {
	this._log(msg, 'warn')
};

log.error = function(msg) {
	this._log(msg, 'error')
};


/**
 * 获取当前日期字符串
 * @return String 返回日期字符串
 */
function getNowTime() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var millisecond = date.getMilliseconds();
	var weekday = date.getDay();
	var week = ['一', '二', '三', '四', '五', '六', '日'];
	var nowweek = '周' + week[--weekday];
	month = parseInt(month) + 1;
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	millisecond = (millisecond/1000).toFixed(3).substr(2, 4);
	var str = year + '-' + month + '-' + day + ' ' + nowweek + ' ' + hour + ':' + minute + ':' + second + ':' + millisecond;
	return str;
}

/**
 * 获取报错地址和具体位置
 * @return {string} 返回字符串表明位置
 */
function getLogStackPosition() {
	try {
		throw new Error()
	} catch(e) {
		var err = e.stack;
		var str = null;
		// （拦截在具名函数里的log）使用正则截取方法名，行数，文件名/at  at 开头，\s+匹配多个空格 (.*) 捕获多个字符，后面多个空格，匹配（，多个字符：数字：数字
		var signedStackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
		// 拦截在匿名函数里的log
		var anonymousStackReg = /at\s+(.*):(\d*):(\d*)/i;
		var errArray = err.split('\n');
		var msg = errArray[4];	// 第0行是ERROR， 第一行是直接调用的文件，第二行是直接调用此方法的文件（_log），第三行是直接调用_log方法的方法(log.log),第四行是调用log.log的方法和文件
		str = msg;
		var infoArray = signedStackReg.exec(msg) || anonymousStackReg.exec(msg);
		if (infoArray && infoArray.length === 5) {
			var temp = [];
			temp.push(infoArray[1]);
			temp.push('(' + infoArray[2] + ')');
			temp.push(infoArray[3] + '行');
			temp.push(infoArray[4]);
			str = temp.join(' ');
		} else if (infoArray.length === 4) {
			var temp = [];
			temp.push('anonymousFunction');
			temp.push('(' + infoArray[1] + ')');
			temp.push(infoArray[2] + '行');
			temp.push(infoArray[3]);
			str = temp.join(' ');
		}
		return str;
	}
}

/**
 * 导出log对象，实现方法
 * @type {Object}
 */
module.exports = log;