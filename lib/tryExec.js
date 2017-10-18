'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    
    /* in-package */
    ;

function tryExec(command) {
    let ret = true;
    try {
        ret = child_process.execSync(command, { stdio: [], encoding: 'utf8' });
        if (!ret) {
            ret = true;
        }
        tryExec.error = null;
    } catch (error) {
        tryExec.error = error;
        ret = false;
    }
    return ret;
};

module.exports = tryExec;