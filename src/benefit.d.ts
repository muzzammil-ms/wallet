import Session from "./session";
import WalletUI from "./ui";
declare class Benefit {
    private id;
    private session;
    private ui;
    constructor(id: string, session: Session, ui: WalletUI);
    getDetails: () => Promise<void>;
    /**
     * @discuss Should be improved to return reason incase user is not allowed to claim NFT
     * Also need to discuss on how can user claim benefit using SDK. Or should it be allowed
     * just using Wallet
     * @returns
     */
    canClaimBenefit: () => boolean;
    claim: () => void;
    open: () => void;
}
export default Benefit;
