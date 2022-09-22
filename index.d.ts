declare type WalletPermissionConfig = Partial<{
    "clipboard-read": boolean;
    "clipboard-write": boolean;
    camera: boolean;
    microphone: boolean;
}>;
declare type WalletOptions = Partial<{
    client_id: string;
    permission: WalletPermissionConfig;
}>;
declare const WalletEventList: readonly ["LOGIN", "LOGOUT", "OPEN", "BEFORE_CLOSE"];
declare type WalletEvent = typeof WalletEventList[number];
declare class Wallet {
    private readonly baseUrl;
    private client_id;
    private portalId;
    private walletPermissions;
    private generateRandomnString;
    private generatePortalId;
    private injectPortal;
    constructor(options?: WalletOptions);
    openWallet: () => void;
    openBenefit: (benefitId: string) => void;
    openNftDetail: () => void;
    openMyNfts: () => void;
    openCollections: () => void;
    close: () => void;
    on: (eventName: WalletEvent, handler: (data: object) => void) => void;
}
export default Wallet;
