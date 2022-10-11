import jwt_decode from "jwt-decode";

class Session {
  private readonly bearerTokenKey = "BearerToken";

  onLogin = (bearerToken: string) => {
    console.log("Setting localstore", this.bearerTokenKey, bearerToken);
    localStorage.setItem(this.bearerTokenKey, bearerToken);
  };

  onLogout = () => {
    localStorage.removeItem(this.bearerTokenKey);
  };

  get isLoggedIn() {
    const token = localStorage.getItem(this.bearerTokenKey);
    if (!token) return false;
    const decodedToken: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    const expTime = decodedToken && decodedToken?.exp;
    return expTime > currentTime;
  }
}

export default Session;
