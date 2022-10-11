"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @improve Can be improved to allow user to mint or burn NFT from the collection
 */
var Collection = /** @class */ (function () {
    function Collection(id, session, ui) {
        var _this = this;
        this.getMyNFTs = function () {
            return [];
        };
        this.listNFTs = function (filters) {
            return [];
        };
        this.open = function (filters, options) {
            _this.ui.openWallet("/benefit-details/".concat(_this.id));
        };
        this.session = session;
        this.ui = ui;
        this.id = id;
    }
    return Collection;
}());
exports.default = Collection;
