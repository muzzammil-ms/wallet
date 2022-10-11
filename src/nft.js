"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NFT = /** @class */ (function () {
    function NFT(id, session, ui) {
        var _this = this;
        this.getDetails = function () { };
        this.open = function (options) {
            _this.ui.openWallet("/nft-details/".concat(_this.id));
        };
        this.session = session;
        this.ui = ui;
        this.id = id;
    }
    return NFT;
}());
exports.default = NFT;
