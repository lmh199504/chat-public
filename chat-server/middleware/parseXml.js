const bluebird = require('bluebird')
const { parseXML } = require('../utils')
module.exports = async (ctx, next) => {
    const regexp = /^(\/\?)\w*/
	const url = ctx.req.url
	if (url == '/' || regexp.test(url)) {
		const xml = await bluebird.fromCallback(cb => {
		    let data = '';
		    ctx.req.setEncoding('utf8');
		    ctx.req.on('data', function (chunk) {
		        data += chunk;
		    });
		    ctx.req.on('end', function () {
		        cb(null, data);
		    });
		});
		if (xml) {
		    const data = await parseXML(xml)
		    ctx.body = data
		}
		await next()
	} else {
		await next()
	}
}