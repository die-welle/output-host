'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getMyIp = require('get-my-ip');

var _getMyIp2 = _interopRequireDefault(_getMyIp);

var _copyPaste = require('copy-paste');

var _copyPaste2 = _interopRequireDefault(_copyPaste);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	var _port$useCopy$useLoca = _extends({
		port: 3000,
		useCopy: true,
		useLocal: true,
		useExternal: true,
		name: 'Server'
	}, options);

	var useCopy = _port$useCopy$useLoca.useCopy;
	var useLocal = _port$useCopy$useLoca.useLocal;
	var useExternal = _port$useCopy$useLoca.useExternal;
	var name = _port$useCopy$useLoca.name;
	var port = _port$useCopy$useLoca.port;

	var ip = (0, _getMyIp2.default)();
	var localURL = 'http://localhost:' + port;
	var externalURL = undefined;

	if (useLocal) {
		console.log(_chalk2.default.yellow(name + ' Local URL'), _chalk2.default.gray(localURL));
	}

	if (useExternal && ip) {
		externalURL = 'http://' + ip + ':' + port;

		console.log(_chalk2.default.yellow(name + ' External URL'), externalURL);
	}

	if (useCopy) {
		_copyPaste2.default.copy(externalURL || localURL);
	}
};
