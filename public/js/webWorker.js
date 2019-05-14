// 这个js不是有点不像js   像是后台的开了一个进程，alert，console都不认


// 能运行的语法
// navagtor，location（所有属性可读）DOM，BOM都不行

// 这个self指的就是全局的worker对象
self.onmessage = function(ev) {
    ev.data.push(1)
    ev.data.push(2)

    self.postMessage(ev.data)
}