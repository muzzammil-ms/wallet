export declare type WalletPermissionConfig = Partial<{
    "clipboard-read": boolean;
    "clipboard-write": boolean;
    camera: boolean;
    microphone: boolean;
}>;
export declare type WalletPermission = keyof WalletPermissionConfig;
declare class WalletUI {
    private readonly baseUrl;
    private portalId;
    private iframeId;
    private walletPermissions;
    private onClose;
    private generateRandomnString;
    private generatePortalId;
    private injectPortal;
    constructor(onClose: () => void, options?: {
        permission?: WalletPermissionConfig;
    });
    /**
     * Opens wallet in default page. Login flow will be triggered if user is not loggedin
     */
    openWallet: (path?: string) => void;
    close: () => void;
}
export default WalletUI;
