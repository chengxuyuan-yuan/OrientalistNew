const msg = {
        "khmc": "袁福霞",
        "Date": "20190506",
        "Time": "115202",
        "Syspm1": "540650225959",
        "Syspm2": "5406",
        "Syspm3": "",
        "Syspm_ex": "5",

    }
    // const userOBj = {
    //     Date:'',
    //     Syspm1:''
    // }
const cookieMsg = {
    eastmoney_txzq_zjzh: 'NTQwNjUwMjI1OTU5fA%3D%3D',
    Yybdm: '5406',
    Uid: 'OBN5nYE1d6dI%2fBAfUAKfiA%3d%3d',
    Khmc: '%e8%a2%81%e7%a6%8f%e9%9c%9e',
    mobileimei: 'cbf76bb1-3673-4b7c-9598-863cdbdfa672',
    Uuid: 'ca6f535ed8a94910957efac2bf89ffca'
}
const gupiaoMsg = {
    stockCode: '600084',
    price: '2.58',
    amount: '100',
    tradeType: 'B',
    zqmc: '*ST中葡',
}
const hiddenKey = ''
const cookieStr = ''
var AmountAll = 0
    // 每只股票买入几手
var gupiaoItem = 0
    // 每只股票最大买多少钱
var gupiaoItem1 = 0
const result = []
    // 数组去重
var filterArr = []
var huoqushijian = new Date()
    // 获取当前时间
var getTimes = huoqushijian.getFullYear() + huoqushijian.getMonth() + huoqushijian.getDate()
    //记录filterArr最后一次保存的时间
var sendTimes = ''
    // if (getTimes != sendTimes) {
    //     filterArr = []
    // }
    // 判断几个是涨停的
const nums = 0
    // 下过的单
var ordered = []
module.exports = {
    msg,
    cookieMsg,
    gupiaoMsg,
    cookieStr,
    result,
    hiddenKey,
    gupiaoItem,
    gupiaoItem1,
    AmountAll,
    filterArr,
    sendTimes,
    ordered
}