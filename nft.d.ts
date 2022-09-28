import Session from "./session";
declare class NFT {
    constructor(id: string, session: Session, walletBaseUrl: string);
    getDetails: () => void;
    buy: () => void;
    sell: () => void;
    putForSale: () => void;
    removeFromSale: () => void;
    open: () => void;
}
export default NFT;
