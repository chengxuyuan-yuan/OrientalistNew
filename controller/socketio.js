var socket_io  = require('socket.io'); 
var socketio = {}; 

var starts = require('./start')
var listMsg = require('./listMsg')
var msg = require('./msg')
    // 获取io
socketio.getSocketio = function(server) { // http(s) server
    var io = socket_io.listen(server);
    var obj = {}
    io.sockets.on('connection', function(socket) {
        console.log('连接成功');   
        socket.on('orders', function() {
            socket.emit('orders', { datas: msg.ordered });
        })
        socket.on('getls', function() { // 处理来自客户端的’event01’事件          
            console.log('监听点击事件');  
            setInterval(function() {
                console.log('run')
                starts.getList(function() {
                    const arr = []
                    if (msg.AmountAll && msg.gupiaoItem || msg.AmountAll && msg.gupiaoItem1) {
                        if (arguments[0] == true) {
                            return starts.getDetail(arguments[1], function() {
                                if (arguments[0] == true) {
                                    return starts.getOrderDetail(arguments[1], function() {
                                        //     // 返回给前端
                                        if (arguments[1]) {
                                            if (arguments[1].Status != 0) {
                                                arguments[1].success = false
                                            } else {
                                                arguments[1].success = true
                                            }
                                            arr.push(arguments[1])
                                            if (listMsg.nums == arr.length) {
                                                obj.status = 1
                                                obj.data = arr
                                                    // for (var i = 0; i < arr.length; i++) {
                                                    //     if (arr[i].Status == 0) {
                                                    //         msg.filterArr.push(arr[i].Number)
                                                    //     }
                                                    // }
                                                    // res.json(obj)
                                                    // console.log(obj)
                                                socket.emit('getls', { datas: obj });
                                            }
                                        } else {
                                            obj.status = -2
                                            obj.data = '查询详情出错，此过程还未下单'
                                                // res.json(obj)
                                                // socket.emit('getls', { datas: obj });
                                            socket.emit('getls', { datas: obj });

                                        }
                                    })
                                }
                            })
                        }
                    } else {
                        obj.status = -3
                        obj.data = '请在页面左侧设置总金额和每只股票最大买入数或每只股票最大总金额'
                            // res.json(obj)
                            // socket.emit('getls', { datas: obj });
                            // 
                        socket.emit('getls', { datas: obj });

                    }

                })
            }, 1000)

            // 给该客户端发送event02事件
        })
    })
};





module.exports = socketio;