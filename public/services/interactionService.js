module.exports = [() => {


	return {
		process: rows => rows,
		types: [
			'Request Received', 'In Review', 'Accepted', 'Approved', 'Claim Paid'
		]
	};
}];
