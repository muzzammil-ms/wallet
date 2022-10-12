declare type ChainAddress = {
    nearAddress?: string;
    ethAddress?: string;
};
declare class Session {
    static readonly bearerTokenKey = "ms-bearer-token";
    static readonly clientIdKey = "ms-client-id";
    static readonly addressKey = "ms-chain-address";
    static getStorage: () => Storage | undefined;
    onLogin: (bearerToken: string, address?: ChainAddress) => void;
    onLogout: () => void;
    get isLoggedIn(): boolean;
    get clientId(): string;
    get bearerToken(): string | null | undefined;
    get chainAddress(): ChainAddress;
    set clientId(client_id: string);
}
export default Session;
