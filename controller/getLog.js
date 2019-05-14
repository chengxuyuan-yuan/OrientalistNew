var fs = require('fs')
var readLine = require('lei-stream').readLine;

var getLogList = function(req, res, next) {
    fs.readFile('../log/', 'utf8', function(err, data) {
        console.log(data);
        var fileList = getFiles.getFileList("./log/");
        res.json(fileList)
    });
}
var getLog = function(req, res, next) {
    console.log(1111, req.body.fileName, req.body.type)
    var obj = {}
    console.log(333333, __dirname)
    var html = []
    if (req.body.type == 1) {
        var s = readLine(fs.createReadStream('./log/' + req.body.fileName), {
            // 换行符，默认\n
            newline: '\n',
            // 是否自动读取下一行，默认false
            autoNext: false,
            // 编码器，可以为函数或字符串（内置编码器：json，base64），默认null
            encoding: function(data) {
                // return JSON.parse(data);
                console.log('datas', data)
                    // html += data
                html.push(data)
                return html
            }
        });

        // 读取到一行数据时触发data事件
        s.on('data', function(data) {
            console.log(data);
            s.next();
        });

        // 流结束时触发end事件
        s.on('end', function() {
            console.log('end');
            res.json(html)
        })
    } else if (req.body.type == 2) {
        var readStream = fs.createReadStream('./log/' + req.body.fileName); //得到文件输入流
        readStream.on('data', (chunk) => {
            res.write(chunk, 'binary'); //文档内容以二进制的格式写到response的输出流
        });
        readStream.on('end', () => {
            res.end();
        })

    }

    // fs.readFile('../log/' + req.body.fileName, 'utf8', function(err, data) {
    //     console.log(2222, '../log' + req.body.fileName);
    //     console.log(err)
    //     if (err) {
    //         obj.status = -1
    //         obj.data = err
    //     } else {
    //         obj.status = 1
    //         obj.data = data
    //     }
    //     res.json(obj)

    // });
}

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function(itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {}; //定义一个对象存放文件的路径和名字
            obj.path = path; //路径
            obj.filename = itm //名字
            filesList.push(obj);
        }

    })

}

var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function(path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    }
};
module.exports = {
    getLog,
    getLogList
}