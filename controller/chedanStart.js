var request = require('request');
var fs = require('fs')
var listMsg = require('./listMsg')
var msg = require('./msg')


function ChedanList(CallBack) {
    const obj = {}
    const arr = []
    const newArr = []
    for (var i = 1; i < 4; i++) {
        (function(page) {
            request(`https://jy.xzsec.com/Trade/RevokeOrders?validatekey=${msg.hiddenKey}`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    const result = body.match(/\(([^)]*)\)/);
                    const datas = result[1].match(/\[([^)]*)\]/)
                    for (var j = 0; j < JSON.parse(datas[0]).length; j++) {
                        arr.push(JSON.parse(datas[0])[j])
                    }
                    for (var e = 0; e < arr.length; e++) {
                        if (newArr.length == 0) {
                            newArr.push(arr[0])
                        }
                        var listControl = 1
                        for (var x = 0; x < newArr.length; x++) {
                            if (arr[e].split(',')[4] == newArr[x].split(',')[4]) {
                                listControl = 0
                            }

                        }
                        if (listControl == 1) {
                            newArr.push(arr[e])
                        }
                    }
                    obj.body = newArr
                    if (page >= 3) {
                        listMsg.listMsg = obj
                        var logObj = {}
                        logObj.title = '盘口异动列表查询'
                        logObj.times = new Date().toLocaleString();
                        logObj.data = obj
                        console.log('list过去了', obj.body.length)
                        return CallBack(true, obj)
                    }

                }
            })
        })(i)
    }
}



function doChedan(reqs, cb) {
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
    ChedanList,
    doChedan
}