declare class Session {
    static readonly bearerTokenKey = "BearerToken";
    static readonly clientIdKey = "client_id";
    constructor(clientId?: string);
    onLogin: (bearerToken: string) => void;
    onLogout: () => void;
    get isLoggedIn(): boolean;
    get clientId(): string | null;
}
export default Session;
