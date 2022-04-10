const path = require('path')
const express = require('express')
const { GpuScrape } = require('./public/js/gpuWebScraper')
const app = express()
const port = 3000
const fs = require('fs');
const { raw } = require('express')

app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))

rawData = new GpuScrape();
//let gpuData = JSON.parse(rawData)
var jsonContent = JSON.stringify(rawData);
//console.log(rawData);

fs.writeFile("gpuInfo.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});