
import getMyIp from 'get-my-ip';
import copyPaste from 'copy-paste';
import chalk from 'chalk';

export default (options) => {

	if (typeof options === 'string' || typeof options === 'number') {
		options = { port: options };
	}
	if (!options || typeof options !== 'object') { options = {}; }

	const {
		useCopy, useLocal, useExternal, name, port
	} = {
		port: 3000,
		useCopy: true,
		useLocal: true,
		useExternal: true,
		name: 'Server',
		...options,
	};

	const ip = getMyIp();
	const localURL = `http://localhost:${port}`;
	let externalURL;

	if (useLocal) {
		console.log(
			chalk.yellow(`${name} Local URL`),
			chalk.gray(localURL)
		);
	}

	if (useExternal && ip) {
		externalURL = `http://${ip}:${port}`;

		console.log(
			chalk.yellow(`${name} External URL`),
			externalURL
		);
	}

	if (useCopy) { copyPaste.copy(externalURL || localURL); }
};
