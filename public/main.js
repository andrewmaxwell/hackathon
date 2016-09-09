console.clear();

const angular = require('angular');

require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-material');
require('angular-ui-router');

const app = angular.module('myApp', ['ngMaterial', 'ngMessages', 'ui.router']);

app.config(['$mdThemingProvider', '$stateProvider', ($mdThemingProvider, $stateProvider) => {
	$mdThemingProvider.theme('docs-dark', 'default')
		.primaryPalette('yellow')
		.dark();

	$stateProvider.state('details', {
		url: '/details/:interactionId',
		template: require('./templates/details.html'),
		controller: require('./controllers/interactionController')
	});

}]);

app.factory('blockchain', require('./services/blockchainService'));
app.factory('interactions', require('./services/interactionService'));
