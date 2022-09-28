"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var Session = /** @class */ (function () {
    function Session(frameId) {
        var _this = this;
        this._frameId = "";
        this.bearerTokenKey = "BearerToken";
        this.onLogin = function (bearerToken) {
            localStorage.setItem(_this.bearerTokenKey, bearerToken);
        };
        this.onLogout = function () {
            localStorage.removeItem(_this.bearerTokenKey);
        };
        this._frameId = frameId;
    }
    Object.defineProperty(Session.prototype, "frameId", {
        get: function () {
            return this._frameId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "isLoggedIn", {
        get: function () {
            var token = localStorage.getItem(this.bearerTokenKey);
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
    return Session;
}());
exports.default = Session;
