const tap = require('tap');
const lambda = require('../tmp/lambda/index').default;

tap.test('Function name', test => {
	lambda({
		events: [],
		context: {
			functionName: 'test-lambda'
		},
		AWS: {
			version: 'mock'
		},
		callback: (err, success) => {
			test.ifError(err);
			test.equal(success.name, 'test-lambda');
			test.end();
		}
	});
});
