'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , confDarwin = noda.inRequire('conf/darwin')
    , tryExec = noda.inRequire('lib/tryExec')
    ;

/**
 * @param {string} certPath path of certificate to be imported
 */
function main(certPath) {
    let ret = tryExec(`certutil -verify "${certPath}"`);
    if (!ret) {
        throw new Error(`unable to verify cert: ${certPath}`);
    }
    if (~ret.indexOf('0x800b0109')) {
        throw new Error(`cert not trusted: ${certPath}`);
    }
    return 'certificate verification successful';
}

module.exports = main;