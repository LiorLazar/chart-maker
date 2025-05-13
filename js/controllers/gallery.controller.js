'use strict'

var gElCanvas
var gCtx

function renderActions(chartId) {
    const chart = getChartById(chartId)
    console.log(chart)
    const elActions = document.querySelector('.editing-panel')
    elActions.innerHTML = `
        <button onclick="onAddTerm('${chart.id}')">Add Term</button>
        <button onclick="onUpdateTerm('${chart.id}')">Update Term</button>
        <button onclick="omRemoveTerm('${chart.id}')">Remove Term</button>
        `
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
    renderTerms(chartId)
}

function renderTerms(chartId) {
    const chart = getChartById(chartId)
    const terms = chart.terms
    const elTermsPanel = document.querySelector('.terms-panel')

    var tableHTMLTxt = `
        <table>
            <thead>
                <th>
                   ID
                </th>
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
    tableHTMLTxt += terms.map((term, idx) => `
        <tr>
            <td>${idx}</td>
            <td>${term.label}</td>
            <td>${term.value}</td>
            <td>${term.color}</td>
        </tr>
        `).join('')

    tableHTMLTxt += '</tbody></table>'
    elTermsPanel.innerHTML = tableHTMLTxt
    var elValueType = `<div>
            <ul class="value-type flex clean-list">
                <li onclick="onSetValueType(this,'${chartId}')">123</li>
                <li onclick="onSetValueType(this,'${chartId}')">%</li>
            </ul>`
    elTermsPanel.innerHTML += elValueType
}

function onAddTerm(chartId) {
    const label = prompt('Desired Label?')
    const value = prompt('Desired Value?')
    const color = prompt('Desired Color?')
    addTerm(chartId, { label, value, color })
    renderChart(chartId)

}
function onUpdateTerm(chartId) {
    const termProp = prompt('Which Term Property To Update?')
    const termId = prompt('What is The Term ID?')
    const termValue = prompt('What is the term value?')
    updateTerm(chartId, termId, termProp, termValue)
    renderChart(chartId)
}
function omRemoveTerm(chartId) {
    const termId = prompt('What is the term ID to remove?')
    removeTerm(chartId, termId)
    renderChart(chartId)
}

function onDownload() {
    const elLink = document.getElementById('download-link')
    const downloadContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = downloadContent
    elLink.download = 'my-chart.jpg'
}

function onUploadChart(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedChart) {
        const encodedUploadedChartUrl = encodeURIComponent(uploadedChart)
        console.log('encodedUploadedImgUrl:', encodedUploadedChartUrl)
        document.querySelector('.share-container').innerHTML = `
        <a href="${uploadedChart}">BABA</a>
        <p>Image url: ${uploadedChart}</p>
        <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedChartUrl}&t=${encodedUploadedChartUrl}')">
           Share on Facebook  
        </button>`
    }
    uploadChart(canvasData, onSuccess)
}

function onSetValueType(elType, chartId) {
    const terms = getTerms(chartId)
    console.log('Original Terms:', terms)

    for (let i = 0; i < terms.length; i++) {
        if (elType.innerText === '123' && String(terms[i].value).includes('%')) terms[i].value = terms[i].value.replace('%', '')
        else if (elType.innerText === '%' && !String(terms[i].value).includes('%')) terms[i].value += '%'
        updateTerm(chartId, i, terms[i].label, String(terms[i].value));
    }

    console.log('Updated Terms:', terms);
    renderTerms(chartId)
    renderChart(chartId)
}