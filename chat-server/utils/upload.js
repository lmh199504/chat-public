
const { ossConfig } = require('../config')
const aliOss = require('ali-oss')
module.exports = async (fileName, filePath) => {
    const client = new aliOss(ossConfig);
    const result = await client.put(`/chatfiles/${fileName}`, filePath);
    return result
}