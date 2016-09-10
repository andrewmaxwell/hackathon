module.exports = ['$scope', 'blockchain', 'interactions', ($scope, blockchain, interactions) => {

	const processInteractions = rows => {
		$scope.interactions = interactions.process(rows);
	};

	const errorFunc = err => {
		console.error(err);
	};

	blockchain.getInteractionListing().then(processInteractions).catch(errorFunc);

	$scope.types = interactions.types;
	$scope.num = type => ($scope.interactions || []).filter(t => t.type == type).length;

	$scope.open = row => {
		console.log(row.interactionId);
		location.hash = '/details/' + row.interactionId;
	};

	$scope.makeNew = () => {

		const fixCasing = str => str.split(/[ _]+/).map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join(' ');
		const rand = arr => arr[Math.floor(Math.random() * arr.length)];
		const words = 'death preliminary certificate privileged confidential information message document distribution claims legal prohibited'.split(' ');
		const moreWords = 'if you I this of on the contain contains these for to the of above named copying intended'.split(' ').concat(words);
		const extensions = ['.doc', '.xls', '.pdf'];
		const tlds = ['.org', '.net', '.com', '.gov'];

		let attachments = [];
		for (let i = 0; i < 3; i++){
			let name = [];
			for (let j = 0; j < 3; j++) name[j] = rand(words);
			attachments[i] = fixCasing(name.join(' ')) + rand(extensions);
		}

		let body = [];
		for (let i = 0; i < 50; i++) body[i] = rand(moreWords);

		let subject = [];
		for (let i = 0; i < 5; i++) subject[i] = rand(moreWords);

		blockchain.pushNew({
			attachments,
			body: body.join(' '),
			from: rand(moreWords) + rand(words) + '@' + rand(words) + rand(words) + rand(tlds),
			received: 'Friday, September 09, 2016',
			subject: fixCasing(subject.join(' ')),
			type: 'Request Received'
		}).then(processInteractions).catch(errorFunc);
	};
}];
