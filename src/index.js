
import getMyIp from 'get-my-ip';
import clipboardy from 'clipboardy';
import chalk from 'chalk';
import { launch as chromeLaunch } from 'chrome-launcher';
import firefoxLaunch from 'firefox-launch';
import { name } from '../package.json';

const deprecated = (config) => {
	const map = {
		useCopy: 'copy',
		useLocal: 'local',
		useExternal: 'external',
		useColor: 'color',
	};

	Object.keys(config).forEach((key) => {
		if (map[key]) {
			console.warn(
				'[DEPRECATED]:',
				`${name} option "${key}" has been deprecated,`,
				`please use "${map[key]}" instead.`,
			);
			config[key] = map[key];
			delete config[key];
		}
	});
	return config;
};

export default function outputHost(config = {}, next) {
	deprecated(config);

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
		copy: true,
		local: true,
		external: true,
		color: true,
		logger: console.log.bind(console),
		path: '',
		launchDelay: 2000,
		...config,
	};

	const {
		copy,
		local,
		external,
		color,
		name,
		port,
		host,
		protocol,
		logger,
		path,
		launch,
		launchDelay,
	} = config;

	const isDefaultPort =
		(protocol === 'http' && port === 80) ||
		(protocol === 'https' && port === 443)
	;
	const enhancedPort = isDefaultPort ? '' : `:${port}`;
	const urlPath = path ? (/^\//.test(path) ? path : `/${path}`) : '';
	const localURL = `${protocol}://localhost${enhancedPort}${urlPath}`;
	const chk = color ? chalk : new chalk.constructor({ enabled: false });
	let externalURL;

	if (local) {
		logger(
			chk.yellow(`${name} Local URL`),
			chk.gray(localURL),
		);
	}

	if (external && host) {
		externalURL = `${protocol}://${host}${enhancedPort}${urlPath}`;

		logger(
			chk.yellow(`${name} External URL`),
			externalURL,
		);
	}

	const startingUrl = externalURL || localURL;

	if (copy) { clipboardy.writeSync(startingUrl); }

	if (launch && launch !== 'none') {
		setTimeout(() => {
			if (launch === 'firefox') { firefoxLaunch(startingUrl); }
			else { chromeLaunch({ startingUrl }); }
		}, launchDelay);
	}

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
