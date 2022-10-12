"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var benefit_1 = __importDefault(require("./benefit"));
var session_1 = __importDefault(require("./session"));
var nft_1 = __importDefault(require("./nft"));
var collection_1 = __importDefault(require("./collection"));
var ui_1 = __importDefault(require("./ui"));
var Wallet = /** @class */ (function () {
    function Wallet(options) {
        var _this = this;
        this.eventHandlersMap = {};
        this.handleEvent = function (e) {
            var registeredhandlers = _this.eventHandlersMap[e.event] || [];
            registeredhandlers.forEach(function (handler) {
                handler.handler(e);
            });
            _this.eventHandlersMap[e.event] = registeredhandlers.filter(function (handler) { var _a; return !((_a = handler.options) === null || _a === void 0 ? void 0 : _a.once); });
        };
        this.openWallet = function (path) {
            _this.ui.openWallet(path);
        };
        this.close = function () {
            _this.ui.close();
        };
        /**
         * Opens wallet with autoclose on successsfull login operation.
         * No op if already loggedin.
         * @param options.forced Open wallet and force login user, even if user is
         * already loggedin in wallet. Autoclose after successfull login
         */
        this.login = function (options) {
            var isLoginRequired = (options === null || options === void 0 ? void 0 : options.forced) || !_this.session.isLoggedIn;
            if (!isLoginRequired)
                return;
            var onEvent = function () {
                _this.off("LOGIN_SUCCESS", onEvent);
                _this.off("BEFORE_CLOSE", onEvent);
                _this.close();
            };
            _this.on("LOGIN_SUCCESS", onEvent, { once: true });
            _this.on("BEFORE_CLOSE", onEvent, { once: true });
            _this.openWallet("/login?client_id=".concat(_this.session.clientId));
        };
        /**
         * Opens wallet in logout page
         * @param options.clearUserSessionOnly Deletes token from current browser
         * cache only. This will not logout user from wallet
         */
        this.logout = function (options) {
            if (options === null || options === void 0 ? void 0 : options.clearUserSessionOnly) {
                _this.session.onLogout();
                return;
            }
            var onEvent = function () {
                _this.off("CANCEL_LOGOUT", onEvent);
                _this.off("LOGOUT_SUCESS", onEvent);
                _this.off("BEFORE_CLOSE", onEvent);
                _this.close();
            };
            _this.on("CANCEL_LOGOUT", onEvent, { once: true });
            _this.on("LOGOUT_SUCESS", onEvent, { once: true });
            _this.on("BEFORE_CLOSE", onEvent, { once: true });
            _this.openWallet("/profile?client_id=".concat(_this.session.clientId, "&showLogoutSheet=true"));
        };
        this.benefit = function (id) {
            return new benefit_1.default(id, _this.session, _this.ui);
        };
        this.nft = function (id) {
            return new nft_1.default(id, _this.session, _this.ui);
        };
        this.listCollections = function (filters) {
            return [];
        };
        this.collection = function (id) {
            return new collection_1.default(id, _this.session, _this.ui);
        };
        this.openMyNfts = function () {
            _this.openWallet("/nfts-list/own?client_id=".concat(_this.session.clientId));
        };
        /**
         *
         * @param whitelistId WhitelistId be uniquely shared with every client for
         * specific user case
         */
        this.whitelist = function (whitelistId) {
            _this.openWallet("/login?client_id=".concat(_this.session.clientId, "&whitelist=true"));
        };
        this.getSession = function () {
            return _this.session;
        };
        this.setClientId = function (clientId) {
            _this.session.clientId = clientId;
        };
        this.on = function (eventName, handler, options) {
            var handlers = _this.eventHandlersMap[eventName] || [];
            _this.eventHandlersMap[eventName] = __spreadArray(__spreadArray([], handlers, true), [{ handler: handler, options: options }], false);
        };
        this.off = function (eventName, handler) {
            var handlers = _this.eventHandlersMap[eventName] || [];
            _this.eventHandlersMap[eventName] = handlers.filter(function (_handler) { return _handler.handler !== handler; });
        };
        this.session = new session_1.default();
        this.ui = new ui_1.default(function () {
            _this.handleEvent({ event: "BEFORE_CLOSE", payload: {} });
        }, function () {
            _this.handleEvent({ event: "OPEN", payload: {} });
        }, options);
        if (typeof window !== "undefined") {
            this.session.clientId = (options === null || options === void 0 ? void 0 : options.client_id) || "";
            this.on("LOGIN_SUCCESS", function (payload) {
                _this.session.onLogin(payload.payload.bearerToken, payload.payload.walletAddress);
            });
            this.on("LOGOUT_SUCESS", function () { return _this.session.onLogout(); });
            window.addEventListener("message", function (e) {
                try {
                    if (e.origin !== _this.ui.baseUrl)
                        return;
                    console.log("Received", e.data);
                    var data = JSON.parse(e.data);
                    if (!data.event)
                        return;
                    _this.handleEvent(data);
                }
                catch (error) { }
            });
        }
    }
    return Wallet;
}());
if (typeof window !== "undefined") {
    var initWallet = function () {
        window.Wallet = Wallet;
    };
    if (document.readyState === "complete") {
        initWallet();
    }
    else if (window.attachEvent) {
        window.attachEvent("onload", initWallet);
    }
    else {
        window.addEventListener("load", initWallet, false);
    }
}
exports.default = Wallet;
