'use strict'

var gElCanvas
var gCtx

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'block'
    console.log(gCharts)
    elGallery.innerHTML = gCharts.map(chart => `
        <div class="chart">
            <div onclick="onChartSelect()">${chart.title}</div>
        </div>
        `).join('')
}

function onChartSelect() {
    renderChartEditor()
}

function renderChartEditor() {
    gElCanvas = document.querySelector('canvas')

    const style = window.getComputedStyle(gElCanvas)
    const canvasWidth = parseFloat(style.width)
    const canvasHeight = parseFloat(style.height)

    gElCanvas.width = canvasWidth
    gElCanvas.height = canvasHeight

    gCtx = gElCanvas.getContext('2d')

    gCtx.fillStyle = 'lightgrey'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

    drawCharts(gElCanvas)

}