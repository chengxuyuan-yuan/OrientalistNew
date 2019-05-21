var msg = require('./msg')
var amount = function(reqs, res, next) {
    var obj = {}
    console.log(reqs.body)
    if (reqs.body.type == 1) {
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
            msg.gupiaoItem1 = 0
            obj.status = 1
            console.log('好看的三个', msg.AmountAll, msg.gupiaoItem, msg.gupiaoItem1)
            obj.data = '设置成功，最大金额' + msg.AmountAll + '元' + '每只股票持有' + msg.gupiaoItem + '手'
            res.json(obj)
        }
    } else if (reqs.body.type == 2) {
        if (!reqs.body.AmountAll || !reqs.body.gupiaoItem1) {
            if (!reqs.body.AmountAll) {
                obj.status = -1
                obj.data = '总金额不能为空'
                res.json(obj)
            }
            if (!reqs.body.gupiaoItem1) {
                obj.status = -1
                obj.data = '每只股票设置最大买入金额不能为空'
                res.json(obj)
            }
        } else {
            msg.AmountAll = reqs.body.AmountAll
            msg.gupiaoItem1 = reqs.body.gupiaoItem1
            msg.gupiaoItem = 0
            obj.status = 1
            obj.data = '设置成功，最大金额' + msg.AmountAll + '元' + '每只股票做大买入金额' + msg.gupiaoItem1 + '元'
            console.log('好看的三个', msg.AmountAll, msg.gupiaoItem, msg.gupiaoItem1)
            res.json(obj)
        }
    } else {
        res.json({
            status: -1,
            data: '请传入正确的type'
        })

    }

}
var seachAmount = function(req, res, next) {
    var obj = {}
    obj.AmountAll = msg.AmountAll
    obj.gupiaoItem = msg.gupiaoItem
    obj.gupiaoItem1 = msg.gupiaoItem1
    res.json(obj)
}

module.exports = {
    amount,
    seachAmount
}