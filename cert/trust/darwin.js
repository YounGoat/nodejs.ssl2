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
    // What is the difference between '-r trustAsRoot' and '-r trustRoot'?
    // trustRoot means to trust the root certificate authority of the specified certificate.
    // trustAsRoot means to trust the certificate itself as a root certificate authority.

    let ret = tryExec(`sudo security add-trusted-cert -d -r trustAsRoot -k "${confDarwin.keychain.system}" "${certPath}"`);
    if (!ret) {
        throw new Error(`failed to trust cert: ${certPath}`);
    }

    return 'certificate trusted successfully';
}

module.exports = main;