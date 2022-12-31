import { GeneratedData } from '../types/general-types';

const getHistogramCategories = (data: GeneratedData) => {
    return data.values.map((_, index) => index + 1);
}
const histogramConfiguration = (title: string, data: GeneratedData) => {

    return {
        chart: {
            renderTo: 'multi-histogram'
        },
        tooltip: {
            enabled: true
        },
        title: {
            text: title,
            align: 'left',
            margin: 100
        },
        xAxis: {
            categories: getHistogramCategories(data),
            tickColor: '#fff',
            lineColor: '#fff'
        },
        yAxis: {
            allowDecimals: false,
            endOnTick: true,
            gridLineColor: '#fff',
            labels: {
                style: {
                    color: '#8c8c8c',
                    fontSize: '12px'
                }
            },
            title: {
                text: null
            }
        },
        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            itemHoverStyle: {
                cursor: 'default'
            }
        },
        series: [
            {
                type: 'column',
                name: 'Weight',
                data: data.weights
            },
            {
                type: 'column',
                name: 'Value',
                data: data.values
            },
        ],
        plotOptions: {
            column: {
                events: {
                    legendItemClick: function() {return false;}
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        colors: [
            'red', // 1
            'blue', // 2
        ],
    };
}

export {
    histogramConfiguration
}