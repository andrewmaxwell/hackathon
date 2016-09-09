// const interactions = {
// 	REQUEST_RECEIVED: {
// 		transform: row => {
//
// 		}
// 	}
// }

const fixCasing = str => str.split(/[ _]+/).map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join(' ');


const getNotes = row => {
	if (row.type == 'REQUEST_RECEIVED'){
		return {
			From: row.from,
			Subject: row.subject,
			Attachments: row.attachments.join(', ')
		};
	}
	return row;
};

module.exports = ['$scope', '$stateParams', 'blockchain', ($scope, $stateParams, blockchain) => {
	$scope.interactionId = $stateParams.interactionId;
	blockchain.getInteractions($scope.interactionId).then(rows => {
		console.log('rows', rows);
		$scope.interactions = rows.map(row => {
			return {
				type: fixCasing(row.type).replace(/_/g, ' '),
				date: new Date(row.timestamp),
				notes: getNotes(row)
			};
		});
	});


}];
