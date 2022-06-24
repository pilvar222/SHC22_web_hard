const path              = require('path');
const express           = require('express');
const router            = express.Router();
const crypto            = require('crypto');
const browse            = require('./../browser');

let db;

const response = data => ({ message: data });

router.get('/', (req, res) => {
	return res.sendFile(path.resolve('views/index.html'));
});

router.get('/token', (req, res) => {
    return db.isIpWhitelisted(req.socket.remoteAddress.replace(/^.*:/, '')) //check if ip is whitelisted
        .then(() => {
            token = crypto.randomBytes(8).toString('hex');
            db.addToken(token).then(() => res.send(response(token)));
        })
        .catch(() => res.send(response('Your ip is not whitelisted, please contact an administrator.')));
});

router.get('/dashboard', (req, res) => {
    return db.isIpWhitelisted(req.socket.remoteAddress.replace(/^.*:/, ''))
        .then(() => res.sendFile(path.resolve('views/admin.html')))
        .catch(() => res.sendFile(path.resolve('views/unauthorized.html')));
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

router.post('/whitelistIp', (req, res) => {

    let { address, token } = req.body;

    if (address) { //check if address is set
        return db.isTokenValid(token) //check if csrf token valid
            .then(() => {
                return db.isIpWhitelisted(req.socket.remoteAddress.replace(/^.*:/, '')) //check if ip is whitelisted
               .then(() => {
                    db.addWhitelistedIp(address).then(() => res.send(response('Ip address whitelisted!')));
               })
               .catch(() => res.send(response('Your ip is not whitelisted, please contact an administrator.')));
            }
            )
            .catch((tokenError) => res.send(response(`${tokenError}`)));
    } else {
        res.send(response("Please specify an address."));
    }
});

router.get('/logip', (req, res) => {
    console.log(req.socket.remoteAddress.replace(/^.*:/, ''))
    return db.isIpWhitelisted(req.socket.remoteAddress.replace(/^.*:/, ''))
        .then(() => res.sendFile(path.resolve('views/admin.html')))
        .catch(() => res.sendFile(path.resolve('views/unauthorized.html')));
});

router.post('/report', (req, res) => {

    let { url } = req.body;

    if (url) {
        console.log(req.socket.remoteAddress.replace(/^.*:/, ''))
        browse.browseTo(url);
        res.send(response('Thanks for the report, our agents are taking a look at it.'));
    } else {
        res.send(response("Please specify an url."));
    }
});

module.exports = database => { 
	db = database;
	return router;
};