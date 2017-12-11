#	ssl2
__SSL Toolsets__

__ssl2__ includes a collection of toolsets which will make it easier to manager certificates.

##	Table of contents

*	[Get Started](#get-started)
*	[API](#api)
* 	[Examples](#examples)
*	[Why ssl2](#why-ssl2)
*	[Honorable Dependents](#honorable-dependents)
*	[About](#about)
*	[References](#references)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/nodejs.ssl2)

##	Get Started

__ssl2__ offers both CLI (command line interface) and API (application programming interface).

```bash
# Install the package globally and command "ssl" will be available.
npm install -g ssl2

# Run for manual.
ssl2 help
```

It also offers API to be used in Node.js programs.

```javascript
const ssl2cert = require('ssl2/cert');
ssl2cert.fingerprint('/path/to/certificate');
```

##	API

According to my design, __ssl2__ will be made up with several related but different toolsets. However, only *cert* is available now.

```javascript
const ssl2cert = require('ssl2/cert');  // Recommended requirement.
const ssl2cert = requrie('ssl2').cert;  // It works but is not recommended.
```

### ssl2cert.delete

To delete a certificate from system store (or KeyChain in Mac OS).

*   __ssl2cert.delete__(*string* __path__)  
    __path__ is the pathname of the certificate to be deleted from system store.
*    __ssl2cert.delete__(*string* __hash__)  
    __hash__ is SHA-1 hash of the certificate to be deleted from system store.
*    __ssl2cert.delete__(*object* __options__)  
    __options__ SHOULD has one of properties `path`, `hash` or `sha1`. Property `sha1` is alias of property `hash`.

### ssl2cert.distrust

To distrust a certificate.

*   __ssl2cert.distrust__(*string* __path__)  
    __path__ is the pathname of the certificate to be distrusted by system.
*   __ssl2cert.distrust__(*object* __options__)  
    __options__ SHOULD has `path` property.

### ssl2cert.fingerprint

Acquire the fingerprint of a certificate.

*   __ssl2cert.fingerprint__(*string* __path__)  
    __path__ is the pathname of the certificate.
*   __ssl2cert.fingerprint__(*object* __options__)  
    __options__ SHOULD has `path` property.

### ssl2cert.import

Import a certificate into system store.

*   __ssl2cert.import__(*string* __path__)  
    __path__ is the pathname of the certificate.
*   __ssl2cert.import__(*object* __options__)  
    __options__ SHOULD has `path` property.

### ssl2cert.trust

To trust a certificate.

*   __ssl2cert.trust__(*string* __path__)  
    __path__ is the pathname of the certificate.
*   __ssl2cert.trust__(*object* __options__)  
    __options__ SHOULD has `path` property.

### ssl2cert.verify

To verify a certificate.

*   __ssl2cert.verify__(*string* __path__)  
    __path__ is the pathname of the certificate.
*   __ssl2cert.verify__(*object* __options__)  
    __options__ SHOULD has `path` property.

##  Examples

##  Why *ssl2*

##  Honorable Dependents

##  About

##  References

*   OpenSSL, [Binaries](https://wiki.openssl.org/index.php/Binaries)
*   Microsoft, [Manage Trusted Root Certificates](https://technet.microsoft.com/en-us/library/cc754841(v=ws.11).aspx)
*   Microsoft, [Certmgr.exe (Certificate Manager Tool)](https://docs.microsoft.com/en-us/dotnet/framework/tools/certmgr-exe-certificate-manager-tool)
*   [What are JavaScript options objects?](http://www.codereadability.com/what-are-javascript-options-objects/)