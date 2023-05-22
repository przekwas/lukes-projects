module.exports = {
	apps: [
		{
			name: 'lukes-projects',
			script: 'build/app.js',
			instances: 'max',
			exec_mode: 'cluster'
		}
	]
};
