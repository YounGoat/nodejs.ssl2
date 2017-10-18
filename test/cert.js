'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')
    , path = require('path')
    
    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , cert = noda.inRequire('cert')
    ;

describe('certificate management', function() {
    this.timeout(10000);

    let rets = {};

    // Save the state(result) of each test.
    afterEach(function() {
        let t = this.currentTest;

        // t.state := enum('passed', 'failed')
        // t.state equals 'failed' if timeout.
        rets[t.title] = t.state;
    });

    // Check the state of pre tests depended by current test.
    beforeEach(function() {
        let t = this.currentTest;
        if (t.depends) {
            let failed = t.depends.filter(name => rets[name] === 'failed');
            if (failed.length) {
                throw new Error(`pre steps failed: ${failed.join(',')}`);
            }
        }
    });

    let capath = path.join(__dirname, 'resource', 'ca.crt');

    it('fingerprint', () => {
        let fp = cert.fingerprint(capath);
        assert(/[0-9A-F]{40}/.test(fp));
    });

    it('import', () => {
        cert.import(capath);
    });

    it('trust', () => {
        cert.trust(capath);
    });
  
    it('verify', () => {
        cert.verify(path.join(__dirname, 'resource', 'server.crt'));
    });
  
    it('distrust', () => {
        cert.distrust(capath);
    });

    it('delete', () => {
        cert.delete(capath);
    });
});
