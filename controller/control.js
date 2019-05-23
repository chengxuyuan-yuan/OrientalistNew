var starts = require('./start')
var listMsg = require('./listMsg')
var msg = require('./msg')

var start = function(reqs, res, next) {
    var obj = {}
    starts.getList(function() {
            const arr = []
            console.log('getList', arguments[0])
            if (msg.AmountAll && msg.gupiaoItem) {
                if (arguments[0] == true) {
                    return starts.getDetail(arguments[1], function() {
                        // console.log('getDetail', arguments[1])                  
                        if (arguments[0] == true) {
                            return starts.getOrderDetail(arguments[1], function() {
                                // console.log('getOrderDetail', arguments[1])
                                //     // 返回给前端
                                if (arguments[1]) {
                                    if (arguments[1].Status != 0) {
                                        arguments[1].success = false
                                    } else {
                                        arguments[1].success = true
                                    }
                                    arr.push(arguments[1])
                                        // console.log('arr', arr)
                                        // console.log('arrlength', arr.length)
                                        // console.log('listMsg', listMsg.nums)
                                    if (listMsg.nums == arr.length) {
                                        obj.status = 1
                                        obj.data = arr
                                        res.json(msg)
                                    }
                                } else {
                                    obj.status = -2
                                    obj.data = '查询详情出错，此过程还未下单'
                                    res.json(obj)
                                }
                            })
                        }
                    })
                }
            } else {
                obj.status = -3
                obj.data = '请在页面左侧设置总金额和每只股票最大买入数'
                res.json(obj)
            }

        })
        // starts.list()
        // obj.list = listMsg.listMsg
        // obj.detail = listMsg.detailMSg
        // res.json(obj)
}
var stop = function(reqs, res, next) {
        times(2)
    }
    // type为1  表示start  type为2表示stop
function times(type) {
    var timess
    if (type == 1) {
        console.log('启动定时器')
        timess = setInterval(function() {

        }, 1000)

    } else {
        if (timess) {
            console.log('关闭定时器')
            clearInterval(times)
        } else {
            console.log('没启动定时器')
        }
    }
    // var timess = setInterval(function() {

    // }, 1000)
}

module.exports = {
    start,
    stop
}