
import assert from 'assert';
import http from 'http';
import outputHost from '../src';
import getMyIp from 'get-my-ip';
import clipboardy from 'clipboardy';

describe('output-host', function () {
	let server = http.createServer();

	afterEach((done) => {
		if (server.listening) { server.close(done); }
		else { done(); }
	});

	it('outputHost()', () => {
		const port = 123;
		const result = outputHost({ port });
		assert.equal(result.port, port);
		assert.equal(result.host, getMyIp());
	});

	it('config.useCopy', () => {
		outputHost({ useCopy: true });
		assert(clipboardy.readSync().startsWith('http://'));
	});

	it('config.path', () => {
		const path = '/fork';
		const result = outputHost({ path });
		assert(result.localURL.endsWith(path))
	});

	it('config.protocol', () => {
		const protocol = 'https';
		const result = outputHost({ protocol });
		assert(result.protocol.endsWith(protocol))
	});

	it('callback', (callback) => {
		outputHost({}, callback);
	});

	it('config.logger', () => {
		const customLogger = (...args) => {
			console.log('custom logger', ...args);
		};

		outputHost({
			logger: customLogger,
		});
	});

	it('outputHost.curry()', (done) => {
		server.listen(3001, outputHost.curry({}, done));
	});
});
