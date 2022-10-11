"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var Session = /** @class */ (function () {
    function Session() {
        this.onLogin = function (bearerToken) {
            localStorage.setItem(Session.bearerTokenKey, bearerToken);
        };
        this.onLogout = function () {
            localStorage.removeItem(Session.bearerTokenKey);
        };
    }
    Object.defineProperty(Session.prototype, "isLoggedIn", {
        get: function () {
            var token = localStorage.getItem(Session.bearerTokenKey);
            if (!token)
                return false;
            var decodedToken = (0, jwt_decode_1.default)(token);
            var currentTime = Date.now() / 1000;
            var expTime = decodedToken && (decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.exp);
            return expTime > currentTime;
        },
        enumerable: false,
        configurable: true
    });
    Session.bearerTokenKey = "BearerToken";
    return Session;
}());
exports.default = Session;
