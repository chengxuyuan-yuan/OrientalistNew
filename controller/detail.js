var request = require('request');
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
    // const list = function(reqs, res, next) {
    //     console.log('list')
    //     const obj = {}
    //     const arr = []
    //     for (var i = 1; i < 4; i++) {
    //         (function(page) {
    //             request(`http://nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api/js?dtformat=HH:mm:ss&js=({data:[(x)],pc:(pc)})&rows=64&cb=jQuery17203111078215398746_1556377930215&page=${page}&type=&_=${(new Date()).getTime()}`, function(error, response, body) {
    //                 if (!error && response.statusCode == 200) {
    //                     const result = body.match(/\(([^)]*)\)/);
    //                     const datas = result[1].match(/\[([^)]*)\]/)
    //                     for (var j = 0; j < JSON.parse(datas[0]).length; j++) {
    //                         arr.push(JSON.parse(datas[0])[j])
    //                     }
    //                     obj.body = arr
    //                     if (page >= 3) {
    //                         res.json(obj)
    //                     }

//                 }
//             })
//         })(i)
//     }

// }

// const getDetail = function(reqs, res, next) {
//     const obj = {}
//     request('http://searchapi.eastmoney.com/api/suggest/get?cb=jQuery18305166030736718639_1556436707331&input=002457&type=14&token=D43BF722C8E33BDC906FB84D85E326E8&markettype=&mktnum=&jys=&classify=&securitytype=&count=5&_=1556436878328', function(error, response, body) {
//         if (!error && response.statusCode == 200) {

//         }
//     })
// }
const detailed = function(reqs, res, next) {
        console.log('4444444444', reqs.body.id)
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
module.exports = {
    // list,
    detailed
}