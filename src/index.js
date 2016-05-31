import AWS from 'aws-sdk';
import nunjucks from 'nunjucks';

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

function validateInput ({from, to, subject, body, template, env}) {
	if (!from || !to || !subject) {
		return Promise.reject(new Error('Missing or invalid parameters'));
	} else if (body) {
		return Promise.resolve({
			from,
			to: typeof to === 'string' ? [to] : to,
			subject,
			body
		});
	} else if (template && env) {
		nunjucks.configure({ autoescape: true });
		return Promise.resolve({
			from,
			to: typeof to === 'string' ? [to] : to,
			subject,
			body: nunjucks.renderString(template, env)
		});
	} else {
		return Promise.reject(new Error('Missing or invalid parameters'));
	}
}
