module.exports = { getGeforceGpu,getRadeonGpu, getRyzenCpu,getIntelCpu, getRyzenMobo ,getIntelMobo,getTotalPrice };
var gpuPrice;
var cpuPrice;
var moboPrice;

function getGeforceGpu(gpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let performance = words[1].substring(12)

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
        if (i + 1 == gpuInfoSorted.length) {
            i++;
            break;
        }
        i++;
    }
    i -= 1;
    let gpuResultName = document.getElementById('gpuResultName');
    gpuResultName = gpuResultName.append(`${gpuInfoSorted[i].gpuName}`);
    let gpuResultPrice = document.getElementById('gpuResultPrice')
    gpuResultPrice.append(`${gpuInfoSorted[i].gpuPrice}`);

    gpuPrice = gpuInfoSorted[i].gpuPrice;
    console.log(gpuPrice)
}
function getRadeonGpu(gpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let performance = words[1].substring(12)

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
        if (i + 1 == gpuInfoSorted.length) {
            i++;
            break;
        }
        i++;
    }
    i -= 1;
    let gpuResultName = document.getElementById('gpuResultName');
    gpuResultName = gpuResultName.append(`${gpuInfoSorted[i].gpuName}`);
    let gpuResultPrice = document.getElementById('gpuResultPrice')
    gpuResultPrice.append(`${gpuInfoSorted[i].gpuPrice}`);

    gpuPrice = gpuInfoSorted[i].gpuPrice;
    console.log(gpuPrice)
}

function getRyzenCpu(cpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let performance = words[1].substring(12)

    let cpuBudget = budget

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
        if (i + 1 == cpuInfoSorted.length) {
            i++;
            break;
        }
        i++;
    }
    i -= 1;
    let cpuResultName = document.getElementById('cpuResultName');
    cpuResultName = cpuResultName.append(`${cpuInfoSorted[i].cpuName}`);
    var cpuResultPrice = document.getElementById('cpuResultPrice')
    cpuResultPrice.append(`${cpuInfoSorted[i].cpuPrice}`);

    cpuPrice = cpuInfoSorted[i].cpuPrice;
    console.log(cpuPrice)
}
function getIntelCpu(cpuInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');

    let budget = words[0].substring(7)
    let performance = words[1].substring(12)

    let cpuBudget = budget

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
        if (i + 1 == cpuInfoSorted.length) {
            i++;
            break;
        }
        i++;
    }
    i -= 1;
    let cpuResultName = document.getElementById('cpuResultName');
    cpuResultName = cpuResultName.append(`${cpuInfoSorted[i].cpuName}`);
    var cpuResultPrice = document.getElementById('cpuResultPrice')
    cpuResultPrice.append(`${cpuInfoSorted[i].cpuPrice}`);

    cpuPrice = cpuInfoSorted[i].cpuPrice;
    console.log(cpuPrice)
}
function getRyzenMobo(moboInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');
    let budget = words[0].substring(7)

    let moboBudget = 0.1 * parseFloat(budget)

    let moboInfoSorted = moboInfo.sort((a, b) => parseInt(a.moboPrice, 10) > parseInt(b.moboPrice, 10) ? 1 : -1);
    console.log(moboInfoSorted)

    //either perform binary search, or search through array until price is above the budget, then return the one below.
    var i = 0;
    while (moboInfoSorted[i].moboPrice <= moboBudget) {

        if (i + 1 == moboInfoSorted.length) {
            i++;
            break;
        }
        i++;
    }
    i -= 1;
    let moboResultName = document.getElementById('moboResultName');
    moboResultName = moboResultName.append(`${moboInfoSorted[i].moboName}`);
    var moboResultPrice = document.getElementById('moboResultPrice')
    moboResultPrice.append(`${moboInfoSorted[i].moboPrice}`);

    moboPrice = moboInfoSorted[i].moboPrice;
    console.log(moboPrice);
}
function getIntelMobo(moboInfo) {
    let resultsList = "";
    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        resultsList = (resultsList + name + ":" + value + ",")
    })
    let words = resultsList.split(',');
    let budget = words[0].substring(7)

    let moboBudget = 0.1 * parseFloat(budget)

    let moboInfoSorted = moboInfo.sort((a, b) => parseInt(a.moboPrice, 10) > parseInt(b.moboPrice, 10) ? 1 : -1);
    console.log(moboInfoSorted)

    //either perform binary search, or search through array until price is above the budget, then return the one below.
    var i = 0;
    while (moboInfoSorted[i].moboPrice <= moboBudget) {

        if (i + 1 == moboInfoSorted.length) {
            i++;
            break;
        }
        i++;
    }
    i -= 1;
    let moboResultName = document.getElementById('moboResultName');
    moboResultName = moboResultName.append(`${moboInfoSorted[i].moboName}`);
    var moboResultPrice = document.getElementById('moboResultPrice')
    moboResultPrice.append(`${moboInfoSorted[i].moboPrice}`);

    moboPrice = moboInfoSorted[i].moboPrice;
    console.log(moboPrice);
}
function getTotalPrice() {
    let totalPrice =  parseInt(gpuPrice) + parseInt(cpuPrice) + parseInt(moboPrice);
    console.log(parseInt(totalPrice))
    let resultTotalPrice = document.getElementById('resultTotalPrice');
    resultTotalPrice.append(totalPrice);
}
