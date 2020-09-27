var data = Highcharts.getJSON(`https://raw.githubusercontent.com/shivakuchya/json/master/finalsamplesuperstore.json`,
function(data){
var tempDateArr = data.map(item => item.OrderDate)
var tempData = data
var parsedDate = []
for (var i = 0; i < tempDateArr.length; i++) {
    var date = new Date(tempDateArr[i]),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    parsedDate.push(Date.parse([date.getFullYear(), mnth].join(" ")));
}
for (var i = 0; i < tempData.length; i++) {
    tempData[i].OrderDate = parsedDate[i]
}

//creating a distinct array of Dates in YYYYMM format 
var setDate = new Set(parsedDate)
var distinctdate = Array.from(setDate)
actualDistinctDate = distinctdate.sort()     // sorted distinct date set 


// Formated key value pair according to date and avg.
var actualPair = []
var TotalSales = 0
var TargetValue = 0
for (var i = 0; i < actualDistinctDate.length; i++) {
    var actualArray = []
    var count = 0
    var sum = 0
    var targetsum = 0
    for (var j = 0; j < tempData.length; j++) {
        if (actualDistinctDate[i] === tempData[j].OrderDate) {
            sum += tempData[j].Sales                   // Total month wise sales 
            targetsum+=tempData[j].SalesForecast
            count += 1
        }
    }
    TargetValue+=targetsum
    TotalSales += sum
    actualArray.push(distinctdate[i])
    actualArray.push(sum)
    actualPair.push(actualArray)    // Array of multiDate and average
}
// days to ship area chart
Highcharts.stockChart('chartContainer1', {
    chart: {
        type: 'line',
        zoomType: 'xy',
        panning: true,
        panKey: 'shift'
    },
    navigator: {
        enabled: false
    },

    rangeSelector: {
        enabled: false,
        inputEnabled: false,
        inputStyle: {
            color: 'rgb(237, 138, 136 )',
            fontWeight: 'bold'
        },
        buttonTheme: {
            fill: 'rgb(237, 138, 136 )',

        },
        states: {
            select: {
                fill: 'rgb(237, 138, 136 )',
                style: {
                    color: 'rgb(237, 138, 136 )'
                }
            }
        },

    },
    navigation: {
        buttonOptions: {
            enabled: false
        },
    },


    title: {
        
        useHTML: true,
        text : '<div><p style= "margin: 1px 1px;"> Total Sales <span id="color1"  style = "font-size: 25px;color:rgb(237, 138, 136 );">  $' + TotalSales +'</span></p></div>',
        style: {
            color: 'rgb(216, 229, 230)',
            fontWeight: 'null',
        },                    
        align: 'left',
        x: 0,
    },
    subtitle: {
        useHTML: true,
        text : '<div><p style="margin: 1px 1px; font-size: 15px"> Target Sales <span style = "font-size: 20px">  $' + TargetValue +'</span></p></div>',
        style: {
            color: 'rgb(216, 229, 230)',
            fontWeight: 'null',
        },
        align: 'left',
        x: 5
    },
    credits: {
        enabled: false
    },

    scrollbar: {
        enabled: false
    },
    yAxis: {
        gridLineWidth: 0,
        plotLines: [{
            color : (TotalSales < TargetValue) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
            // color: 'rgb(237, 138, 136 )',
            width: 2,
            value: 240000
        }]
    },
    series: [{
        
        name: 'Average Shipping Time',
        data: actualPair, 
        color : (TotalSales < TargetValue) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
        // color: 'rgb(237, 138, 136 )',
        type: 'area',
        tooltip: {
            valueDecimals: 2
        },
        fillColor: {

            linearGradient: {
                x1: 4,
                y1: 4,
                x2: 0,
                y2: 0
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        }
    }]
});
})
