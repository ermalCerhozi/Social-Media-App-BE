"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.LoggedUser = void 0;
var common_1 = require("@nestjs/common");
var environment_1 = require("../environment/environment");
var jwt = require("jsonwebtoken");
var LoggedUser = /** @class */ (function () {
    function LoggedUser() {
    }
    LoggedUser.setUser = function (user) {
        var id = user.id, firstName = user.firstName, lastName = user.lastName, email = user.email, role = user.role;
        var payload = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
        };
        var token = jwt.sign(payload, environment_1.environment.jwt.secret, {
            algorithm: environment_1.environment.jwt.algorithm,
            expiresIn: LoggedUser.EXPIRATION_TIME
        });
        return __assign(__assign({}, payload), { token: token });
    };
    LoggedUser.getUser = function (token) {
        var user;
        try {
            user = jwt.verify(token, environment_1.environment.jwt.secret);
        }
        catch (ex) {
            throw ex;
        }
        return __assign(__assign({}, user), { token: token });
    };
    LoggedUser.verifyUser = function (token) {
        if (this.INVALID_TOKENS.includes(token))
            throw new common_1.UnauthorizedException();
        try {
            return this.getUser(token);
        }
        catch (ex) {
            throw new common_1.UnauthorizedException(ex);
        }
    };
    LoggedUser.revokeUser = function (token) {
        this.INVALID_TOKENS.push(token);
    };
    LoggedUser.EXPIRATION_TIME = 1 * 60 * 60; // 1h
    LoggedUser.INVALID_TOKENS = [];
    return LoggedUser;
}());
exports.LoggedUser = LoggedUser;
