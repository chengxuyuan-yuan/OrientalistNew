var request = require('request');
var msg = require('./msg')
var userLogin = function(reqs, res, next) {
    console.log(reqs.body)
    var obj = {}
    var cookieStr = 'eastmoney_txzq_zjzh=' + reqs.body.eastmoney_txzq_zjzh + '; ' + 'Yybdm=' + reqs.body.Yybdm + '; ' + 'Uid=' + reqs.body.Uid + '; ' + 'Khmc=' + reqs.body.Khmc + '; ' + 'mobileimei=' + reqs.body.mobileimei + '; ' + 'Uuid=' + reqs.body.Uuid
    request.post({
        url: 'https://jy.xzsec.com/Login/Authentication?validatekey=',
        method: 'POST',
        headers: {
            'Cookie': cookieStr,
            'X-Requested-With': 'XMLHttpRequest'
        },
        json: {
            userId: reqs.body.userId,
            password: reqs.body.password,
            randNumber: reqs.body.randNumber,
            identifyCode: reqs.body.identifyCode,
            duration: '1800',
            authCode: '',
            type: 'Z'
        },
        // formData: reqs.body
    }, function(error, response, body) {
        console.log(error)
            // if (!error && response.statusCode == 200) {
            // console.log(response)
        if (response.body.Data) {
            obj.status = 1
            obj.data = body.Data
            res.json(obj)
        } else {
            obj.status = -1
            obj.data = response.body
            res.json(obj)

        }

        // }
    })
}
module.exports = {
    userLogin
}