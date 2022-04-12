module.exports = { getResults };

function getResults() {
    const resultsList = document.getElementById('results');
    let budget = document.getElementById('budget');

    new URLSearchParams(window.location.search).forEach((value,
        name) => {
        resultsList.append(`${name}:${value}, `)
    })

    let words = resultsList.split(', ');

    budget = words[0].substring(8)
    let resolution = words[1].substring(12)
    let fps = words[2].substring(5)
    let performance = words[3].substring(13)
    let cpuChoice = words[4].substring(11)
    let gpuChoice = words[5].substring(11)
    let overclock = words[6].substring(11)
}