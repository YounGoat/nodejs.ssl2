'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , fs = require('fs')    
    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    ;

module.exports = noda.requireDir(__dirname);