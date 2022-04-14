module.exports = { getGpu };

function getGpu(gpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        //resultsList.append(`${name}:${value}, `)
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let resolution = words[1].substring(11)
    let fps = words[2].substring(4)
    let performance = words[3].substring(12)
    let cpuChoice = words[4].substring(10)
    let gpuChoice = words[5].substring(10)
    let overclock = words[6].substring(10)

    let gpuBudget = budget
    if (performance == "balanced") {
        gpuBudget = 0.4 * parseFloat(budget)
    }
    else if (performance == "gpu") {
        gpuBudget = 0.5 * parseFloat(budget)
    }
    else if (performance == "cpu") {
        gpuBudget = 0.3 * parseFloat(budget)
    }
    

    let gpuInfoSorted = gpuInfo.sort((a, b) => parseInt(a.gpuPrice, 10) > parseInt(b.gpuPrice, 10) ? 1 : -1);
    console.log(gpuInfoSorted)
    //either perform binary search, or search through array until price is above the budget, then return the one below.
    var i = 0;
    while (gpuInfoSorted[i].gpuPrice < gpuBudget) {
        i++;
    }
    i -= 1;
    let gpuResultName = document.getElementById('gpuResultName');
    gpuResultName = gpuResultName.append(`${gpuInfoSorted[i].gpuName}`);
    let gpuResultPrice = document.getElementById('gpuResultPrice')
    gpuResultPrice = gpuResultPrice.append(`${gpuInfoSorted[i].gpuPrice}`);

    //add the rest of the prices when they are implemented.
    totalPrice = (parseFloat(gpuInfoSorted[i].gpuPrice));

    let resultTotalPrice = document.getElementById('resultTotalPrice')
    resultTotalPrice = resultTotalPrice.append(totalPrice)
}