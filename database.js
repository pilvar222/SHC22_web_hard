const sqlite = require('sqlite-async');

class Database {
    constructor(db_file) {
        this.db_file = db_file;
        this.db = undefined;
    }

    async connect() {
        this.db = await sqlite.open(this.db_file);
    }

    async migrate() {
        return this.db.exec(`
            DROP TABLE IF EXISTS tokens;

            CREATE TABLE IF NOT EXISTS tokens (
                id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                token      VARCHAR(255),
                timestamp  VARCHAR(255)
            );

        `);
    }

    async addToken(token) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `INSERT INTO tokens (token, timestamp) VALUES ('${ token }', '${ Math.floor(new Date() / 1000) }');`;
                resolve((await this.db.run(query)));
            } catch(e) {
                reject(e);
            }
        });
    }

    async isTokenValid(token) {
        return new Promise(async (resolve, reject) => {
            try {
                let smt = await this.db.prepare('SELECT * FROM tokens WHERE token = ?');
                let row = await smt.get(token);
                //token expires after 30 seconds
                if ((row !== undefined) && (row.timestamp > Math.floor(new Date() / 1000)-30)) {
                    resolve(true);
                } else if ((row !== undefined) && (row.timestamp < Math.floor(new Date() / 1000)-30)) {
                    reject("Your token has expired. Please refresh.");
                } else {
                    reject("Invalid token.");
                }
            } catch(e) {
                console.log(e);
                reject(e);
            }
        });
    }
}

module.exports = Database;
