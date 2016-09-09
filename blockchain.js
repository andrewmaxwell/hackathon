const http = require('request-promise-json');
const sha256 = require('sha256');

const getID = ob => sha256(JSON.stringify(ob)).substring(0, 6);

class Blockchain {
	constructor(url){
		this.url = url;
	}
	init(){
		return http.get(this.url).then(data => {
			this.ledger = data;
			console.log('Initialized', this.ledger);
			return this.ledger;
		});
	}
	push(ob){
		ob.timestamp = Date.now();
		ob.id = getID(ob);
		ob.interactionId = ob.interactionId || ob.id;
		this.ledger.push(ob);
		console.log('Pushing', ob);
		return http.put(this.url, this.ledger).then(() => this.ledger);
	}
	set(to){
		this.ledger = to;
		console.log('Setting', to);
		return http.put(this.url, this.ledger);
	}
};

module.exports = Blockchain;
