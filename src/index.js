import AWS from 'aws-sdk';

const sesClient = new AWS.SES();

export function handler (events, context, callback) {
	handleEvents({events, callback, ses: sesClient});
}

export default function handleEvents ({events, ses, callback}) {
	validateInput(events)
	.then(data => generateEmail(data))
	.then(email => {
		ses.sendEmail(email, callback);
	})
	.catch(callback);
}

function generateEmail (data) {
	return Promise.resolve({
		Source: data.from,
		Destination: {
			ToAddresses: data.to
		},
		Message: {
			Subject: {
				Data: data.subject
			},
			Body: {
				Html: {
					Data: data.body,
					Charset: 'utf8'
				}
			}
		}
	});
}

function validateInput ({from, to, subject, body}) {
	if (!from || !to || !subject || !body) {
		return Promise.reject(new Error('Missing or invalid parameters'));
	} else {
		return Promise.resolve({
			from,
			to: typeof to === 'string' ? [to] : to,
			subject,
			body
		});
	}
}
