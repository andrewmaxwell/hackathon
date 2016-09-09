const Blockchain = require('./blockchain');
const blockchain = new Blockchain('https://api.myjson.com/bins/tiii');

const errorFunc = res => err => {
	console.error(err);
	if (res) res.status(500).send(err);
};

const app = require('express')();
app.use(require('body-parser').json());
app.use(require('cors')());
app.use(require('compression')());

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

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
  console.log('Listening on port 3000');
});
