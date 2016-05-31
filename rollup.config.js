import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import alias from 'rollup-plugin-alias';

export default {
	entry: 'src/index.js',
	plugins: [
		json(),
		babel(),
		alias({
			chokidar: __dirname + '/src/mock-nunjucks/chokidar',
			'./src/precompile': __dirname + '/src/mock-nunjucks/precompile'
		}),
		nodeResolve({
			extensions: ['.js', '.json']
		}),
		commonjs()
	],
	format: 'cjs',
	dest: 'tmp/lambda/index.js',
	external: ['aws-sdk']
};
