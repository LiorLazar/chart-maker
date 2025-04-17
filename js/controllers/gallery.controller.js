'use strict'

var gElCanvas
var gCtx

function renderActions(chartId) {
    const chart = getChartById(chartId)
    console.log(chart)
    const elActions = document.querySelector('.editing-panel')
    elActions.innerHTML = `
        <button onclick="onAddTerm('${chart.id}')">Add Term</button>
        <button>Update Term</button>
        <button>Remove Term</button>`
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'block'
    console.log(gCharts)
    elGallery.innerHTML = gCharts.map(chart => `
        <div class="chart">
            <div onclick="onChartSelect('${chart.id}')">${chart.title}</div>
        </div>
        `).join('')
}

function onChartSelect(chartId) {
    const chart = getChartById(chartId)
    renderChart(chartId)
    renderActions(chartId)
    renderTerms(chartId)
}

function renderChart(chartId) {
    gElCanvas = document.querySelector('canvas')

    const parentWidth = gElCanvas.parentElement.offsetWidth
    const parentHeight = gElCanvas.parentElement.offsetHeight

    const aspectRatio = 16 / 9
    let canvasWidth = parentWidth
    let canvasHeight = parentWidth / aspectRatio

    if (canvasHeight > parentHeight) {
        canvasHeight = parentHeight
        canvasWidth = parentHeight * aspectRatio
    }

    gElCanvas.width = canvasWidth
    gElCanvas.height = canvasHeight

    gCtx = gElCanvas.getContext('2d')

    gCtx.fillStyle = 'lightgrey'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

    drawChart(gElCanvas, chartId)
}

function renderTerms(chartId) {
    const chart = getChartById(chartId)
    const terms = chart.terms
    const elTermsPanel = document.querySelector('.terms-panel')

    var tableHTMLTxt = `
        <table>
            <thead>
                <th>
                    Term Name
                </th>
                <th>
                    Term Value
                </th>
                <th>
                    Term Color
                </th>
            </thead>
        <tbody class="terms-content">
        `
    tableHTMLTxt += terms.map(term => `
        <tr>
            <td>${term.label}</td>
            <td>${term.value}</td>
            <td>${term.color}</td>
        </tr>
        `).join('')

    tableHTMLTxt += '</tbody></table>'
    elTermsPanel.innerHTML = tableHTMLTxt
}

function onAddTerm(chartId) {
    var label = prompt('Desired Label?')
    var value = prompt('Desired Value?')
    var color = prompt('Desired Color?')
    addTerm(chartId, { label, value, color })
    renderChart(chartId)
}
function onUpdateTerm(idx, term) {
    updateTerm(idx, term)
    renderChart(chartId)
}
function omRemoveTerm(idx) {
    removeTerm(idx)
    renderChart(chartId)
}