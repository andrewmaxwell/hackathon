const express = require('express');

const Blockchain = require('./blockchain');
const blockchain = new Blockchain('https://api.myjson.com/bins/tiii');

const errorFunc = res => err => {
	console.error(err);
	if (res) res.status(500).send(err);
};

const app = express();
app.use(require('body-parser').json());
app.use(require('cors')());
app.use(require('compression')());
app.use(express.static('./public'));

blockchain.init().catch(err => console.error(err));

app.get('/blockchain', (req, res) => res.send(blockchain.ledger));

app.post('/blockchain', (req, res) => {
	blockchain.push(req.body)
		.then(data => res.send(data))
		.catch(errorFunc(res));
});

app.post('/blockchain/set', (req, res) => {
	blockchain.set(req.body).then(() => res.send('ok')).catch(errorFunc(res));
});

const port = process.env.PORT || 5000;
app.set('port', port);
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
