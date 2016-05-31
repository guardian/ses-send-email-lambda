const tap = require('tap');
const lambda = require('../tmp/lambda/index').default;

tap.test('fails if parameters are missing', test => {
	lambda({
		events: {
			from: null,
			body: 'text or html'
		},
		callback: (err) => {
			test.type(err, 'Error');
			test.match(err, /missing/i);
			test.end();
		}
	});
});

tap.test('calls SES with a to array even if it\'s passed as a string', test => {
	lambda({
		events: {
			from: 'source',
			to: 'destination',
			subject: 'something',
			body: 'text or html'
		},
		ses: {
			sendEmail (data, callback) {
				test.deepEqual(data, {
					Source: 'source',
					Destination: {
						ToAddresses: ['destination']
					},
					Message: {
						Subject: {
							Data: 'something'
						},
						Body: {
							Html: {
								Data: 'text or html',
								Charset: 'utf8'
							}
						}
					}
				});
				callback();
			}
		},
		callback: (err) => {
			test.ifError(err);
			test.end();
		}
	});
});

tap.test('fails if SES fails', test => {
	lambda({
		events: {
			from: 'source',
			to: ['destination'],
			subject: 'something',
			body: 'text or html'
		},
		ses: {
			sendEmail (data, callback) {
				process.nextTick(() => callback(new Error('aws error')));
			}
		},
		callback: (err) => {
			test.type(err, 'Error');
			test.match(err, /aws error/i);
			test.end();
		}
	});
});
