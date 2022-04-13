module.exports = { getResults, getGpu };

function getResults() {
    //let resultsList = document.getElementById('results');
    let resultsList = "";
    //let budget = document.getElementById('budget');

    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        //resultsList.append(`${name}:${value}, `)
        resultsList = (resultsList + name +":"+value+",")
    })
    console.log(resultsList)
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    console.log(budget)
    let resolution = words[1].substring(11)
    console.log(resolution)
    let fps = words[2].substring(4)
    console.log(fps)
    let performance = words[3].substring(12)
    console.log(performance)
    let cpuChoice = words[4].substring(10)
    console.log(cpuChoice)
    let gpuChoice = words[5].substring(10)
    console.log(gpuChoice)
    let overclock = words[6].substring(10)
    console.log(overclock)

    let gpuBudget = 0.5 * budget;
    console.log(gpuBudget)
}
function getGpu(gpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        //resultsList.append(`${name}:${value}, `)
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let gpuBudget = 0.5 * budget;

    let gpuInfoSorted = gpuInfo.sort((a, b) => parseInt(a.gpuPrice, 10) > parseInt(b.gpuPrice, 10) ? 1 : -1);
    console.log(gpuInfoSorted)
    //either perform binary search, or search through array until price is above the budget, then return the one below.
    var i = 0;
    while (gpuInfoSorted[i].gpuPrice < gpuBudget) {
        i++;
    }
    i -= 1;
    console.log(gpuInfoSorted[i].gpuPrice);
}