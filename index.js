'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , lib = noda.inRequire('lib')
    , ignores = noda.inRequire('ignores')
    ;

module.exports = noda.requireDir(__dirname, ignores);