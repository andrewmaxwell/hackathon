const express = require('express');

const Blockchain = require('./blockchain');
const blockchain = new Blockchain('https://api.myjson.com/bins/tiii');

const errorFunc = err => res.status(500).send(err);

const app = express();

app.use(require('body-parser').json());

app.get('/', (req, res) => {
	blockchain.getData()
		.then(data => res.send(data))
		.catch(errorFunc);
});

app.post('/push', (req, res) => {
	blockchain.push(req.body)
		.then(data => res.send(data))
		.catch(errorFunc);
});

// app.post('/reset', (req, res) => {
// 	blockchain.reset().then
// });

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
  console.log('Listening on port 3000');
});
