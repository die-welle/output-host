
import getMyIp from 'get-my-ip';
import clipboardy from 'clipboardy';
import chalk from 'chalk';

export default function outputHost(config = {}, next) {
	if (typeof config === 'string' || typeof config === 'number') {
		config = { port: config };
	}
	if (typeof config !== 'object') { config = {}; }

	if (this && this.address) {
		const { port, address } = this.address();
		const protocol = this.getTicketKeys ? 'https' : 'http';
		const host = [
			'::',
			'127.0.0.1',
			'0.0.0.0',
		].includes(address) ? getMyIp() : address;

		Object.assign(config, {
			port,
			host,
			protocol,
		});
	}

	config = {
		port: 3000,
		host: getMyIp(),
		protocol: 'http',
		name: 'Server',
		useCopy: true,
		useLocal: true,
		useExternal: true,
		useColor: true,
		logger: console.log.bind(console),
		path: '',
		...config,
	};

	const {
		useCopy,
		useLocal,
		useExternal,
		useColor,
		name,
		port,
		host,
		protocol,
		logger,
		path,
	} = config;

	const localURL = `${protocol}://localhost:${port}${path}`;
	const color = useColor ? chalk : new chalk.constructor({ enabled: false });
	let externalURL;

	if (useLocal) {
		logger(
			color.yellow(`${name} Local URL`),
			color.gray(localURL),
		);
	}

	if (useExternal && host) {
		externalURL = `${protocol}://${host}:${port}${path}`;

		logger(
			color.yellow(`${name} External URL`),
			externalURL,
		);
	}

	if (useCopy) { clipboardy.writeSync(externalURL || localURL); }

	(typeof next === 'function') && next();

	return {
		name,
		port,
		host,
		path,
		protocol,
		localURL,
		externalURL,
	};
};

outputHost.curry = function curry(...args) {
	return function () {
		return outputHost.apply(this, args);
	};
};
