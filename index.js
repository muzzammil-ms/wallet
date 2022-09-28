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
var Wallet = /** @class */ (function () {
    function Wallet(options) {
        var _this = this;
        this.baseUrl = "https://wallet.metasky.me";
        this.client_id = "default";
        this.portalId = "";
        this.iframeId = "";
        this.eventHandlersMap = new Map();
        this.generateRandomnString = function (length) {
            var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        this.generatePortalId = function () {
            return "skywallet-".concat(_this.generateRandomnString(10));
        };
        this.injectPortal = function () {
            var elem = document.getElementById(_this.portalId);
            if (elem)
                return;
            // Start injecting iframe
            var style = document.createElement("style");
            style.innerHTML = "\n            #".concat(_this.portalId, " .close-container {\n                min-width: 315px;\n                max-width: 428px;\n                width: 100%;\n                position: fixed;\n                left: 50%;\n                right: 50%;\n                transform: translateX(-50%);\n                -webkit-box-align: center;\n                align-items: center;\n                -webkit-box-pack: end;\n                justify-content: flex-end;\n                background-color: rgb(204, 213, 236);\n                z-index: 100;\n                height: 40px;\n                font-size: 14px;\n                font-weight: 700;\n                color: rgb(46, 54, 72);\n                cursor: pointer;\n                display: flex !important;\n            }\n            #").concat(_this.portalId, " .close-icon {\n                width: 20px;\n                height: 20px;\n                padding: 0px;\n                margin: 10px;\n                pointer-events: all;\n                color: black;\n                font-size: 12px;\n                font-weight: 600;\n                z-index: 9;\n                background-color: rgb(253, 215, 63);\n                border: 0px;\n                cursor: pointer;\n                border-radius: 100% !important;\n            }\n            #").concat(_this.portalId, " .iframe {\n                height: 926px;\n                max-width: 428px;\n                min-width: 375px;\n                width: 100%;\n                position: fixed;\n                left: 50%;\n                right: 50%;\n                -webkit-transform: translateX(-50%);\n                -moz-transform: translateX(-50%);\n                -ms-transform: translateX(-50%);\n                transform: translateX(-50%);\n                z-index: 99;\n                background-color: #e6eaf0;\n                padding-top: 2.5rem;\n                max-height: 90vh;        \n            }\n            @media (max-width: 429px) {\n                #").concat(_this.portalId, " .iframe {\n                    height: 100%;\n                    max-height: 100vh;  \n                }\n            }\n            #").concat(_this.portalId, " .overlay {\n                position: fixed;\n                display: block;\n                width: 100%;\n                height: 100%;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background-color: rgba(0, 0, 0, 0.5);\n                z-index: 90;\n                cursor: pointer;\n                -webkit-backdrop-filter: blur(20px);\n                backdrop-filter: blur(20px);\n            }\n            #").concat(_this.portalId, " {\n                display: none;\n                position: fixed;\n                left: 0;\n                right: 0;\n                top: 0;\n                bottom: 0;\n                z-index: 88;        \n            }\n        ");
            document.head.appendChild(style);
            /**
             * Create Portal
             */
            var portal = document.createElement("div");
            portal.setAttribute("id", _this.portalId);
            /**
             * Create Iframe
             */
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", "");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowFullScreen", "true");
            iframe.setAttribute("allow", Object.keys(_this.walletPermissions)
                .filter(function (k) { return _this.walletPermissions[k]; })
                .join(";"));
            iframe.setAttribute("class", "iframe");
            iframe.setAttribute("id", _this.iframeId);
            /**
             * Overlay
             */
            var overlay = document.createElement("div");
            overlay.setAttribute("class", "overlay");
            /**
             * Close Container
             */
            var closeContainer = document.createElement("div");
            closeContainer.setAttribute("class", "close-container");
            closeContainer.onclick = _this.close;
            var closeText = document.createElement("span");
            closeText.innerHTML = "Close";
            var cross = document.createElement("button");
            cross.innerHTML = "X";
            cross.setAttribute("class", "close-icon");
            /**
             * Constructing the integration structure
             */
            closeContainer.appendChild(closeText);
            closeContainer.appendChild(cross);
            portal.appendChild(closeContainer);
            portal.appendChild(iframe);
            portal.appendChild(overlay);
            document.body.appendChild(portal);
        };
        this.handleEvent = function (e) {
            var registeredhandlers = _this.eventHandlersMap.get(e.event) || [];
            registeredhandlers.forEach(function (handler) {
                handler.handler(e.payload);
            });
            _this.eventHandlersMap.set(e.event, registeredhandlers.filter(function (handler) { var _a; return !((_a = handler.options) === null || _a === void 0 ? void 0 : _a.once); }));
        };
        /**
         * Opens wallet in default page. Login flow will be triggered if user is not loggedin
         */
        this.openWallet = function (path) {
            var _a, _b;
            (_a = document
                .getElementById(_this.iframeId)) === null || _a === void 0 ? void 0 : _a.setAttribute("src", "".concat(_this.baseUrl, "/").concat(path));
            (_b = document
                .getElementById(_this.portalId)) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display: block;");
        };
        this.close = function () {
            var _a, _b;
            (_a = document.getElementById(_this.iframeId)) === null || _a === void 0 ? void 0 : _a.setAttribute("src", "");
            (_b = document.getElementById(_this.portalId)) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "");
            _this.handleEvent({ event: "BEFORE_CLOSE", payload: {} });
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
        this.benefit = function (benefitId) {
            return new benefit_1.default(benefitId, _this.session, _this.baseUrl);
        };
        this.nft = function (nftId) {
            return new nft_1.default(nftId, _this.session, _this.baseUrl);
        };
        this.listCollections = function (filters) {
            return [];
        };
        this.collection = function (id) {
            return new collection_1.default("", _this.session, _this.baseUrl);
        };
        this.openMyNfts = function () { };
        /**
         *
         * @param whitelistId WhitelistId be uniquely shared with every client for
         * specific user case
         */
        this.whitelist = function (whitelistId) { };
        this.on = function (eventName, handler, options) {
            var handlers = _this.eventHandlersMap.get(eventName) || [];
            _this.eventHandlersMap.set(eventName, __spreadArray(__spreadArray([], handlers, true), [{ handler: handler, options: options }], false));
        };
        this.off = function (eventName, handler) {
            var handlers = _this.eventHandlersMap.get(eventName) || [];
            _this.eventHandlersMap.set(eventName, handlers.filter(function (_handler) { return _handler.handler !== handler; }));
        };
        this.client_id = (options === null || options === void 0 ? void 0 : options.client_id) || "default";
        this.walletPermissions = __assign({
            camera: true,
            "clipboard-read": true,
            "clipboard-write": true,
            microphone: true,
        }, ((options === null || options === void 0 ? void 0 : options.permission) || {}));
        this.portalId = this.generatePortalId();
        this.iframeId = "".concat(this.portalId, "-iframe");
        this.session = new session_1.default(this.iframeId);
        if (typeof window !== "undefined") {
            this.on("LOGIN", function (payload) {
                return _this.session.onLogin(payload.payload.bearerToken);
            });
            this.on("LOGOUT", function () { return _this.session.onLogout(); });
            window.addEventListener("message", function (e) {
                try {
                    var data = JSON.parse(e.data);
                    _this.handleEvent(data);
                }
                catch (error) { }
            });
            this.injectPortal();
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
