module.exports = { getResults };

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
}