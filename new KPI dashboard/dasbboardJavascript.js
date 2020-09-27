
    var data = Highcharts.getJSON(`https://raw.githubusercontent.com/shivakuchya/json/master/finalsamplesuperstore.json`,
        function (data) {

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


            //-----------------------------------------
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

            // -------------------------------------------


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
            var totalProfit = 0
            for (var i = 0; i < actualDistinctDate.length; i++) {
                var actualArray = []
                var sum = 0
                for (var j = 0; j < tempData.length; j++) {
                    if (actualDistinctDate[i] === tempData[j].OrderDate) {
                        sum += tempData[j].Profit                  // Total month wise sales 

                    }

                }
                totalProfit += sum
                // Temperary array for creating key value pair                
                actualArray.push(distinctdate[i])
                actualArray.push(sum)
                actualPair.push(actualArray)    // Array of multiDate and average
            }
            Highcharts.stockChart('chartContainer3', {
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
                    text : '<div><p style= "margin: 1px 1px;"> Total Profit <span id="color3" style = "font-size: 25px;color:rgba(26,146,146,1);">  $' + totalProfit +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null'
                    },
                    align: 'left',
                    x: 0
                },
                subtitle: {
                    useHTML: true,     
                    text : '<div><p style= "margin: 1px 1px;font-size: 15px;"> Target Profit <span style = "font-size: 20px;">  $' + 350000 +'</span></p></div>',
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
                        color : (totalProfit < 350000) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                        width: 2,
                        value: 37500
                    }]
                },
                series: [{
                    name: 'Average Shipping Time',
                    data: actualPair,
                    color : (totalProfit < 350000) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
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
            //------------------------------------------------------------

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
            var averageProfitSum = 0
            for (var i = 0; i < actualDistinctDate.length; i++) {
                var actualArray = []
                var count = 0
                var sum = 0
                var avg = 1
                for (var j = 0; j < tempData.length; j++) {
                    if (actualDistinctDate[i] === tempData[j].OrderDate) {
                        sum += tempData[j].Profit
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
                averageProfitSum+=avg
            }

            // days to ship area chart
            Highcharts.stockChart('chartContainer4', {
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
                    text : '<div><p style= "margin: 0px 1px;"> Average Profit <span id="color4" style = "font-size: 25px;color:rgb(237, 138, 136 );">  $' + averageProfitSum.toFixed(2) +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null'
                    },
                    align: 'left',
                    x: 0
                },
                subtitle: {
                    useHTML: true,     
                    text : '<div><p style= "margin: 1px 1px;font-size: 15px;">Avg. Profit/month <span style = "font-size: 20px;">  $' + (totalProfit/12420).toFixed(2) +'</span></p></div>',
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
                        color : (averageProfitSum/12 > totalProfit/12420) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                        width: 2,
                        value: 140
                    }]
                },
                series: [{
                    name: 'Average Shipping Time',
                    data: actualPair,
                    color : (averageProfitSum/12 > totalProfit/12420) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                    color: 'rgb(237, 138, 136 )',
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

            // ------------------------------------------------------------

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
            var estimatedSales = 0
            for (var i = 0; i < actualDistinctDate.length; i++) {
                var actualArray = []
                var count = 0
                var sum = 0
                for (var j = 0; j < tempData.length; j++) {
                    if (actualDistinctDate[i] === tempData[j].OrderDate) {
                        sum += tempData[j].SalesForecast                 // Total month wise sales 
                        count += 1
                    }
                }
                estimatedSales += sum
                actualArray.push(distinctdate[i])
                actualArray.push(sum)
                actualPair.push(actualArray)    // Array of multiDate and average
            }
            // days to ship area chart
            Highcharts.stockChart('chartContainer5', {
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
                    text : '<div><p style= "margin: 18px 1px;"> Estimated Sales <span  style = "font-size: 25px;color:rgba(26,146,146,1);">  $' + estimatedSales +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null'
                    },
                    align: 'left',
                    x: 0
                },
                scrollbar: {
                    enabled: false
                },
                yAxis: {
                    gridLineWidth: 0,
                    plotLines: [{
                        color: 'rgba(26,146,146,1)',
                        width: 2,
                        value: 386000
                    }]
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Average Shipping Time',
                    data: actualPair,
                    color: 'rgba(26,146,146,1)',
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



            // ------------------------------------------------------------

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
            var TotalOrders = 0
            for (var i = 0; i < actualDistinctDate.length; i++) {
                var actualArray = []
                var count = 0
                var sum = 0
                var avg = 1
                for (var j = 0; j < tempData.length; j++) {
                    if (actualDistinctDate[i] === tempData[j].OrderDate) {
                        count += 1
                    }
                }
                // Temperary array for creating key value pair                
                actualArray.push(distinctdate[i])
                actualArray.push(count)
                actualPair.push(actualArray)    // Array of multiDate and average
                TotalOrders += count
            }
            Highcharts.stockChart('chartContainer6', {
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
                    text : '<div><p style= "margin: 1px 1px;"> Total Orders <span id="color6" style = "font-size: 25px;color:rgba(26,146,146,1);"> ' + TotalOrders +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null'
                    },
                    align: 'left',
                    x: 0
                },
                subtitle: {
                    useHTML: true,     
                    text : '<div><p style= "margin: 1px 1px;font-size: 15px;">Target Orders <span style = "font-size: 20px;">  ' + 12000 +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null',
                    },
                    align: 'left',
                    x: 5
                },
                scrollbar: {
                    enabled: false
                },
                yAxis: {
                    gridLineWidth: 0,
                    plotLines: [{
                        color : (TotalOrders < 12000) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                        width: 2,
                        value: 772
                    }]
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Average Shipping Time',
                    data: actualPair,
                    color : (TotalOrders < 12000) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
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

            // --------------------------------------

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
                        sum += tempData[j].DaystoShipActual
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
            Highcharts.stockChart('chartContainer7', {
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
                    text : '<div><p style= "margin: 3px 1px;"> Avg. Days To Ship <span id="color7" style = "font-size: 25px;color:rgb(237, 138, 136 );"> ' +  (showAvg / showCount).toFixed(2) +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null'
                    },
                    align: 'left',
                    x: 0
                },
                subtitle: {
                    useHTML: true,     
                    text : '<div><p style= "margin: 1px 1px;font-size: 15px;">Target Days To Ship <span style = "font-size: 20px;">  ' + 3.5 +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null',
                    },
                    align: 'left',
                    x: 5
                },
                scrollbar: {
                    enabled: false
                },
                yAxis: {
                    gridLineWidth: 0,
                    plotLines: [{
                        color : (showAvg/showCount > 3.5) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                        width: 2,
                        value: 5.9
                    }]
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Average Shipping Time',
                    data: actualPair,
                    color : (showAvg/showCount > 3.5) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
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

            // -------------------------------------------------------------

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
            var TotalCorporateSales = 0
            for (var i = 0; i < actualDistinctDate.length; i++) {
                var actualArray = []
                var count = 0
                var sum = 0
                for (var j = 0; j < tempData.length; j++) {
                    if (actualDistinctDate[i] === tempData[j].OrderDate) {
                        if (tempData[j].Segment == 'Corporate') {

                            sum += tempData[j].Sales
                            count += 1
                        }

                    }
                }
                TotalCorporateSales += sum

                // Temperary array for creating key value pair                
                actualArray.push(distinctdate[i])
                actualArray.push(sum)
                actualPair.push(actualArray)    // Array of multiDate and average
            }

            // days to ship area chart
            Highcharts.stockChart('chartContainer8', {
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
                    text : '<div><p style= "margin: -4px 1px;"> Corpoorate Sales <span id="color8" style = "font-size: 25px;color:rgba(26,146,146,1);"> $' +  TotalCorporateSales +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null'
                    },
                    align: 'left',
                    x: 0
                },
                subtitle: {
                    useHTML: true,     
                    text : '<div><p style= "margin: 1px 1px;font-size: 15px;">Target Corporate Sales <span style = "font-size: 20px;">  $' + (TotalCorporateSales-10000) +'</span></p></div>',
                    style: {
                        color: 'rgb(216, 229, 230)',
                        fontWeight: 'null',
                    },
                    align: 'left',
                    x: 5
                },
               
                scrollbar: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                yAxis: {
                    gridLineWidth: 0,
                    plotLines: [{
                        color : (TotalCorporateSales >TotalCorporateSales-10000) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                        color: 'rgba(26,146,146,1)',
                        width: 2,
                        value: 74870
                    }]
                },
                series: [{
                    name: 'Average Shipping Time',
                    data: actualPair,
                    color : (TotalCorporateSales > TotalCorporateSales-10000) ? 'rgb(237, 138, 136 )' : 'rgba(26,146,146,1)' ,
                    color: 'rgba(26,146,146,1)',
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

            if(TotalSales<TargetValue){
                document.querySelector('#color1').style.color="rgb(237, 138, 136 )"
            }
            else{
                document.querySelector('#color1').style.color="rgba(26,146,146,1)"
            }

            if(TotalSales<TargetValue){
                document.querySelector('#color2').style.color="rgb(237, 138, 136 )"
            }
            else{
                document.querySelector('#color2').style.color="rgba(26,146,146,1)"
            }

            if(totalProfit<350000){
                document.querySelector('#color3').style.color="rgb(237, 138, 136 )"
            }
            else{
                document.querySelector('#color3').style.color="rgba(26,146,146,1)"
            }

            if(TotalSales<TargetValue){
                document.querySelector('#color4').style.color="rgb(237, 138, 136 )"
            }
            else{
                document.querySelector('#color4').style.color="rgba(26,146,146,1)"
            }

            if(TotalOrders<12000){
                document.querySelector('#color6').style.color="rgb(237, 138, 136 )"
            }
            else{
                document.querySelector('#color6').style.color="rgba(26,146,146,1)"
            }

            if(TotalSales<TargetValue){
                document.querySelector('#color7').style.color="rgb(237, 138, 136 )"
            }
            else{
                document.querySelector('#color7').style.color="rgba(26,146,146,1)"
            }

            if(TotalCorporateSales<(TotalCorporateSales-10000)){
                document.querySelector('#color8').style.color="rgb(237, 138, 136 )"
            }
            else{
                document.querySelector('#color8').style.color="rgba(26,146,146,1)"
            }

        });   // function cloosing (main)
