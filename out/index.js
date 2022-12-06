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
        /**
         * Opens wallet with autoclose on successsfull login operation.
         * No op if already loggedin.
         * @param options.forced Open wallet and force login user, even if user is
         * already loggedin in wallet. Autoclose after successfull login
         */
        this.login = function (options) {
            var _a;
            var isLoginRequired = ((_a = options === null || options === void 0 ? void 0 : options.payload) === null || _a === void 0 ? void 0 : _a.forced) || !_this.session.isLoggedIn;
            if (!isLoginRequired)
                return;
            var onEvent = function () {
                _this.off("LOGIN_SUCCESS", onEvent);
                _this.off("BEFORE_CLOSE", onEvent);
                _this.close();
            };
            _this.on("LOGIN_SUCCESS", onEvent, { once: true });
            _this.on("BEFORE_CLOSE", onEvent, { once: true });
            _this.open("/login?client_id=".concat(_this.session.clubId));
        };
        /**
         * Opens wallet in logout page
         * @param options.clearUserSessionOnly Deletes token from current browser
         * cache only. This will not logout user from wallet
         */
        this.logout = function (options) {
            var _a;
            if ((_a = options === null || options === void 0 ? void 0 : options.payload) === null || _a === void 0 ? void 0 : _a.clearUserSessionOnly) {
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
            _this.open("/profile?client_id=".concat(_this.session.clubId, "&showLogoutSheet=true"));
        };
        this.open = function (path) {
            _this.ui.openWallet(path);
        };
        this.do = function (option) {
            if (!option || typeof option === "string") {
                _this.ui.openWallet(option);
                return;
            }
            switch (option === null || option === void 0 ? void 0 : option.action) {
                case "LOGIN":
                    _this.login(option);
                    break;
                case "LOGOUT":
                    _this.logout(option);
                    break;
                case "OPEN_BENEFIT":
                    new benefit_1.default(option.payload.benefitId, _this.session, _this.ui).open();
                    break;
                case "OPEN_COLLECTION":
                    new collection_1.default(option.payload.collectionId, _this.session, _this.ui).open(undefined, { uiState: "NFT_LIST" });
                    break;
                case "OPEN_COLLECTION_DETAILS":
                    new collection_1.default(option.payload.collectionId, _this.session, _this.ui).open(undefined, { uiState: "DETAIL" });
                    break;
                case "OPEN_MY_NFTS":
                    _this.ui.openWallet("/nfts-list/own?client_id=".concat(_this.session.clubId));
                    break;
                default:
                    _this.ui.openWallet();
            }
        };
        this.close = function () {
            _this.ui.close();
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
        });
        if (typeof window !== "undefined") {
            this.session.clubId = (options === null || options === void 0 ? void 0 : options.clubId) || "";
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
function Metasky(options) {
    return new Wallet(options);
}
exports.default = Metasky;
if (typeof window !== "undefined") {
    var initWallet = function () {
        window.Metasky = Metasky;
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
