const {chromium} = require('playwright');  // Or 'chromium' or 'firefox'.

const app = require('express')();

app.get('/url/:urlId', (req, res) => {
    req.params;
    (async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(req.params.urlId);
        await page.addScriptTag({path: './OnAllScreen.js'})
        const result = await page.evaluate(() => {
            return resultAll()
        })

        let result_json = JSON.stringify(result);
        res.send(result_json);
        await browser.close()
    })();

});

app.listen(3000);








