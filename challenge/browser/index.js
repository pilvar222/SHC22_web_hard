const puppeteer         = require('puppeteer');

module.exports = {
    browseTo: async function (url) {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-gpu']
        });
        const page = await browser.newPage();
        try {
            await page.goto(url);
            await new Promise(r => setTimeout(r, 5000));
        } catch (err) {
            return (false);
        }
        await browser.close();
        return (true);
    }
};


