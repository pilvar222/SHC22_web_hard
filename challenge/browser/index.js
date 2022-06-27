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
            for (let i = 0; i < 100; ++i) {
                await page.mouse.click(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), {button: 'left'});
                await page.press('ArrowLeft');
                await new Promise(r => setTimeout(r, 10));
            }
        } catch (err) {
            return (false);
        }
        await browser.close();
        return (true);
    }
};


