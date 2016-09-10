module.exports = ['$scope', '$stateParams', 'blockchain', '$document', 'interactions', 'numberFilter', 'dateFilter', ($scope, $stateParams, blockchain, $document, interactions, numberFilter, dateFilter) => {

	var interactionId = $scope.interactionId = $stateParams.interactionId;

	const errorFunc = err => {
		console.error(err);
	};

	$scope.propMap = {
		claimType: 'Claim Type',
		claimAmount: {label: 'Claim Amount', format: val => '$' + numberFilter(val)},
		approvedAmount: {label: 'Approved Amount', format: val => '$' + numberFilter(val)},
		from: 'Email From',
		proofDate: {label: 'Proof Date', format: val => dateFilter(val, 'EEEE, MMMM dd, y')},
		subject: 'Email Subject',
		received: 'Email Received',
		// body: {label: 'Email Message', format: val => val.replace(/\s*<[^>]*>\s*/g, '')},
		attachments: {label: 'Email Attachments', format: val => val.join(', ')}
	};

	var processInteractions = rows => {
		console.log('rows', rows);

		$scope.interactions = interactions.process(rows);

		var props = $scope.props = {};
		rows.forEach(row => {
			Object.keys(row).forEach(prop => {
				if (props[prop] === undefined) props[prop] = row[prop];
			});
		});

		console.log(props);

		$scope.currentState = $scope.interactions[0] && $scope.interactions[0].type;
	};

	blockchain.getInteractions(interactionId).then(processInteractions).catch(errorFunc);

	var states = $scope.states = interactions.types;

	$scope.moveForward = () => {
		var nextType = states[states.indexOf($scope.currentState) + 1];
		if (nextType){
			var ob = {
				type: nextType,
				interactionId
			};

			if (nextType == 'Accepted'){
				ob.proofDate = new Date();
				ob.claimType = ['Life', 'Health', 'Disability'][Math.floor(Math.random() * 3)];
				ob.claimAmount = Math.floor(Math.random() * 1000) * 1000;
			} else if (nextType == 'Approved'){
				ob.approvedAmount = Math.floor(Math.random() * (ob.claimAmount || 1000));
			}

			blockchain.pushUpdate(ob).then(processInteractions).catch(errorFunc);
		}
	};

}];
