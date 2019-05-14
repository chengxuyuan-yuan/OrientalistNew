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

function getList(CallBack) {
    const obj = {}
    const arr = []
    for (var i = 1; i < 4; i++) {
        (function(page) {
            request(`http://nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api/js?dtformat=HH:mm:ss&js=({data:[(x)],pc:(pc)})&rows=64&cb=jQuery17203111078215398746_1556377930215&page=${page}&type=&_=${(new Date()).getTime()}`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    const result = body.match(/\(([^)]*)\)/);
                    const datas = result[1].match(/\[([^)]*)\]/)
                    for (var j = 0; j < JSON.parse(datas[0]).length; j++) {
                        arr.push(JSON.parse(datas[0])[j])
                    }
                    obj.body = arr
                    if (page >= 3) {
                        listMsg.listMsg = obj
                            // console.log('..........list.........')
                            // console.log(obj)
                            // console.log('..........list.........')
                        var logObj = {}
                        logObj.title = '盘口异动列表查询'
                        logObj.times = new Date().toLocaleString();
                        logObj.data = obj
                        console.log('list过去了', obj.body.length)
                        // console.log(obj.body)
                            // var logStr = JSON.stringify(logObj)
                            // fs.writeFile('./public/logger/time1.json', logStr, function(err) {
                            //     if (err) {
                            //         console.log('这里啊')
                            //         console.log(err);
                            //     }
                            // })
                        return CallBack(true, obj)
                    }

                }
            })
        })(i)
    }
}

function getDetail(obj, CallBack) {
    var num = 0
        // console.log('******************************', obj.body[0].split(',')[4].substring(0, 6))
        // obj.body = obj.body.filter(item => !msg.filterArr.some(ele => ele[1] === item.body[0].split(',')[4].substring(0, 6)));
    for (var q = 0; q < obj.body.length; q++) {
        (function(w) {
            request(`http://nuff.eastmoney.com/EM_Finance2015TradeInterface/JS.ashx?id=${obj.body[w].split(',')[4].toString()}&token=D43BF722C8E33BDC906FB84D85E326E8&cb=jQuery18305166030736718639_1556436707331&_=${(new Date()).getTime()}`, function(error, response, body) {
                    const objs = {}
                    if (!error && response.statusCode) {
                        let result = body.match(/\(([^)]*)\)/);
                        if (result) {
                            objs.body = JSON.parse(result[1])
                                // console.log('拿到的objs', objs.body)
                                // if (objs.body.Value[9] == '-' && objs.body.Value[36] > 0.1) {
                                // if (objs.body.Value[3] == objs.body.Value[23] && objs.body.Value[3] * objs.body.Value[13] * 100 > 10000000) {
                                //     num += 1
                                //     listMsg.nums = num
                                //     console.log('chakan', num, objs)
                                //     return CallBack(true, objs.body.Value)
                                // }
                                // objs.body.Value.filters(item => {
                                //     console.log(',,,', item);
                                //     !msg.filterArr.some(ele => {
                                //         console.log(ele);
                                //         // ele == item.id
                                //     })
                                // })
                            var str35 = ''
                                for (var i = 0; i < msg.filterArr.length; i++) {
                                    if (msg.filterArr[i][1] == objs.body.Value[1]) {
                                        // console.log(1111111, objs.body.Value[1])
                                        var indexNum = msg.filterArr.indexOf(objs.body.Value[1])
                                        if (indexNum > -1) {
                                            msg.filterArr.splice(indexNum, 1)
                                        }
                                    }
                                    // console.log('filterArr',msg.filterArr)
                                }
                                console.log('万万万哇哇哇哇')
                            if (objs.body.Value[35].search("万") != -1) {
                                str35 = parseFloat(objs.body.Value[35]) * 10000
                            }
                            if (objs.body.Value[35].search("亿") != -1) {
                                str35 = parseFloat(objs.body.Value[35]) * 100000000
                            }
                            if (objs.body.Value[3] == objs.body.Value[23] && objs.body.Value[29] > 9) {
                                if (objs.body.Value[45] < 4000000000 && str35 < 200000000) {
                                    if (objs.body.Value[3] * objs.body.Value[13] * 100 > 5000000 && objs.body.Value[3] * objs.body.Value[13] * 100 < 20000000) {
                                        // 下单
                                        num += 1
                                        listMsg.nums = num
                                        console.log('chakan', num, objs)
                                        return CallBack(true, objs.body.Value)
                                    }
                                } else {
                                    if (objs.body.Value[3] * objs.body.Value[13] * 100 > 10000000 && objs.body.Value[3] * objs.body.Value[13] * 100 < 40000000) {
                                        // 下单
                                        num += 1
                                        listMsg.nums = num
                                        console.log('chakan', num, )
                                        return CallBack(true, objs.body.Value)
                                    }
                                }
                            }
                        }

                        // // 详情列表
                        // listMsg.detailMSg.push(objs.body.Value)
                        //     // console.log('数量', listMsg.detailMSg)
                        //     // console.log('展示', listMsg.detailMSg)
                        // for (var l = 0; l < listMsg.detailMSg.length; l++) {
                        //     // if (listMsg.detailMSg[l][3] == '-' && listMsg.detailMSg[l][14] * listMsg.detailMSg[l][26] * 100 < 30000000) {
                        //     if (listMsg.detailMSg[l][3] == '-') {
                        //         // nums += 1
                        //         // console.log('1111111188888888888888888', nums)
                        //         // CallBack(true, listMsg.detailMSg[l])
                        //     }
                        // }
                    }
                })
                // console.log(listMsg.listMsg.body[q].split(',')[4].toString())
        })(q)
    }

}

function getOrderDetail(reqs, cb) {
    // console.log('买多少手', reqs)
    var cookieStr = msg.cookieStr
        // console.log('cookieyayayay', cookieStr, 'hiddenKey', msg.hiddenKey)
    console.log('---------------------------------')

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
            amount: 100 * msg.gupiaoItem,
            tradeType: 'B',
            zqmc: reqs[2],
        },
        // formData: reqs.body
    }, function(error, response, body) {
        msg.filterArr.push(reqs)
            // console.log('下过的单', body)
        var bodyObjs = {}
        if (body && body.Message && body.Status) {
            bodyObjs.Message = body.Message
            bodyObjs.Status = body.Status
            // console.log('的手机电脑数据')
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
}
module.exports = {
    getList,
    getDetail,
    getOrderDetail
}