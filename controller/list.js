var request = require('request');
const list = function(reqs, res, next) {
    console.log('list')
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
                        console.log(obj)
                        res.json(obj)
                    }

                }
            })
        })(i)
    }

}
module.exports = {
    list
}