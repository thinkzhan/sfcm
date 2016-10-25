var fs = require('fs');
var path = require('path');
var _ = require('underscore')
var console = require('sfconsole')("FILE");

module.exports = function () {

	return function* (next) {
		var res = this;
		var filePath = decodeURI(res.path);
		var realPath = getRealPath(filePath);

		if (!fs.existsSync(getRealPath(filePath))) {
			console.err('[File not exists]:' + realPath);
			res.status = 404;
			return;
		}
		if (!isDir(filePath)) {
			console.log('[Response File]:' + realPath);
			yield next;
			return;
		}

		var filelist = walk(filePath)
		res.body = toHtml(filePath, filelist);
		console.log('[Response Directory]:' + realPath);
		return;
	};
};

function toHtml(filePath, list) {
	var tpl = fs.readFileSync(path.resolve(__dirname, './list.tpl'), 'utf8');
	return _.template(tpl)({
		indexName: filePath,
		fileList: list
	});
}

function isDir(filePath) {
	var realPath = getRealPath(filePath);
	return fs.existsSync(realPath) && fs.statSync(realPath).isDirectory();
}

function getRealPath(filePath) {
	return path.join(process.cwd(), filePath);
}

function walk(dirPath) {
	var result = [];

	var files = fs.readdirSync(getRealPath(dirPath));
	_.each(files, function (name) {
		var filePath = path.join(dirPath, name);
		if (isDir(filePath)) {
			result.push({
				name: name,
				children: walk(filePath),
				path: filePath
			});
		} else {
			result.push({
				name: name,
				path: filePath
			});
		}
	});

	return result;
}