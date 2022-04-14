const { json } = require('express');
const fs = require('fs');
module.exports = { GpuScrape };

function GpuScrape() {
    const puppeteer = require('puppeteer');
    (async () => {
        let resultObj = {}
        let returnedResponse;
        let browser
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--disable-features=site-per-process',
                    '--window-position=0,0',
                    '--disable-extensions',
                    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X   10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0    Safari/537.36"'
                ]
            });
            const page = await browser.newPage();
            await page.setViewport({ width: 1366, height: 800 });
            await page.goto('https://www.amazon.co.uk/s?k=geforce+gpu&rh=n%3A340831031%2Cn%3A430500031&dc&crid=1Y5BCLL47Y56C&qid=1649589532&rnid=1642204031&sprefix=%2Caps%2C52&ref=sr_nr_n_2', { waitUntil: 'load', timeout: 30000 });

            for (let i = 4; i < 20; i++) {
                // Selector for the card name
                let cardName = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > h2 > a > span';
                let r = await page.waitForSelector(cardName);
                let nameElement = await page.$(cardName);
                var nameValue = await page.evaluate(el => el.textContent, nameElement);

                // Selector for the card price
                let cardPrice = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20 > div > div.a-section.a-spacing-none.a-spacing-top-small.s-price-instructions-style > div > a > span > span:nth-child(2) > span.a-price-whole';
                let s = await page.waitForSelector(cardPrice);
                let priceElement = await page.$(cardPrice)
                var priceValue = await page.evaluate(el => el.textContent, priceElement)

                //removes any commas or fullstops
                if (priceValue.indexOf(",") != -1) {
                    priceValue = priceValue.replace(",", "");
                }
                priceValue = priceValue.slice(0, -1);

                //read from existing json file
                let gpuObject = { "gpuName": nameValue, "gpuPrice": priceValue };
                let gpuInfojson = fs.readFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/gpuInfo.json", "utf-8");
                let gpuInfo = JSON.parse(gpuInfojson);

                //push the new gpu listing into the array 
                gpuInfo.push(gpuObject);

                //stringify into JSON notation before writing back into file
                gpuInfojson = JSON.stringify(gpuInfo, null, 2);
                //code not needed for now, already have test data in file
                //fs.writeFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/gpuInfo.json, gpuInfojson, "utf-8");
            }
        }
        catch (e) {
            console.log('Amazon scrap error-> ', e);
            await browser.close();
        }
    })();
};
