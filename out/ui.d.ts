declare class WalletUI {
    readonly baseUrl = "https://wallet.metasky.me";
    private portalId;
    private iframeId;
    private walletPermissions;
    private onClose;
    private onOpen;
    static generateRandomnString: (length: number) => string;
    static generatePortalId: () => string;
    private injectPortal;
    constructor(onClose: () => void, onOpen: () => void);
    /**
     * Opens wallet in default page. Login flow will be triggered if user is not loggedin
     */
    openWallet: (path?: string) => void;
    close: () => void;
}
export default WalletUI;
