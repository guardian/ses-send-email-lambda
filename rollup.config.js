import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	plugins: [
		babel(),
		nodeResolve(),
		commonjs()
	],
	format: 'cjs',
	dest: 'tmp/lambda/index.js',
	external: ['aws-sdk']
};
