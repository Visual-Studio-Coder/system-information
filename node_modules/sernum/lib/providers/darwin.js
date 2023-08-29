"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const utils_1 = require("../utils");
const CMD = "system_profiler SPHardwareDataType | sed -n 's/.*Serial Number (system).*: /OSX/p'";
module.exports = function sn(prefix) {
    return __awaiter(this, void 0, void 0, function* () {
        prefix = prefix || '';
        const result = yield utils_1.exec(prefix + CMD);
        if (!result) {
            throw new Error('Can not retrieve serial number for ' + process.platform + '@' + process.arch);
        }
        return {
            type: 'OSX',
            raw: result.toString().trim()
        };
    });
};
//# sourceMappingURL=darwin.js.map