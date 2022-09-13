// 特殊字符验证
exports.checkSpecificKey = (str) => {
    if (!str) return callback()
    var specialKey = "[`~!#@$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）☆★§№——|{}【】‘；：”“'。，、？]‘'"
    for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
            return false
        }
    }
    return true
}