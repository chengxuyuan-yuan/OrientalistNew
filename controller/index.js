var list = require('./list')
var detail = require('./detail')
var doOrder = require('./doOrder')
var proxy = require('./proxy')
var userLogin = require('./userLogin')
var doOrder = require('./doOrder')
var control = require('./control')
var amount = require('./amount')
var history = require('./getHistroy')
var getLog = require('./getLog')
var yesterdayOrderList = require('./yesterdayOrderList')
var holdPositions = require('./holdPositions')
module.exports = {
    ...list,
    ...detail,
    ...doOrder,
    ...proxy,
    ...userLogin,
    ...doOrder,
    ...control,
    ...amount,
    ...history,
    ...getLog,
    ...yesterdayOrderList,
    ...holdPositions
}