module.exports = ['$http', '$interval', ($http, $interval) => {

	// const url = '/blockchain';
	const url = 'http://localhost:5000/blockchain';

	const api = {
		data: [],
		getInteractions: id => api.data.filter(r => id == r.interactionId)
	};

	$interval(() => {
		$http.get(url).then(data => {
			api.data = data;
		}).catch(err => {
			console.error(err);
		});
	}, 3000);

	return api;
}];
