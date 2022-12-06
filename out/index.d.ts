import { WalletEventPayloadMap } from "./events";
declare type MetaskyOptions = {
    clubId: string;
};
declare type EventOptions = {
    once?: boolean;
};
declare type OpenActionType = "LOGIN" | "LOGOUT" | "OPEN_MY_NFTS" | "OPEN_COLLECTION_DETAILS" | "OPEN_COLLECTION" | "OPEN_BENEFIT";
interface IOpenOptions {
    action: OpenActionType;
    payload: {};
}
interface LoginOptions extends IOpenOptions {
    action: "LOGIN";
    payload: {
        forced: boolean;
    };
}
interface LogoutOptions extends IOpenOptions {
    action: "LOGOUT";
    payload: {
        clearUserSessionOnly?: boolean;
    };
}
interface OpenMyNFTOptions extends IOpenOptions {
    action: "OPEN_MY_NFTS";
}
interface OpenCollectionDetailsOptions extends IOpenOptions {
    action: "OPEN_COLLECTION_DETAILS";
    payload: {
        collectionId: string;
    };
}
interface OpenCollectionOptions extends IOpenOptions {
    action: "OPEN_COLLECTION";
    payload: {
        collectionId: string;
    };
}
interface OpenBenefitOptions extends IOpenOptions {
    action: "OPEN_BENEFIT";
    payload: {
        benefitId: string;
    };
}
declare type DoOptions = LoginOptions | LogoutOptions | OpenBenefitOptions | OpenCollectionDetailsOptions | OpenMyNFTOptions | OpenCollectionOptions;
declare class Wallet {
    private session;
    private eventHandlersMap;
    private ui;
    private handleEvent;
    /**
     * Opens wallet with autoclose on successsfull login operation.
     * No op if already loggedin.
     * @param options.forced Open wallet and force login user, even if user is
     * already loggedin in wallet. Autoclose after successfull login
     */
    private login;
    /**
     * Opens wallet in logout page
     * @param options.clearUserSessionOnly Deletes token from current browser
     * cache only. This will not logout user from wallet
     */
    private logout;
    constructor(options?: MetaskyOptions);
    open: (path?: string) => void;
    do: (option?: string | DoOptions) => void;
    close: () => void;
    on: <T extends "LOGIN_SUCCESS" | "LOGOUT_SUCESS" | "OPEN" | "BEFORE_CLOSE" | "CANCEL_LOGOUT">(eventName: T, handler: (data: WalletEventPayloadMap[T]) => void, options?: EventOptions) => void;
    off: <T extends "LOGIN_SUCCESS" | "LOGOUT_SUCESS" | "OPEN" | "BEFORE_CLOSE" | "CANCEL_LOGOUT">(eventName: T, handler: (data: WalletEventPayloadMap[T]) => void) => void;
}
export default function Metasky(options: MetaskyOptions): Wallet;
export {};
