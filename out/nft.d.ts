import Session from "./session";
import WalletUI from "./ui";
declare type UIPageState = "BUY" | "SELL" | "SEND" | "REMOVE_FROM_SALE";
declare class NFT {
    private id;
    private session;
    private ui;
    constructor(id: string, session: Session, ui: WalletUI);
    getDetails: () => void;
    open: (options?: {
        uiState?: UIPageState;
    }) => void;
}
export default NFT;
