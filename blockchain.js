const http = require('request-promise-json');
const sha256 = require('sha256');

class Blockchain {
	constructor(url){
		this.url = url;
	}
	getData(){
		return http.get(this.url);
	}
	push(ob){
		ob.timestamp = Date.now();
		ob.id = sha256(JSON.stringify(ob));
		return http.get(this.url).then(ledger => {
			ledger.push(ob);
			return http.put(this.url, ledger).then(() => ledger);
		});
	}
	clear(){
		return http.put(this.url, []);
	}
};

module.exports = Blockchain;
