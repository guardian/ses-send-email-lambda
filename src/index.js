import AWS from 'aws-sdk';

export function handler (events, context, callback) {
	handleEvents({events, context, callback, AWS});
}

export default function handleEvents ({events, context, callback, AWS}) {
	callback(null, {
		events: events,
		name: context.functionName,
		aws: AWS.version
	});
}
