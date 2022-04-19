const { json } = require('express');
const fs = require('fs');
const { get } = require('https');
module.exports = { GeforceGpuScrape,RadeonGpuScrape, RyzenCpuScrape , RyzenMoboScrape};
//could make one function, change variable names to Name and Price, means save a lot of code,
//and just give each page a separate name to switch to, so only one instance of puppeteer may be needed.

function GeforceGpuScrape() {
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

            for (let i = 5; i < 20; i++) {
                // Selector for the card name
                let cardName = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > h2 > a > span';
                let r = await page.waitForSelector(cardName);
                let nameElement = await page.$(cardName);
                var nameValue = await page.evaluate(el => el.textContent, nameElement);

                // Selector for the card price
                let cardPrice = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20 > div > div.a-section.a-spacing-none.a-spacing-top-small.s-price-instructions-style > div > a > span > span:nth-child(2) > span.a-price-whole';
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
                let gpuInfojson = fs.readFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/geforceGpuInfo.json", "utf-8");
                let gpuInfo = JSON.parse(gpuInfojson);

                //push the new gpu listing into the array 
                gpuInfo.push(gpuObject);

                //stringify into JSON notation before writing back into file
                gpuInfojson = JSON.stringify(gpuInfo, null, 2);
                //code not needed for now, already have test data in file
                //fs.writeFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/geforceGpuInfo.json, gpuInfojson, "utf-8");
                console.log(gpuInfojson);
            }
        }
        catch (e) {
            console.log('Amazon scrap error-> ', e);
            await browser.close();
        }
    })();
};
function RadeonGpuScrape() { //Less radeon GPUs are available on amazon, less popular, more offers, and prime tags.
    // Need to optimise, and make sure it is actually radeon GPUs in radeonGpuInfo.json
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
            await page.goto('https://www.amazon.co.uk/s?k=radeon+gpu&crid=11DB0RMW4OQNM&sprefix=radeon+gpu%2Caps%2C184&ref=nb_sb_noss_1', { waitUntil: 'load', timeout: 30000 });

            for (let i = 5; i < 20; i++) {
                // Selector for the card name
                let cardName = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(' + i + ') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > h2 > a > span';
                let r = await page.waitForSelector(cardName);
                let nameElement = await page.$(cardName);
                var nameValue = await page.evaluate(el => el.textContent, nameElement);

                // Selector for the card price
                let cardPrice = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(' + i + ') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20 > div > div.a-section.a-spacing-none.a-spacing-top-small.s-price-instructions-style > div > a > span > span:nth-child(2) > span.a-price-whole';
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
                let gpuInfojson = fs.readFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/radeonGpuInfo.json", "utf-8");
                let gpuInfo = JSON.parse(gpuInfojson);

                //push the new gpu listing into the array 
                gpuInfo.push(gpuObject);

                //stringify into JSON notation before writing back into file
                gpuInfojson = JSON.stringify(gpuInfo, null, 2);
                //code not needed for now, already have test data in file
                //fs.writeFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/radeonGpuInfo.json, gpuInfojson, "utf-8");
                console.log(gpuInfojson);
            }
        }
        catch (e) {
            console.log('Amazon scrap error-> ', e);
            await browser.close();
        }
    })();
};
function RyzenCpuScrape() {
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
            await page.goto('https://www.amazon.co.uk/s?k=amd+ryzen+cpu&i=computers&rh=n%3A430515031%2Cp_89%3AAMD%2Cp_n_feature_fourteen_browse-bin%3A8322506031%2Cp_n_feature_two_browse-bin%3A12724454031&dc&crid=2FKUUZIXL4X6&qid=1649967324&rnid=12724453031&sprefix=amd+ryzen+cpu%2Caps%2C64&ref=sr_nr_p_n_feature_two_browse-bin_1', { waitUntil: 'load', timeout: 30000 });

            for (let i = 6; i < 20; i++) {
                // Selector for the card name
                let cpuName = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > h2 > a > span';
                let r = await page.waitForSelector(cpuName);
                let nameElement = await page.$(cpuName);
                var nameValue = await page.evaluate(el => el.textContent, nameElement);

                // Selector for the card price
                let cpuPrice = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20 > div > div.a-section.a-spacing-none.a-spacing-top-small.s-price-instructions-style > div > a > span > span:nth-child(2) > span.a-price-whole';
                let s = await page.waitForSelector(cpuPrice);
                let priceElement = await page.$(cpuPrice)
                var priceValue = await page.evaluate(el => el.textContent, priceElement)

                //removes any commas or fullstops
                if (priceValue.indexOf(",") != -1) {
                    priceValue = priceValue.replace(",", "");
                }
                priceValue = priceValue.slice(0, -1);

                //read from existing json file
                let cpuObject = { "cpuName": nameValue, "cpuPrice": priceValue };
                let cpuInfojson = fs.readFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/ryzenCpuInfo.json", "utf-8");
                let cpuInfo = JSON.parse(cpuInfojson);

                //push the new gpu listing into the array 
                cpuInfo.push(cpuObject);

                //stringify into JSON notation before writing back into file
                cpuInfojson = JSON.stringify(cpuInfo, null, 2);
                //code not needed for now, already have test data in file
                //fs.writeFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/ryzenCpuInfo.json", cpuInfojson, "utf-8");
                console.log(cpuInfojson)
            }
        }
        catch (e) {
            console.log('Amazon scrap error-> ', e);
            await browser.close();
        }
    })();
};
function RyzenMoboScrape() {
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
            await page.goto('https://www.amazon.co.uk/Ryzen-Motherboard/s?k=Ryzen+Motherboard&rh=n%3A430512031%2Cp_n_feature_two_browse-bin%3A12724454031&dc&qid=1650128404&rnid=12724453031&ref=sr_nr_p_n_feature_two_browse-bin_1', { waitUntil: 'load', timeout: 30000 });

            for (let i = 4; i < 20; i++) {
                // Selector for the card name
                let moboName = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(' + i + ') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > h2 > a > span';
                let r = await page.waitForSelector(moboName);
                let nameElement = await page.$(moboName);
                var nameValue = await page.evaluate(el => el.textContent, nameElement);

                // Selector for the card price
                let moboPrice = 'div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(' + i + ') > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20 > div > div.a-section.a-spacing-none.a-spacing-top-small.s-price-instructions-style > div > a > span > span:nth-child(2) > span.a-price-whole';
                let s = await page.waitForSelector(moboPrice);
                let priceElement = await page.$(moboPrice)
                var priceValue = await page.evaluate(el => el.textContent, priceElement)

                //removes any commas or fullstops
                if (priceValue.indexOf(",") != -1) {
                    priceValue = priceValue.replace(",", "");
                }
                priceValue = priceValue.slice(0, -1);

                //read from existing json file
                let moboObject = { "moboName": nameValue, "moboPrice": priceValue };
                let moboInfojson = fs.readFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/ryzenMoboInfo.json", "utf-8");
                let moboInfo = JSON.parse(moboInfojson);

                //push the new gpu listing into the array 
                moboInfo.push(moboObject);

                //stringify into JSON notation before writing back into file
                moboInfojson = JSON.stringify(moboInfo, null, 2);
                //code not needed for now, already have test data in file
                //fs.writeFileSync("D:/Users/harry/source/repos/CodeChallenge2022/public/html/ryzenMoboInfo.json", moboInfojson, "utf-8");
                console.log(moboInfojson)
            }
        }
        catch (e) {
            console.log('Amazon scrap error-> ', e);
            await browser.close();
        }
    })();
};