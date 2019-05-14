var msg = require('./msg')
var amount = function(reqs, res, next) {
    var obj = {}
    console.log(reqs.body)
    if (!reqs.body.AmountAll || !reqs.body.gupiaoItem) {
        if (!reqs.body.AmountAll) {
            obj.status = -1
            obj.data = '总金额不能为空'
            res.json(obj)
        }
        if (!reqs.body.gupiaoItem) {
            obj.status = -1
            obj.data = '每只股票持有数量不能为空'
            res.json(obj)
        }
    } else {
        msg.AmountAll = reqs.body.AmountAll
        msg.gupiaoItem = reqs.body.gupiaoItem
        obj.status = 1
        obj.data = '设置成功，最大金额' + msg.AmountAll + '元' + '每只股票持有' + msg.gupiaoItem + '手'
        res.json(obj)
    }
}
seachAmount = function(req, res, next) {
    var obj = {}
    obj.AmountAll = msg.AmountAll
    obj.gupiaoItem = msg.gupiaoItem
    res.json(obj)
}
module.exports = {
    amount,
    seachAmount
}