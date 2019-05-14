var request = require('request');
const history = function(reqs, res, next) {
    console.log('list')
    const obj = {}
    const arr = []
        // request(`http://nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api/js?dtformat=HH:mm:ss&js=({data:[(x)],pc:(pc)})&rows=64&cb=jQuery17203111078215398746_1556377930215&page=${page}&type=&_=${(new Date()).getTime()}`, function(error, response, body) {
    request(`http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?cmd=C.BK08151&type=ct&st=(BalFlowMain)&sr=-1&p=1&ps=50&js=var%20vFFnyTqZ={pages:(pc),data:[(x)]}&token=894050c76af8597a853f5b408b759f5d&sty=DCFFITA&rt=51914932`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log('body', body)
                // const result = body.match(/\(([^)]*)\)/);
                // const datas = result[1].match(/\[([^)]*)\]/)
                // for (var j = 0; j < JSON.parse(datas[0]).length; j++) {
                //     arr.push(JSON.parse(datas[0])[j])
                // }
                obj.body = body
                res.json(obj)
            }
        })
        // for (var i = 1; i < 2; i++) {
        //     (function(page) {
        //         // request(`http://nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api/js?dtformat=HH:mm:ss&js=({data:[(x)],pc:(pc)})&rows=64&cb=jQuery17203111078215398746_1556377930215&page=${page}&type=&_=${(new Date()).getTime()}`, function(error, response, body) {
        //         request(`http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?cmd=C.BK08151&type=ct&st=(BalFlowMain)&sr=-1&p=${page}&ps=50&js=var%20vFFnyTqZ={pages:(pc),data:[(x)]}&token=894050c76af8597a853f5b408b759f5d&sty=DCFFITA&rt=51914932`, function(error, response, body) {
        //             if (!error && response.statusCode == 200) {
        //                 console.log('body', body)
        //                 const result = body.match(/\(([^)]*)\)/);
        //                 const datas = result[1].match(/\[([^)]*)\]/)
        //                 for (var j = 0; j < JSON.parse(datas[0]).length; j++) {
        //                     arr.push(JSON.parse(datas[0])[j])
        //                 }
        //                 obj.body = arr
        //                 if (page >= 3) {
        //                     console.log(obj)
        //                     res.json(obj)
        //                 }

    //             }
    //         })
    //     })(i)
    // }

}
module.exports = {
    history
}