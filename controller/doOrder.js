var request = require('request');
var msg = require('./msg')
    // console.log('doorder', msg.cookieStr)
var doOrder = function(reqs, res, next) {
    var obj = {}
    console.log('doorder', reqs.body)
    var cookieStr = 'eastmoney_txzq_zjzh=' + reqs.body.eastmoney_txzq_zjzh + '; ' + 'Yybdm=' + reqs.body.Yybdm + '; ' + 'Uid=' + reqs.body.Uid + '; ' + 'Khmc=' + reqs.body.Khmc + '; ' + 'mobileimei=' + reqs.body.mobileimei + '; ' + 'Uuid=' + reqs.body.Uuid
        // var cookieStr = msg.cookieStr
    msg.cookieStr = cookieStr
    msg.hiddenKey = reqs.body.hiddenKey
    obj.status = 1
    obj.data = msg
    res.json(obj)

    // var cookieStr = 'Yybdm=5406; Uid=OBN5nYE1d6dI%2fBAfUAKfiA%3d%3d; Khmc=%e8%a2%81%e7%a6%8f%e9%9c%9e; mobileimei=5521bff0-97a2-46b5-ab6e-9f5308a1cebd; Uuid=f5aebceab2aa42ba91ed76bd515cdc9e; eastmoney_txzq_zjzh=NTQwNjUwMjI1OTU5fA%3D%3D'
    // request.post({
    //     url: 'https://jy.xzsec.com/Trade/SubmitTrade?validatekey=' + reqs.body.hiddenKey,
    //     headers: {
    //         'Cookie': cookieStr,
    //         'X-Requested-With': 'XMLHttpRequest'
    //     },
    //     method: 'POST',
    //     json: {
    //         stockCode: reqs.body.stockCode,
    //         price: reqs.body.price,
    //         amount: reqs.body.amount,
    //         tradeType: reqs.body.tradeType,
    //         zqmc: reqs.body.zqmc,
    //     },
    //     // formData: reqs.body
    // }, function(error, response, body) {
    //     console.log(error)
    //         // if (!error && response.statusCode == 200) {
    //         // console.log(response)
    //     res.json(response)
    //         // }
    // })
}


module.exports = {
    doOrder
}