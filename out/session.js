"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var Session = /** @class */ (function () {
    function Session() {
        this.onLogin = function (bearerToken, address) {
            var _a, _b;
            if (address === void 0) { address = {}; }
            (_a = Session.getStorage()) === null || _a === void 0 ? void 0 : _a.setItem(Session.bearerTokenKey, bearerToken);
            (_b = Session.getStorage()) === null || _b === void 0 ? void 0 : _b.setItem(Session.addressKey, JSON.stringify(address));
        };
        this.onLogout = function () {
            var _a, _b, _c;
            (_a = Session.getStorage()) === null || _a === void 0 ? void 0 : _a.removeItem(Session.bearerTokenKey);
            (_b = Session.getStorage()) === null || _b === void 0 ? void 0 : _b.removeItem(Session.addressKey);
            (_c = Session.getStorage()) === null || _c === void 0 ? void 0 : _c.removeItem(Session.clientIdKey);
        };
    }
    Object.defineProperty(Session.prototype, "isLoggedIn", {
        get: function () {
            var _a;
            var token = (_a = Session.getStorage()) === null || _a === void 0 ? void 0 : _a.getItem(Session.bearerTokenKey);
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
    Object.defineProperty(Session.prototype, "clientId", {
        get: function () {
            var _a;
            return ((_a = Session.getStorage()) === null || _a === void 0 ? void 0 : _a.getItem(Session.clientIdKey)) || "default";
        },
        set: function (client_id) {
            var _a;
            (_a = Session.getStorage()) === null || _a === void 0 ? void 0 : _a.setItem(Session.clientIdKey, client_id);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "bearerToken", {
        get: function () {
            var _a;
            return (_a = Session.getStorage()) === null || _a === void 0 ? void 0 : _a.getItem(Session.bearerTokenKey);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "chainAddress", {
        get: function () {
            var _a;
            var value = (_a = Session.getStorage()) === null || _a === void 0 ? void 0 : _a.getItem(Session.addressKey);
            return value ? JSON.parse(value) : {};
        },
        enumerable: false,
        configurable: true
    });
    Session.bearerTokenKey = "ms-bearer-token";
    Session.clientIdKey = "ms-client-id";
    Session.addressKey = "ms-chain-address";
    Session.getStorage = function () {
        if (typeof window !== "undefined")
            return localStorage;
        return;
    };
    return Session;
}());
exports.default = Session;
