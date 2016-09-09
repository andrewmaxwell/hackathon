module.exports = ['$scope', '$stateParams', 'blockchain', ($scope, $stateParams, blockchain) => {
	$scope.interactionId = $stateParams.interactionId;
	$scope.interactions = blockchain.getInteractions($scope.interactionId);

	console.log($scope);
}];
