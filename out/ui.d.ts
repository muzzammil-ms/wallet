export declare type WalletPermissionConfig = Partial<{
    "clipboard-read": boolean;
    "clipboard-write": boolean;
    camera: boolean;
    microphone: boolean;
}>;
export declare type WalletPermission = keyof WalletPermissionConfig;
declare class WalletUI {
    readonly baseUrl = "https://app-1box.metasky.me";
    private portalId;
    private iframeId;
    private walletPermissions;
    private onClose;
    private onOpen;
    static generateRandomnString: (length: number) => string;
    static generatePortalId: () => string;
    private injectPortal;
    constructor(onClose: () => void, onOpen: () => void, options?: {
        permission?: WalletPermissionConfig;
    });
    /**
     * Opens wallet in default page. Login flow will be triggered if user is not loggedin
     */
    openWallet: (path?: string) => void;
    close: () => void;
}
export default WalletUI;
