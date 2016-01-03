Package.describe({
  name: 'fourquet:link-accounts',
  version: '1.0.1',
	summary: 'Meteor package for linking 3rd party login services to Meteor accounts.',
	git: 'https://github.com/fourquet/meteor-package-link-accounts',
	documentation: 'README.md',
	license: 'LICENSE',
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.imply('accounts-base', [
		'client',
		'server',
	]);
	api.use([
		'ecmascript@0.1.6',
		'accounts-oauth',
		'oauth',
		'fourquet:quickbooks@2.0.0_2',
		'fourquet:accounts-quickbooks@1.0.1',
	], [
		'client',
		'server',
	]);

	api.addFiles('link_accounts_client.js', 'client');
	api.addFiles('link_accounts_server.js', 'server');
	api.addFiles([
		'facebook.js',
		'google.js',
		'twitter.js',
		'quickbooks.js',
	], 'client');
});

Package.onTest(function(api) {
	api.use('ecmascript@0.1.6');
	api.use('tinytest');
	api.use('fourquet:link-accounts');
	api.addFiles('link-accounts-tests.js');
});
