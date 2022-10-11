import NFT from "./nft";
import Session from "./session";
import WalletUI from "./ui";
declare type UIPageState = "DETAIL" | "NFT_LIST";
/**
 * @improve Can be improved to allow user to mint or burn NFT from the collection
 */
declare class Collection {
    private id;
    private session;
    private ui;
    constructor(id: string, session: Session, ui: WalletUI);
    getMyNFTs: () => NFT[];
    listNFTs: (filters: any) => NFT[];
    open: (filters: any, options?: {
        uiState: UIPageState;
    }) => void;
}
export default Collection;
