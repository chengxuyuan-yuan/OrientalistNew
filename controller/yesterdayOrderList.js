var request = require('request');
var fs = require('fs')
var msg = require('./msg')
    //昨天下过的单
var getYesterdayBuyList = function(reqs, res, next) {
    var cookieStr = msg.cookieStr
    var obj = {}
    request.post({
        url: 'https://jy.xzsec.com/Com/GetAssetsEx?validatekey=' + msg.hiddenKey,
        headers: {
            'Cookie': cookieStr,
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        json: {
            moneyType: 'RMB'
        },
        // formData: reqs.body
    }, function(error, response, body) {
        console.log(error)
        console.log('昨天下过的单', body)
        if (body && body.Status == 0) {
            if (body.Data[0] && body.Data[0].F303S.length != 0) {
                for (var i = 0; i < body.Data[0].F303S.length; i++) {
                    var arr = []
                    arr.push('1')
                    arr.push(body.Data[0].F303S[i].Zqdm)
                    arr.push(body.Data[0].F303S[i].Zqmc)
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
    getYesterdayBuyList
}