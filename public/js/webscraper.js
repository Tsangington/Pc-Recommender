const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');
module.exports = { GpuScrape };

function GpuScrape() {
    (async () => {

        const config = {
            baseSiteUrl: `https://www.amazon.co.uk/`,
            startUrl: `https://www.amazon.co.uk/s?k=geforce+gpu&rh=n%3A340831031%2Cn%3A430500031&dc&crid=1Y5BCLL47Y56C&qid=1649589532&rnid=1642204031&sprefix=%2Caps%2C52&ref=sr_nr_n_2`,
            concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
            maxRetries: 3,//The scraper will try to repeat a failed request ssfew times(excluding 404). Default is 5.       
            logPath: './logs/'//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data. 
        }


        const gpuScraper = new Scraper(config);//Create a new Scraper instance, and pass config to it.

        //Now we create the "operations" we need:

        const root = new Root();//The root object fetches the startUrl, and starts the process.  

        //Any valid cheerio selector can be passed. For further reference: https://cheerio.js.org/
        const gpuListing = new OpenLinks('.a-size-mini a-spacing-none a-color-base s-line-clamp-2', { name: 'gpuListing' })

        const gpuName = new CollectContent('.productTitle', { name: 'gpuName' });

        const gpuPrice = new CollectContent('.a-price-whole', { name: 'gpuPrice' });

        const gpuSeries = new CollectContent('.a-spacing-small po-graphics_coprocessor', { name: 'gpuSeries' });

        const gpuPCI = new CollectContent('.a-spacing-small po-graphics_card_interface', { name: 'gpuPCI' });

        //const gpuPower = new CollectContent('', { name: 'gpuPower' });

        root.addOperation(gpuListing);//Then we create a scraping "tree":
        gpuListing.addOperation(gpuName);
        gpuListing.addOperation(gpuPrice);
        gpuListing.addOperation(gpuSeries);
        gpuListing.addOperation(gpuPCI);
        //gpuInfo.addOperation(gpuPower);

        await gpuScraper.scrape(root);

        const gpuInfo = gpuListing.getData()//Will return an array of all objects

        fs.writeFile('/gpuInfo.json', JSON.stringify(gpuInfo), () => { })//Will produce a formatted JSON containing all gpus and their selected data.
    })();
};