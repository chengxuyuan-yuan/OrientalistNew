var express = require('express');
var router = express.Router();
var url = require('url')
var listMsg = require('./../controller/msg')
    /* GET home page. */
function GetQueryString(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = url.substr(1).match(reg)
    if (r != null)
        return unescape(r[2])
    return null
}

function getParameter(url3, key) {
    var regExp = new RegExp('^.*[?&]' + key + '=([^&=?]*)&?.*$', '');
    var parameter = url3.replace(regExp, '$1');
    return parameter;
}
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    console.log('参数请求', url.parse(decodeURI(req.url), true).query.hiddenKey)
    console.log('参数请求', url.parse(decodeURI(req.url), true).query.id)
    console.log('参数请求', url.parse(decodeURI(req.url), true).query.cookies)


    // console.log('hiddenKey', getParameter(req.url, 'hiddenKey'))
    // console.log('id', getParameter(req.url, 'yyj'))
    // console.log('cookie', GetQueryString(req.url, 'cookies'))
    if (url.parse(decodeURI(req.url), true).query.id == 'dfcf') {
        listMsg.cookieStr = GetQueryString(req.url, 'cookies')
        listMsg.hiddenKey = getParameter(req.url, 'hiddenKey')
        console.log('拿到的信息', listMsg)
        res.render('login')
    }

    // res.json('hahah')

});

module.exports = router;