const path              = require('path');
const express           = require('express');
const router            = express.Router();
const crypto = require('crypto');

let db;

const response = data => ({ message: data });

router.get('/', (req, res) => {
	return res.sendFile(path.resolve('views/index.html'));
});

router.get('/token', (req, res) => {
    token = crypto.randomBytes(8).toString('hex');
    db.addToken(token).then(() => res.send(response(token)));
});

router.post('/validate', (req, res) => {

    let { token } = req.body;

    if (token) {
        return db.isTokenValid(token)
            .then(() => res.send(response('Your token is valid!')))
            .catch((tokenError) => res.send(response(`${tokenError}`)));
    } else {
        res.send(response("Please specify a token."));
    }
});

module.exports = database => { 
	db = database;
	return router;
};