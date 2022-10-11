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
Object.defineProperty(exports, "__esModule", { value: true });
var WalletUI = /** @class */ (function () {
    function WalletUI(onClose, onOpen, options) {
        var _this = this;
        this.baseUrl = "http://localhost:3005";
        this.portalId = "";
        this.iframeId = "";
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
        /**
         * Opens wallet in default page. Login flow will be triggered if user is not loggedin
         */
        this.openWallet = function (path) {
            var _a, _b;
            if (path === void 0) { path = ""; }
            (_a = document
                .getElementById(_this.iframeId)) === null || _a === void 0 ? void 0 : _a.setAttribute("src", "".concat(_this.baseUrl).concat(path));
            (_b = document
                .getElementById(_this.portalId)) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "display: block;");
            _this.onOpen();
        };
        this.close = function () {
            var _a, _b;
            (_a = document.getElementById(_this.iframeId)) === null || _a === void 0 ? void 0 : _a.setAttribute("src", "");
            (_b = document.getElementById(_this.portalId)) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "");
            _this.onClose();
        };
        this.onClose = onClose;
        this.onOpen = onOpen;
        this.walletPermissions = __assign({
            camera: true,
            "clipboard-read": true,
            "clipboard-write": true,
            microphone: true,
        }, ((options === null || options === void 0 ? void 0 : options.permission) || {}));
        this.portalId = WalletUI.generatePortalId();
        this.iframeId = "".concat(this.portalId, "-iframe");
        if (typeof window !== "undefined") {
            this.injectPortal();
        }
    }
    WalletUI.generateRandomnString = function (length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    WalletUI.generatePortalId = function () {
        return "skywallet-".concat(WalletUI.generateRandomnString(10));
    };
    return WalletUI;
}());
exports.default = WalletUI;
