'use strict'

var gElCanvas
var gCtx

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
    renderChartEditor(chartId)
}

function renderChartEditor(chartId) {
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