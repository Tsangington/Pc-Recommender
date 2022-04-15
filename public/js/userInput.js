module.exports = { getGpu, getCpu };

function getGpu(gpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        //resultsList.append(`${name}:${value}, `)
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let performance = words[1].substring(12)
    let cpuChoice = words[2].substring(10)
    let gpuChoice = words[3].substring(10)
    let overclock = words[4].substring(10)

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
    while (gpuInfoSorted[i].gpuPrice <= gpuBudget) {
        i++;
    }
    i -= 1;
    let gpuResultName = document.getElementById('gpuResultName');
    gpuResultName = gpuResultName.append(`${gpuInfoSorted[i].gpuName}`);
    let gpuResultPrice = document.getElementById('gpuResultPrice')
    gpuResultPrice = gpuResultPrice.append(`${gpuInfoSorted[i].gpuPrice}`);
}

function getCpu(cpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        //resultsList.append(`${name}:${value}, `)
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let performance = words[1].substring(12)
    let cpuChoice = words[2].substring(10)
    let gpuChoice = words[3].substring(10)
    let overclock = words[4].substring(10)

    let gpuBudget = budget

    if (performance == "balanced") {
        cpuBudget = 0.1 * parseFloat(budget)
    }
    else if (performance == "gpu") {
        cpuBudget = 0.08 * parseFloat(budget)
    }
    else if (performance == "cpu") {
        cpuBudget = 0.15 * parseFloat(budget)
    }

    let cpuInfoSorted = cpuInfo.sort((a, b) => parseInt(a.cpuPrice, 10) > parseInt(b.cpuPrice, 10) ? 1 : -1);
    console.log(cpuInfoSorted)

    //either perform binary search, or search through array until price is above the budget, then return the one below.
    var i = 0;
    while (cpuInfoSorted[i].cpuPrice <= cpuBudget) {
        i++;
    }
    i -= 1;
    let cpuResultName = document.getElementById('cpuResultName');
    cpuResultName = cpuResultName.append(`${cpuInfoSorted[i].cpuName}`);
    let cpuResultPrice = document.getElementById('cpuResultPrice')
    cpuResultPrice = cpuResultPrice.append(`${cpuInfoSorted[i].cpuPrice}`);
}

