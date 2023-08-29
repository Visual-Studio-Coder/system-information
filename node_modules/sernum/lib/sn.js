"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
function sn(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof options === 'boolean') {
            options = { sudo: true };
        }
        options = options || {};
        const { sudo, ignoreCache, typePrefix } = options;
        const prefix = sudo ? 'sudo ' : '';
        const fn = (() => {
            switch (process.platform) {
                case 'win32':
                    return require('./providers/win');
                case 'darwin':
                    return require('./providers/darwin');
                case 'linux':
                case 'freebsd':
                    return require('./providers/linux');
            }
        })();
        if (!fn)
            throw new Error('Cannot provide serial number for ' + process.platform);
        const serial = yield fn(prefix);
        if (serial) {
            return normalize(serial, typePrefix);
        }
        if (!ignoreCache) {
            return fromCache();
        }
    });
}
exports.sn = sn;
(function (sn) {
    function sudo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sn(Object.assign({ sudo: true }, options));
        });
    }
    sn.sudo = sudo;
})(sn = exports.sn || (exports.sn = {}));
function md5(input) {
    const shasum = crypto.createHash('md5');
    shasum.update(input);
    return shasum.digest('hex');
}
function fromCache() {
    const s = fs.readFileSync(path.join(__dirname, '..', 'cache'));
    return s && s.toString().trim();
}
function normalize(serial, prefix) {
    let s = md5(serial.raw).substr(0, 12);
    prefix = (prefix == null) || prefix;
    if (serial.type && prefix) {
        s = serial.type + s;
    }
    return s.toUpperCase();
}
//# sourceMappingURL=sn.js.map