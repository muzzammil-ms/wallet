import jwt_decode from "jwt-decode";

class Session {
  private _frameId: string = ``;
  private readonly bearerTokenKey = "BearerToken";
  constructor(frameId: string) {
    this._frameId = frameId;
  }

  onLogin = (bearerToken: string) => {
    localStorage.setItem(this.bearerTokenKey, bearerToken);
  };

  onLogout = () => {
    localStorage.removeItem(this.bearerTokenKey);
  };

  get frameId() {
    return this._frameId;
  }

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
