import jwt_decode from "jwt-decode";

class Session {
  static readonly bearerTokenKey = "BearerToken";

  onLogin = (bearerToken: string) => {
    localStorage.setItem(Session.bearerTokenKey, bearerToken);
  };

  onLogout = () => {
    localStorage.removeItem(Session.bearerTokenKey);
  };

  get isLoggedIn() {
    const token = localStorage.getItem(Session.bearerTokenKey);
    if (!token) return false;
    const decodedToken: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    const expTime = decodedToken && decodedToken?.exp;
    return expTime > currentTime;
  }
}

export default Session;
