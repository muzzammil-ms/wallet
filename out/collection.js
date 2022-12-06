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
            var path = "/collection-details?filters={\"collectionIds\":[\"".concat(_this.id, "\"]}&client_id=").concat(_this.session.clubId);
            if ((options === null || options === void 0 ? void 0 : options.uiState) === "NFT_LIST") {
                path = "/marketplace/listings?filters={\"collectionIds\":[\"".concat(_this.id, "\"]}&client_id=").concat(_this.session.clubId);
            }
            _this.ui.openWallet(path);
        };
        this.session = session;
        this.ui = ui;
        this.id = id;
    }
    return Collection;
}());
exports.default = Collection;
