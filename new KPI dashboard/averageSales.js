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
    actualDistinctDate = distinctdate.sort()

    // Formated key value pair according to date and avg.
    var actualPair = []
    var showAvg = 0
    var showCount = 0
    for (var i = 0; i < actualDistinctDate.length; i++) {
        var actualArray = []
        var count = 0
        var sum = 0
        var avg = 1
        for (var j = 0; j < tempData.length; j++) {
            if (actualDistinctDate[i] === tempData[j].OrderDate) {
                sum += tempData[j].Sales
                count += 1
            }
        }
        var avg = sum / count  //Finding Average 
        // Temperary array for creating key value pair                
        actualArray.push(distinctdate[i])
        actualArray.push(avg)
        showAvg += actualArray[1]
        actualPair.push(actualArray)    // Array of multiDate and average
        showCount += 1
    }
    // days to ship area chart
    Highcharts.stockChart('chartContainer2', {
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
                color: 'gray',
                fontWeight: 'bold'
            },
            buttonTheme: {
                fill: 'rgba(26,146,146,1)',

            },
            states: {
                select: {
                    fill: 'gray',
                    style: {
                        color: 'gray'
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
            text : '<div><p style= "margin: 1px 1px;"> Average Sales <span id="color2" style = "font-size: 25px;color:rgb(237, 138, 136 );">  $' + (TotalSales / 12420).toFixed(2) +'</span></p></div>',
            
            style: {
                color: 'rgb(216, 229, 230)',
                fontWeight: 'null'
            },
            align: 'left',
            x: 0
        },
        subtitle: {
            useHTML: true,
            text : '<div><p style= "margin: 1px 1px;font-size: 15px;"> Avg. Estimated Sales <span style = "font-size: 20px;">  $' + (TargetValue/12420).toFixed(2) +'</span></p></div>',
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
                color : ((TotalSales/12420) < (TargetValue/12420)) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                width: 2,
                value: 386
            }]
        },
        series: [{
            name: 'Average Shipping Time',
            data: actualPair,
            color : (TotalSales/12420 < TargetValue/12420) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
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