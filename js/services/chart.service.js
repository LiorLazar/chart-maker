'use strict'

var gCharts
_createCharts()

function _createCharts() {
    gCharts = loadFromStorage('charts')

    if (gCharts && gCharts.length > 0) return

    gCharts = [
        _createChart(
            'rectangles',
            'Elections Results',
            {
                font: 'Arial',
                fontSize: '45px',
                backgroundColor: 'transparant'
            },
            'precent/value',
            [
                {
                    id: 0,
                    label: 'Puk',
                    value: 50,
                    color: 'pink'
                },
                {
                    id: 1,
                    label: 'Muk',
                    value: 50,
                    color: 'green'
                }
            ]
        ),
        _createChart(
            'bars',
            'Sales Data',
            {
                font: 'Verdana',
                fontSize: '30px',
                backgroundColor: 'lightblue'
            },
            'value',
            [
                {
                    label: 'Q1',
                    value: 120,
                    color: 'blue'
                },
                {
                    label: 'Q2',
                    value: 150,
                    color: 'orange'
                },
                {
                    label: 'Q3',
                    value: 100,
                    color: 'purple'
                },
                {
                    label: 'Q4',
                    value: 180,
                    color: 'red'
                }
            ]
        )
    ]
    _saveCharts()
}

function _createChart(theme, title, style, valueType, terms) {
    return {
        id: makeId(),
        theme,
        title,
        style,
        valueType,
        terms
    }

}

function drawChart(gElCanvas, chartId) {
    const gCtx = gElCanvas.getContext('2d')

    const chart = getChartById(chartId)
    if (!chart) {
        console.error('Chart not found for ID:', chartId)
        return
    }

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    // Calculate dynamic sizes based on canvas dimensions
    const canvasWidth = gElCanvas.width
    const canvasHeight = gElCanvas.height
    const titleHeight = 40
    const chartAreaHeight = canvasHeight - titleHeight - 20
    const barWidth = canvasWidth / (chart.terms.length * 3)
    const barSpace = barWidth / 2

    // Draw chart title
    gCtx.font = `${Math.min(canvasWidth / 20, 30)}px ${chart.style.font}`
    gCtx.textAlign = 'center'
    gCtx.fillStyle = 'black'
    gCtx.fillText(chart.title, canvasWidth / 2, titleHeight / 2 + 10)

    // Parse values and calculate the maximum value
    const maxValue = Math.max(
        ...chart.terms.map(term => parseFloat(String(term.value).replace('%', '')) || 0)
    )

    // Draw Y-axis scale
    const scaleStep = Math.ceil(maxValue / 5)

    gCtx.textAlign = 'right'
    gCtx.fillStyle = 'black'
    for (let i = 0; i <= 5; i++) {
        const y = chartAreaHeight - (i * (chartAreaHeight / 5)) + titleHeight
        const value = i * scaleStep

        // Draw scale value
        gCtx.fillText(value, 40, y)

        // Draw horizontal grid line
        gCtx.strokeStyle = '#ccc'
        gCtx.beginPath()
        gCtx.moveTo(50, y)
        gCtx.lineTo(canvasWidth - 20, y)
        gCtx.stroke()
    }

    // Draw bars and X-axis labels
    let x = 70
    chart.terms.forEach(term => {
        // Parse the term value and calculate the bar height
        const termValue = parseFloat(String(term.value).replace('%', '')) || 0
        const barHeight = (termValue / maxValue) * chartAreaHeight
        const barY = chartAreaHeight - barHeight + titleHeight

        // Draw the bar
        gCtx.fillStyle = term.color
        gCtx.fillRect(x, barY, barWidth, barHeight)

        // Draw the label
        gCtx.textAlign = 'center'
        gCtx.fillStyle = 'black'
        gCtx.fillText(term.label, x + barWidth / 2, chartAreaHeight + titleHeight + 20)

        x += barWidth + barSpace
    })

    // Draw axes
    gCtx.strokeStyle = 'black'
    gCtx.beginPath()
    gCtx.moveTo(50, chartAreaHeight + titleHeight)
    gCtx.lineTo(50, titleHeight)
    gCtx.moveTo(50, chartAreaHeight + titleHeight)
    gCtx.lineTo(canvasWidth - 20, chartAreaHeight + titleHeight)
    gCtx.stroke()
}

function getChartById(chartId) {
    return gCharts.find(chart => chart.id === chartId)
}

function addTerm(chartId, term) {
    const chart = getChartById(chartId)
    const terms = chart.terms
    // console.log('terms', terms)
    terms.push(term)
    _saveCharts()
}
function updateTerm(chartId, termId, termProp, value) {
    const chart = getChartById(chartId)
    // const terms = chart.terms
    const term = getTermById(chartId, termId)
    console.log(term)

    switch (termProp.toLowerCase()) {
        case 'name':
            term.label = value
            break
        case 'value':
            term.value = value
            break
        case 'color':
            term.color = value
            break
    }
    _saveCharts()
}
function removeTerm(chartId, termId) {
    const chart = getChartById(chartId)
    if (!chart) return
    const terms = chart.terms
    terms.splice(termId, 1)
    _saveCharts()
}

function getTermById(chartId, termId) {
    const chart = getChartById(chartId)
    console.log(chart)
    if (!chart) return
    const terms = chart.terms
    return terms[termId]
}

function _saveCharts() {
    saveToStorage('charts', gCharts)
}

function getTerms(chartId) {
    const chart = getChartById(chartId)
    if (!chart) return
    return chart.terms
}