const fixCasing = str => str.split(/[ _]+/).map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join(' ');

module.exports = ['$http', ($http) => {

	const url = 'https://blooming-cliffs-91320.herokuapp.com/blockchain';

	const processResponse = response => response.data.reverse().map(row => {
		row.type = fixCasing(row.type).replace(/_/g, ' ');
		row.date = new Date(row.timestamp);
		return row;
	});
	const getAll = () => $http.get(url).then(processResponse);
	const pushRecord = ob => $http.post(url, ob).then(processResponse);

	const processFilter = id => rows => rows.filter(r => r.interactionId == id);

	const processListing = rows => {
		var index = {};
		var list = [];
		rows.forEach(row => {
			var existing = index[row.interactionId];
			if (existing){
				Object.keys(row).forEach(prop => {
					if (existing[prop] === undefined){
						existing[prop] = row[prop];
					}
				});
			} else if (row.interactionId) {
				index[row.interactionId] = row;
				list.push(row);
			}
		});
		return list;
	};

	return {
		getInteractionListing: () => getAll().then(processListing),
		getInteractions: id => getAll().then(processFilter(id)),
		pushNew: ob => pushRecord(ob).then(processListing),
		pushUpdate: ob => pushRecord(ob).then(processFilter(ob.interactionId))
	};
}];
