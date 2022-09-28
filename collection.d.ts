import NFT from "./nft";
import Session from "./session";
/**
 * @improve Can be improved to allow user to mint or burn NFT from the collection
 */
declare class Collection {
    constructor(id: string, session: Session, walletBaseUrl: string);
    getMyNFTs: () => NFT[];
    listNFTs: (filters: any) => NFT[];
    open: (filters: any) => void;
}
export default Collection;
