declare class Session {
    static readonly bearerTokenKey = "BearerToken";
    onLogin: (bearerToken: string) => void;
    onLogout: () => void;
    get isLoggedIn(): boolean;
}
export default Session;
