const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const routes        = require('./routes');
const path          = require('path');
const Database      = require('./database');

const port = 1337;

app.set('view engine', 'ejs');

const db = new Database('database.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));

app.use(routes(db));

app.all('/:lang', (req, res) => {
    if ((new Date().getTime() % 600) > 300) {
        var ennemy = "Eastasia";
    } else {
        var ennemy = "Eurasia";
    }
    return res.render("index.ejs", { language: req.params.lang, "ennemy": ennemy});
});

(async () => {
    await db.connect();
    await db.migrate();

    app.listen(port, () => console.log(`Listening on port ${port}`))
})();
