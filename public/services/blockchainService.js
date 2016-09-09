module.exports = ['$http', ($http) => {

	const url = 'https://blooming-cliffs-91320.herokuapp.com/blockchain';

	return {
		getInteractions: id => $http.get(url).then(resp =>
			resp.data.filter(r => !id || r.interactionId == id).reverse()
		)
	};
}];
