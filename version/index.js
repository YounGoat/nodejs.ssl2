'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    ;

module.exports = function() {
    const pkg = noda.currentPackage();
    console.log(`${pkg.name} - ${pkg.version}`);
};