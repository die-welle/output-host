
var outputHost = require('../lib');

outputHost({

	// all keys and their default values
	port: 3000,
	name: 'Server',
	protocol: 'http',
	path: '',
	logger: console.log.bind(console),
	useLocal: true,
	useExternal: true,
	useCopy: true,
	useColor: true,
	launch: 'chrome',
	launchDelay: 2000,

});
