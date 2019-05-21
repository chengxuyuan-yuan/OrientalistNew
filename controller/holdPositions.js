var request = require('request');
var fs = require('fs')
var msg = require('./msg')
    // 我的持仓
var holdPositions = function(reqs, res, next) {
    var cookieStr = msg.cookieStr
    var obj = {}
    request.post({
        url: 'https://jy.xzsec.com/Search/GetStockList?validatekey=' + msg.hiddenKey,
        headers: {
            'Cookie': cookieStr,
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        json: {
            qqhs: 'RMB',
            dwc: ''
        },
        // formData: reqs.body
    }, function(error, response, body) {
        console.log(error)
        console.log('我的持仓', body)
        if (body && body.Status == 0) {
            console.log(666666, body)
            if (body.Data && body.Data.length != 0) {
                for (var i = 0; i < body.Data.length; i++) {
                    var arr = []
                    arr.push('1')
                    arr.push(body.Data[i].Zqdm)
                    arr.push(body.Data[i].Zqmc)
                    msg.filterArr.push(arr)
                }
            }
            // fs.writeFile('./public/logger/history.json', JSON.stringify(msg.filterArr), function(err) {
            //     if (err) {
            //         console.log('这里啊')
            //         console.log(err);
            //     }
            // })
        }
        obj.status = 1
        obj.data = body
        res.json(obj)
    })
}
module.exports = {
    holdPositions
}