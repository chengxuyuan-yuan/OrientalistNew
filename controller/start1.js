var request = require('request');
var listMsg = require('./listMsg')
var msg = require('./msg')
var doOrder = require('./doOrder')
let cb
let input
let type
let token
let markettype
let mktnum
let jys
let classify
let securitytype
let count
let _
    // 
function getList(cb) {

}
const list = function(reqs, res, next) {
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
                        for (var q = 0; q < obj.body.length; q++) {
                            (function(w) {
                                request(`http://nuff.eastmoney.com/EM_Finance2015TradeInterface/JS.ashx?id=${obj.body[w].split(',')[4].toString()}&token=D43BF722C8E33BDC906FB84D85E326E8&cb=jQuery18305166030736718639_1556436707331&_=${(new Date()).getTime()}`, function(error, response, body) {
                                        const objs = {}
                                        if (!error && response.statusCode) {
                                            let result = body.match(/\(([^)]*)\)/);
                                            if (result) {
                                                objs.body = JSON.parse(result[1])
                                            }
                                            // res.json(obj)
                                            listMsg.detailMSg.push(objs.body.Value)
                                            console.log(listMsg.detailMSg)
                                            for (var l = 0; l < listMsg.detailMSg.length; l++) {
                                                if (listMsg.detailMSg[l][3] == '-') {
                                                    doOrders(listMsg.detailMSg[l], res)
                                                }
                                            }
                                        }
                                    })
                                    // console.log(listMsg.listMsg.body[q].split(',')[4].toString())
                            })(q)
                        }
                    }

                }
            })
        })(i)
    }
}

// const getDetail = function(reqs, res, next) {
//     const obj = {}
//     request('http://searchapi.eastmoney.com/api/suggest/get?cb=jQuery18305166030736718639_1556436707331&input=002457&type=14&token=D43BF722C8E33BDC906FB84D85E326E8&markettype=&mktnum=&jys=&classify=&securitytype=&count=5&_=1556436878328', function(error, response, body) {
//         if (!error && response.statusCode == 200) {

//         }
//     })
// }
const detailed = function(reqs, res, next) {
        request(`http://nuff.eastmoney.com/EM_Finance2015TradeInterface/JS.ashx?id=${reqs.body.id}&token=D43BF722C8E33BDC906FB84D85E326E8&cb=jQuery18305166030736718639_1556436707331&_=${(new Date()).getTime()}`, function(error, response, body) {
            const obj = {}
            if (!error && response.statusCode) {
                let result = body.match(/\(([^)]*)\)/);
                if (result) {
                    obj.body = JSON.parse(result[1])
                }
                res.json(obj)
            }
        })
    }
    // const login = function(reqs,res,next){

// }

// 下单接口
function xiadan() {
    doOrder.doOrder()
}

function doOrders(reqs, res) {
    console.log('下单下单', reqs)
        // var cookieStr = 'eastmoney_txzq_zjzh=' + reqs.body.eastmoney_txzq_zjzh + '; ' + 'Yybdm=' + reqs.body.Yybdm + '; ' + 'Uid=' + reqs.body.Uid + '; ' + 'Khmc=' + reqs.body.Khmc + '; ' + 'mobileimei=' + reqs.body.mobileimei + '; ' + 'Uuid=' + reqs.body.Uuid
    var cookieStr = msg.cookieStr
    console.log('cookieyayayay')
    console.log(cookieStr)
    console.log('cookieyayayay')
    request.post({
        url: 'https://jy.xzsec.com/Trade/SubmitTrade?validatekey=4acb617f-a1cb-49cb-bce4-1eac6581378a',
        headers: {
            'Cookie': 'Yybdm=5406; Khmc=%e8%a2%81%e7%a6%8f%e9%9c%9e; eastmoney_txzq_zjzh=NTQwNjUwMjI1OTU5fA%3D%3D; Uid=OBN5nYE1d6dI%2fBAfUAKfiA%3d%3d; mobileimei=ec569728-ef16-42a1-82ce-94e2e871719a; Uuid=242fe5b217d04d9a93d9676ff93d745a',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        json: {
            stockCode: reqs[1],
            price: reqs[3],
            amount: 100,
            tradeType: 'B',
            zqmc: reqs[2],
        },
        // formData: reqs.body
    }, function(error, response, body) {
        msg.result.push(response)
        console.log('正在下单', body)

        // if (body.Status == 1) {
        //     console.log('下单成功', msg.result)
        // } else {
        //     console.log('下单失败')
        // }
    })
}
module.exports = {
    list,
    detailed
}