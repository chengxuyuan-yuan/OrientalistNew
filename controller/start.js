var request = require('request');
var fs = require('fs')
var listMsg = require('./listMsg')
var msg = require('./msg')
    // var doOrder = require('./doOrder')
    // let cb
    // let input
    // let type
    // let token
    // let markettype
    // let mktnum
    // let jys
    // let classify
    // let securitytype
    // let count
    // let _
    // 
    // 计算 下单的手数
function getPayNum(price) {
    // price 当时的买入价，下单的时候调用传参
    if (msg.AmountAll && msg.gupiaoItem || msg.AmountAll && msg.gupiaoItem1) {
        if (msg.AmountAll && msg.gupiaoItem) {
            console.log('买入', msg.gupiaoItem)
            return msg.gupiaoItem
        } else {
            console.log('金额', msg.gupiaoItem1)
            console.log('价格', price)
            console.log('算出来的数量', Math.floor(msg.gupiaoItem1 / (100 * price)))
            return Math.floor(msg.gupiaoItem1 / (100 * price))
        }
    } else {
        return 0
    }
}

function getList(CallBack) {
    const obj = {}
    const arr = []
    const newArr = []
    request(`http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&token=4f1862fc3b5e77c150a2b985b12db0fd&sty=FCOIATC&js=(%7Bdata%3A%5B(x)%5D%2CrecordsFiltered%3A(tot)%7D)&cmd=C._A&st=(ChangePercent)&sr=-1&p=1&ps=100&_=${(new Date()).getTime()}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = body.substr(7, body.length)
            var datas = result.substring(0, result.length - 23)
            console.log(5555555, JSON.parse(datas).length)
            console.log(JSON.parse(datas))
            var parseDate = JSON.parse(datas)
            for (var j = 0; j < parseDate.length; j++) {
                // arr.push(JSON.parse(datas)[j])
                var panduan = parseDate[j].split(',')
                    // console.log(99999999999, panduan[9] + ',' + panduan[11] + ',' + (panduan[12] * 1.1).toFixed(2))
<<<<<<< .mine
                if (panduan[9] <= (panduan[12] * 1.1).toFixed(2) && panduan[11] <= (panduan[12] * 1.1).toFixed(2)) {
=======
                if (panduan[9] < ((panduan[12] * 1.1).toFixed(2)) && panduan[11] < ((panduan[12] * 1.1).toFixed(2))) {
>>>>>>> .theirs
                    newArr.push(panduan)
                }
            }
            // fs.writeFile('./public/logger/lists.json', JSON.stringify(arr), function(err) {
            //         if (err) {
            //             console.log('这里啊')
            //             console.log(err);
            //         }
            //     })
            // for (var e = 0; e < arr.length; e++) {
            //     if (newArr.length == 0) {
            //         newArr.push(arr[0])
            //     }
            //     var panduan = arr[e].split(',')
            //     console.log(99999999999, panduan)
            //     if (panduan[9] < panduan[12] * 1.1.toFixed(2) && panduan[11] < panduan[12] * 1.1.toFixed(2)) {
            //         newArr.push(arr[e])
            //     }
            // }
            // for (var e = 0; e < arr.length; e++) {
            //     if (newArr.length == 0) {
            //         newArr.push(arr[0])
            //     }
            //     var panduan = arr[e].split(',')
            //     console.log(99999999999, panduan[9] + ',' + panduan[11] + ',' + (panduan[12] * 1.1).toFixed(2))
            //     if (panduan[9] < (panduan[12] * 1.1).toFixed(2) && panduan[11] < (panduan[12] * 1.1).toFixed(2)) {
            //         newArr.push(panduan)
            //     }
            // }
            obj.body = newArr
            listMsg.listMsg = obj
            obj.title = '沪深A股列表查询'
            obj.times = new Date().toLocaleString();
            obj.data = obj
            console.log('list过去了', obj.body, obj.body.length)
            return CallBack(true, obj)
        }
    })
}

function getDetail(obj, CallBack) {
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&', obj)
    var num = 0
    console.log('******************************')
    for (var q = 0; q < obj.body.length; q++) {
        (function(w) {
            var ids = '' + obj.body[w][1] + obj.body[w][0]
                // `http://nuff.eastmoney.com/EM_Finance2015TradeInterface/JS.ashx?id=0021192&token=4f1862fc3b5e77c150a2b985b12db0fd&cb=jQuery18303709778769726131_1558224251806&_=1558224254067`
            request(`http://nuff.eastmoney.com/EM_Finance2015TradeInterface/JS.ashx?id=${ids}&token=D43BF722C8E33BDC906FB84D85E326E8&cb=jQuery18305166030736718639_1556436707331&_=${(new Date()).getTime()}`, function(error, response, body) {
                const objs = {}
                if (!error && response.statusCode) {
                    let result = body.match(/\(([^)]*)\)/);
                    if (result) {
                        objs.body = JSON.parse(result[1])
                            // console.log('qqqqqqqqqqqqqqqqq', objs.body.Value.length)
                        console.log('qqqqqqqqqqqqqqqqq')
                        if (objs.body.Value[29] > 5.5 && objs.body.Value[3] == objs.body.Value[23]) {
                            // console.log('aaaaaaaaaaaaaaaaa', objs.body.Value)
                            if (objs.body.Value[45] < 3000000000) {
                                // console.log('zzzzzzzzzzzzzzzzz', objs.body.Value)
                                console.log('zzzzzzzzzzzzzzzzz', objs.body.Value)
                                if (objs.body.Value[3] * objs.body.Value[13] * 100 >= 3000000) {
                                    // console.log('wwwwwwwwwwwwwwww', objs.body.Value)
                                    console.log('wwwwwwwwwwwwwwww')
                                    var control = 1
                                    for (var i = 0; i < msg.filterArr.length + 1; i++) {
                                        if (msg.filterArr[i] && msg.filterArr[i][1] == objs.body.Value[1]) {
                                            // 条件的意思是排除的数组里面有刚好下单的股票
                                            // console.log('sssssssssssssss', objs.body.Value[1])
                                            console.log('sssssssssssssss')
                                            control = 0
                                            console.log('经过吗', control)
                                                // for(var d=0;d<objs.body.Value)
                                        }
                                    }
                                    if (control == 1) {
                                        num += 1
                                        listMsg.nums = num
                                        console.log('chakan', num)
                                        return CallBack(true, objs.body.Value)
                                    }
                                }
                            } else if (objs.body.Value[45] >= 3000000000 && objs.body.Value[45] < 6000000000) {
                                console.log('zzzzzzzzzzzzzzzzz')
                                if (objs.body.Value[3] * objs.body.Value[13] * 100 >= 8000000) {
                                    console.log('wwwwwwwwwwwwwwww')
                                    var control = 1
                                    for (var i = 0; i < msg.filterArr.length + 1; i++) {
                                        // console.log('判断条件1', msg.filterArr)
                                        // console.log('判断条件2', objs.body.Value[1])
                                        // console.log('判断', msg.filterArr[i][1] == objs.body.Value[1])
                                        if (msg.filterArr[i] && msg.filterArr[i][1] == objs.body.Value[1]) {
                                            // 条件的意思是排除的数组里面有刚好下单的股票
                                            console.log('sssssssssssssss')
                                                // console.log('1111111', objs.body.Value[1])
                                            control = 0
                                            console.log('经过吗', control)

                                        }

                                    }
                                    if (control == 1) {
                                        console.log('control，11111111', msg.filterArr, objs.body.Value[1])
                                        num += 1
                                        listMsg.nums = num
                                        console.log('chakan', num)
                                        return CallBack(true, objs.body.Value)
                                    }
                                }
                            }
                        }
                    }
                }
            })
        })(q)
    }

}

