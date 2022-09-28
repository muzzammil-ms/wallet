import Benefit from "./benefit";
import NFT from "./nft";
import Collection from "./collection";
import { WalletEventPayloadMap } from "./events";
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
declare type EventOptions = {
    once?: boolean;
};
declare class Wallet {
    private readonly baseUrl;
    private client_id;
    private portalId;
    private iframeId;
    private walletPermissions;
    private session;
    private eventHandlersMap;
    private generateRandomnString;
    private generatePortalId;
    private injectPortal;
    private handleEvent;
    constructor(options?: WalletOptions);
    /**
     * Opens wallet in default page. Login flow will be triggered if user is not loggedin
     */
    openWallet: (path?: string) => void;
    close: () => void;
    /**
     * Opens wallet with autoclose on successsfull login operation.
     * No op if already loggedin.
     * @param options.forced Open wallet and force login user, even if user is
     * already loggedin in wallet. Autoclose after successfull login
     */
    login: (options?: {
        forced: boolean;
    }) => Promise<void>;
    /**
     * Opens wallet in logout page
     * @param options.clearUserSessionOnly Deletes token from current browser
     * cache only. This will not logout user from wallet
     */
    logout: (options?: {
        clearUserSessionOnly: boolean;
    }) => Promise<void>;
    benefit: (benefitId: string) => Benefit;
    nft: (nftId: string) => NFT;
    listCollections: (filters: any) => Collection[];
    collection: (id: string) => Collection;
    openMyNfts: () => void;
    /**
     *
     * @param whitelistId WhitelistId be uniquely shared with every client for
     * specific user case
     */
    whitelist: (whitelistId: string) => void;
    on: <T extends "LOGIN" | "LOGOUT" | "OPEN" | "BEFORE_CLOSE">(eventName: T, handler: (data: WalletEventPayloadMap[T]) => void, options?: EventOptions) => void;
    off: <T extends "LOGIN" | "LOGOUT" | "OPEN" | "BEFORE_CLOSE">(eventName: T, handler: (data: WalletEventPayloadMap[T]) => void) => void;
}
export default Wallet;
