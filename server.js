const path = require('path')
const express = require('express')
const { GeforceGpuScrape, RadeonGpuScrape, RyzenCpuScrape, IntelCpuScrape, RyzenMoboScrape } = require('./public/js/webScraper.js')
const app = express()
const port = 3000

app.set('port', process.env.PORT || 3000);

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

//new GeforceGpuScrape();
//new RyzenCpuScrape();
new IntelCpuScrape();
//new RyzenMoboScrape();
//new RadeonGpuScrape();

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))

