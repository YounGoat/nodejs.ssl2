'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , fs = require('fs')
    
    /* NPM */
    , if2 = require('if2')
    , noda = require('noda')
    , overload2 = require('overload2')

    /* in-package */
    , lib = noda.inRequire('lib')
    , fingerprint = require('../fingerprint')
    ;

// Boot.
noda.inRequire('scripts/boot');

// Require corresponding module for current platform.
let main = noda.osRequire(__dirname);

let _ME = overload2()
    .overload(
        'string',
        /**
         * @param {string} hash SHA-1 hash of certificate to be deleted
         */
        function(hashOrFilename) {
            let hash = fs.existsSync(hashOrFilename) ? fingerprint(hashOrFilename) : hashOrFilename;
            return main(hash);
        }
    )
    .overload(
        'object',
        /**
         * @param {Object}  args
         * @param {Array}   args._
         * @param {string}  args._[0]  shared alias of args.sha1 and args.path
         * @param {string} [args.sha1] SHA-1 hash of certificate to be deleted
         * @param {string} [args.hash] alias of args.sha1
         * @param {string} [args.path] path of certificate to be be deleted
         */
        function(args) {
            if (args.hash && args.path) {
                throw new Error('conflict parameters: hash, path');
            }
            
            if (args.path) {
                let hash = fingerprint(args.path);
                return main(hash);
            }
            else if (args.hash) {
                return main(args.hash);
            }
            else if (args._[0]) {
                return _ME(args._[0]);
            }
        }
    )
    ;

module.exports = _ME;