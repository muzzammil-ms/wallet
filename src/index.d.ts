import Benefit from "./benefit";
import NFT from "./nft";
import Collection from "./collection";
import { WalletEventPayloadMap } from "./events";
import { WalletPermissionConfig } from "./ui";
declare type WalletOptions = Partial<{
    client_id: string;
    permission: WalletPermissionConfig;
}>;
declare type EventOptions = {
    once?: boolean;
};
declare class Wallet {
    private client_id;
    private session;
    private eventHandlersMap;
    private ui;
    private handleEvent;
    constructor(options?: WalletOptions);
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
    benefit: (id: string) => Benefit;
    nft: (id: string) => NFT;
    listCollections: (filters: any) => Collection[];
    collection: (id: string) => Collection;
    openMyNfts: () => void;
    /**
     *
     * @param whitelistId WhitelistId be uniquely shared with every client for
     * specific user case
     */
    whitelist: (whitelistId: string) => void;
    on: <T extends "LOGIN_SUCCESS" | "LOGOUT_SUCESS" | "OPEN" | "BEFORE_CLOSE">(eventName: T, handler: (data: WalletEventPayloadMap[T]) => void, options?: EventOptions) => void;
    off: <T extends "LOGIN_SUCCESS" | "LOGOUT_SUCESS" | "OPEN" | "BEFORE_CLOSE">(eventName: T, handler: (data: WalletEventPayloadMap[T]) => void) => void;
}
export default Wallet;
