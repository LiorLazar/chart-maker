'use strict'

var gCharts
_createCharts()

function _createCharts() {
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
                    label: 'Puk',
                    value: 50,
                    color: 'pink'
                },
                {
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
    const barWidth = 50
    const barSpace = 25
    const gCtx = gElCanvas.getContext('2d')

    const chart = getChartById(chartId)
    if (!chart) return

    let x = 0;

    chart.terms.forEach(term => {
        const barHeight = term.value
        const barY = gElCanvas.height - barHeight

        gCtx.fillStyle = term.color
        gCtx.fillRect(x, barY, barWidth, barHeight)

        x += barWidth + barSpace
    });
}

function getChartById(chartId) {
    return gCharts.find(chart => chart.id === chartId)
}