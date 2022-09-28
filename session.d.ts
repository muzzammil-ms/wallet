declare class Session {
    private _frameId;
    private readonly bearerTokenKey;
    constructor(frameId: string);
    onLogin: (bearerToken: string) => void;
    onLogout: () => void;
    get frameId(): string;
    get isLoggedIn(): boolean;
}
export default Session;
