var request = require('request');
var fs = require('fs')
var msg = require('./msg')
    //服务器开始之前已经涨停的
var alerdayLImitupList = function(reqs, res, next){
    request(`http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&token=4f1862fc3b5e77c150a2b985b12db0fd&sty=FCOIATC&js=(%7Bdata%3A%5B(x)%5D%2CrecordsFiltered%3A(tot)%7D)&cmd=C._A&st=(ChangePercent)&sr=-1&p=1&ps=100&_=${(new Date()).getTime()}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (body) {
                var bodyArr = body.substr(7, body.length)
                bodyArr = bodyArr.substring(0, bodyArr.length - 23)
                    console.log(99999, bodyArr)
                var arr = JSON.parse(bodyArr)
                for (var w = 0; w < arr.length; w++) {
                    var json = []
                    var jsonArr = arr[w].split(",")
                    json.push('2')
                    json.push(jsonArr[1])
                    json.push(jsonArr[2])
                    if (jsonArr[9] >= (jsonArr[12] * 1.1).toFixed(2) && jsonArr[11] >= (jsonArr[12] * 1.1).toFixed(2)) {
                    msg.filterArr.push(json)
                    }
                }
            }
            // obj.body = bodyArr
            res.json(msg.filterArr)
        }
           
    })
}
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
                    arr.push('3')
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
    getYesterdayBuyList,
    alerdayLImitupList
}