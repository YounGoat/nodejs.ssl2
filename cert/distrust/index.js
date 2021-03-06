'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , if2 = require('if2')
    , noda = require('noda')
    , overload2 = require('overload2')

    /* in-package */
    , lib = noda.inRequire('lib')
    ;

// Boot.
noda.inRequire('scripts/boot');

// Require corresponding module for current platform.
let main = noda.osRequire(__dirname);

module.exports = overload2()
    .overload(
        'string',
        /**
         * @param {string} certPath path of certificate to be distrusted
         */
        function(certPath) {
            return main(certPath);
        }
    )
    .overload(
        'object',
        /**
         * @param {Object} args
         * @param {Array}  args._
         * @param {string} args._[0] alias of args.path
         * @param {string} args.path path of certificate to be distrusted
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
            return main(certPath);
        }
    )
    ;