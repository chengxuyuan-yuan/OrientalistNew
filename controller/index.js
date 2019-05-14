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
    ...getLog
}