function getOrderDetail(reqs, cb) {
    // console.log('买多少手', reqs)
    var cookieStr = msg.cookieStr
        // console.log('cookieyayayay', cookieStr, 'hiddenKey', msg.hiddenKey)
    console.log('---------------------------------')
    if (msg.AmountAll > reqs[3] * 100 * getPayNum(reqs[3])) {
        console.log('价格够吗', msg.AmountAll, '看一看', reqs[3] * 100 * getPayNum(reqs[3]))
        console.log('足够', msg.AmountAll)
        console.log('需要多少', reqs[3] * 100 * getPayNum(reqs[3]))
        request.post({
            url: 'https://jy.xzsec.com/Trade/SubmitTrade?validatekey=' + msg.hiddenKey,
            headers: {
                'Cookie': cookieStr,
                'X-Requested-With': 'XMLHttpRequest'
            },
            method: 'POST',
            json: {
                stockCode: reqs[1],
                price: reqs[3],
                // amount: 100 * msg.gupiaoItem,
                amount: 100 * getPayNum(reqs[3]),
                tradeType: 'B',
                zqmc: reqs[2],
            },
            // formData: reqs.body
        }, function(error, response, body) {
            // console.log('下过的单', body)
            var bodyObjs = {}
            if (body && body.Message && body.Status) {
                bodyObjs.Message = body.Message
                bodyObjs.Status = body.Status
                    // if (body.Status == 0) {
                    // 表示下单成功了
            }
            var doOrderControl = 1
            for (var k = 0; k < msg.filterArr.length + 1; k++) {
                if (msg.filterArr[k] && msg.filterArr[k][1] == reqs[1]) {
                    // msg.filterArr[k].splice(k, 1)
                    doOrderControl = 0
                        // console.log('已经下单', doOrderControl)
                }
            }
            if (doOrderControl == 1) {
                // console.log('解决', doOrderControl)
                msg.filterArr.push(reqs)
                msg.AmountAll = msg.AmountAll - reqs[3] * 100 * getPayNum(reqs[3])
                    // var logStr = JSON.stringify(msg.filterArr)
                    // fs.writeFile('./public/logger/panduanArr.json', logStr, function(err) {
                    //         if (err) {
                    //             console.log('这里啊')
                    //             console.log(err);
                    //         }
                    //     })
                    // console.log(msg.filterArr)
            }
            bodyObjs.type = reqs[0]
            bodyObjs.Number = reqs[1]
            bodyObjs.title = reqs[2]
            bodyObjs.times = new Date().toLocaleString();
            msg.ordered.push(bodyObjs)
                // console.log('问题处在', bodyObjs)
                // body.type = reqs[0]
                // body.Number = reqs[1]
                // body.title = reqs[2]
            return cb(true, bodyObjs)
        })
    } else {
        console.log('价格不不够啊')
        var bodyObjs = {}
        bodyObjs.Message = '设置总金额剩余' + msg.AmountAll + ',已不足支付'
    }

}
module.exports = {
    getList,
    getDetail,
    getOrderDetail
}