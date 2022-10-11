declare class Session {
    private readonly bearerTokenKey;
    onLogin: (bearerToken: string) => void;
    onLogout: () => void;
    get isLoggedIn(): boolean;
}
export default Session;
