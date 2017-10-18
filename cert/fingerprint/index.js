'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    , if2 = require('if2')
    , noda = require('noda')
    , overload2 = require('overload2')

    /* in-package */
    , logger = noda.inRequire('lib/logger')
    , tryExec = noda.inRequire('lib/tryExec')
    ;

/**
 * @param {string}  certPath path of certificate to be imported
 * @param {string} [digest] algorithm used to create digest
 */
function main(certPath, digest) {
    // Available digests.
    const digests = [ 'md5', 'sha1', 'mdc2' ];

    if (digest === null) {
        digest = 'sha1';
    }
    else if (!digests.includes(digest)) {
        throw new Error(`digest not supported: ${digest}`);
    }

    let command = `openssl x509 -in "${certPath}" -noout -fingerprint -${digest}`;
    let ret = tryExec(command);
    if (!ret) {
        throw new Error(`failed to execute command: ${command}`);
    }
    
    let matched = /Fingerprint=(.+)$/m.test(ret);
    let fingerprint = RegExp.$1;
    if (!matched) {
        throw new Error(`unrecogonized fingerprint: ${ret}`);
    }

    fingerprint = fingerprint.replace(/:/g, '');
    return fingerprint;
}

module.exports = overload2()
    .overload(
        'string',
        /**
         * @param {string} certPath path of certificate to be imported
         */
        function(certPath) {
            return main(certPath, null);
        }
    )
    .overload(
        'object',
        /**
         * @param {Object} args
         * @param {Array}  args._
         * @param {string} args._[0] alias of args.path
         * @param {string} args.path path of certificate to retrieve fingerprint
         */
        function(args) {
            // ---------------------------
            // arguments reading

            // location of the certificate to be imported
            let certPath = if2(args.path, args._[0]);
            if (!certPath) {
                logger.error('certicate missed');
                return;
            }

            // ---------------------------
            // run command
            return main(certPath, null);
        }
    )
    ;