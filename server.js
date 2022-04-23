const path = require('path')
const express = require('express')
const { GeforceGpuScrape, RadeonGpuScrape, RyzenCpuScrape, IntelCpuScrape, RyzenMoboScrape, IntelMoboScrape } = require('./public/js/webScraper.js')
const app = express()
const port = 5000;
const puppeteer = require('puppeteer');

app.set('port', process.env.PORT || 5000);

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/html', express.static(__dirname + 'public/html'))

// Set Views
app.set('views', './views')

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

// Support for pkg
const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (process.pkg
        ? path.join(
            path.dirname(process.execPath),
            'puppeteer',
            ...puppeteer
                .executablePath()
                .split(path.sep)
                .slice(6), // /snapshot/project/node_modules/puppeteer/.local-chromium
        )
        : puppeteer.executablePath());

const browser = puppeteer.launch({
    executablePath,
});

new GeforceGpuScrape();
//new RyzenCpuScrape();
//new IntelCpuScrape();
//new RyzenMoboScrape();
//new RadeonGpuScrape();
//new IntelMoboScrape();

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))

