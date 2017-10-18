'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , fs = require('fs')
    , path = require('path')
    
    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , logger = noda.inRequire('lib/logger')
    ;

module.exports = function() {
    let pathname = path.join(__dirname, 'help.txt');
    let helpText = fs.readFileSync(pathname, 'utf8');
    logger.log(helpText);
};