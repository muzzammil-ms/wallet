"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        this.client_id = "default";
        this.eventHandlersMap = new Map();
        this.handleEvent = function (e) {
            console.log("Handle Event", e);
            var registeredhandlers = _this.eventHandlersMap.get(e.event) || [];
            console.log("registeredhandlers", registeredhandlers);
            registeredhandlers.forEach(function (handler) {
                handler.handler(e.payload);
            });
            _this.eventHandlersMap.set(e.event, registeredhandlers.filter(function (handler) { var _a; return !((_a = handler.options) === null || _a === void 0 ? void 0 : _a.once); }));
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
        this.login = function (options) { return __awaiter(_this, void 0, void 0, function () {
            var isLoginRequired, onLoginSuccess_1, onFrameClose;
            var _this = this;
            return __generator(this, function (_a) {
                isLoginRequired = (options === null || options === void 0 ? void 0 : options.forced) || !this.session.isLoggedIn;
                if (isLoginRequired) {
                    this.openWallet("/login");
                    onLoginSuccess_1 = function (data) {
                        _this.close();
                    };
                    onFrameClose = function () {
                        _this.off("LOGIN", onLoginSuccess_1);
                    };
                    this.on("LOGIN", onLoginSuccess_1, { once: true });
                    this.on("BEFORE_CLOSE", onFrameClose, { once: true });
                }
                return [2 /*return*/];
            });
        }); };
        /**
         * Opens wallet in logout page
         * @param options.clearUserSessionOnly Deletes token from current browser
         * cache only. This will not logout user from wallet
         */
        this.logout = function (options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options === null || options === void 0 ? void 0 : options.clearUserSessionOnly) {
                    this.session.onLogout();
                    return [2 /*return*/];
                }
                this.openWallet("/logout");
                return [2 /*return*/];
            });
        }); };
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
            _this.openWallet("/nfts-list/own");
        };
        /**
         *
         * @param whitelistId WhitelistId be uniquely shared with every client for
         * specific user case
         */
        this.whitelist = function (whitelistId) {
            _this.openWallet("/login?whitelist=true");
        };
        this.on = function (eventName, handler, options) {
            var handlers = _this.eventHandlersMap.get(eventName) || [];
            _this.eventHandlersMap.set(eventName, __spreadArray(__spreadArray([], handlers, true), [{ handler: handler, options: options }], false));
        };
        this.off = function (eventName, handler) {
            var handlers = _this.eventHandlersMap.get(eventName) || [];
            _this.eventHandlersMap.set(eventName, handlers.filter(function (_handler) { return _handler.handler !== handler; }));
        };
        this.client_id = (options === null || options === void 0 ? void 0 : options.client_id) || "default";
        this.session = new session_1.default();
        this.ui = new ui_1.default(function () {
            _this.handleEvent({ event: "BEFORE_CLOSE", payload: {} });
        }, function () {
            _this.handleEvent({ event: "OPEN", payload: {} });
        }, options);
        if (typeof window !== "undefined") {
            this.on("LOGIN", function (payload) {
                console.log("Session lOgin Start", _this.session, _this.session.onLogin);
                _this.session.onLogin(payload.payload.bearerToken);
            });
            this.on("LOGOUT", function () { return _this.session.onLogout(); });
            window.addEventListener("message", function (e) {
                try {
                    if (e.origin !== _this.ui.baseUrl)
                        return;
                    console.log("Message", e);
                    var data = JSON.parse(e.data);
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
