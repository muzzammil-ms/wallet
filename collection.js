"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @improve Can be improved to allow user to mint or burn NFT from the collection
 */
var Collection = /** @class */ (function () {
    function Collection(id, session, walletBaseUrl) {
        this.getMyNFTs = function () {
            return [];
        };
        this.listNFTs = function (filters) {
            return [];
        };
        this.open = function (filters) { };
    }
    return Collection;
}());
exports.default = Collection;
