'use strict';

var MODULE_REQUIRE
	, os = require('os')
	, colors = require('colors')
	;

var _ME = {};

var _replace_tags = function(text, delimeter, processor) {
	var output = '';
	text = text.replace('\n', os.EOL);

	var m, n, step = delimeter.length, tag;
	while ((m = text.indexOf(delimeter)) >= 0) {
		n = text.indexOf(delimeter, m + step);
		if (n > 0) {
			var left  = text.substring(0, m);
			var tag   = text.substring(m + step, n);
			var right = text.substring(n + step);

			output +=  left + processor(tag);
			text = right;
		}
		else {
			break;
		}
	}
	output += text;
	return output;
}

_ME.markup = function(text) {
	text = _replace_tags(text, '*', _ME.strong);
	text = _replace_tags(text, '_', _ME.em);
	text = _replace_tags(text, '`', _ME.code);
	text = _replace_tags(text, '#', colors.dim);
	return text;
};

_ME.error = function(text, nomark) {
	text = nomark ? text : _ME.markup(text);
	console.log(colors.red('[x] ' + text));
};

_ME.warn = function(text, nomark) {
	text = nomark ? text : _ME.markup(text);
	console.log(colors.yellow('[!] ' + text));
}

_ME.info = function(text, nomark) {
	text = nomark ? text : _ME.markup(text);
	console.log('[.] ' + text);
};

_ME.log = function(text) {
	console.log(_ME.markup(text));
};

_ME.strong = colors.bold;
_ME.em = colors.italic.cyan;
_ME.code = colors.green;

module.exports = _ME;
