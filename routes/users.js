var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');

var cheerio = require('cheerio');

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: '简单nodejs爬虫' });
// });
router.get('/', function(req, res, next) { // 浏览器端发来get请求
    var page = 1 //获取get请求中的参数 page
    console.log("page: " + page);
    var Res = res; //保存，防止下边的修改
    //url 获取信息的页面部分地址
    var url = 'https://jy.xzsec.com/Trade/Buy';
    // console.log('..................' + url + page + '..............')
    https.get(url + page, function(res) { //通过get方法获取对应地址中的页面信息
        var chunks = [];
        var size = 0;
        res.on('data', function(chunk) { //监听事件 传输
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end', function() { //数据传输完
            var data = Buffer.concat(chunks, size);
            var html = data.toString();
            var $ = cheerio.load(html); //cheerio模块开始处理 DOM处理
            var jobs = $("#imgValidCode");
            console.log('*********************')

            console.log(jobs)
            Res.json({ //返回json格式数据给浏览器端
                jobs: html
            });
        });
    });

});

module.exports = router;