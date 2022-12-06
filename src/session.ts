import jwt_decode from "jwt-decode";

type ChainAddress = {
  nearAddress?: string;
  ethAddress?: string;
};

class Session {
  static readonly bearerTokenKey = "ms-bearer-token";
  static readonly clubIdKey = "ms-club-id";
  static readonly addressKey = "ms-chain-address";

  static getStorage = () => {
    if (typeof window !== "undefined") return localStorage;
    return;
  };

  onLogin = (bearerToken: string, address: ChainAddress = {}) => {
    Session.getStorage()?.setItem(Session.bearerTokenKey, bearerToken);
    Session.getStorage()?.setItem(Session.addressKey, JSON.stringify(address));
  };

  onLogout = () => {
    Session.getStorage()?.removeItem(Session.bearerTokenKey);
    Session.getStorage()?.removeItem(Session.addressKey);
    Session.getStorage()?.removeItem(Session.clubIdKey);
  };

  get isLoggedIn() {
    const token = Session.getStorage()?.getItem(Session.bearerTokenKey);
    if (!token) return false;
    const decodedToken: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    const expTime = decodedToken && decodedToken?.exp;
    return expTime > currentTime;
  }

  get clubId() {
    return Session.getStorage()?.getItem(Session.clubIdKey) || "default";
  }

  get bearerToken() {
    return Session.getStorage()?.getItem(Session.bearerTokenKey);
  }

  get chainAddress(): ChainAddress {
    const value = Session.getStorage()?.getItem(Session.addressKey);
    return value ? JSON.parse(value) : {};
  }

  set clubId(club_id: string) {
    Session.getStorage()?.setItem(Session.clubIdKey, club_id);
  }
}

export default Session;
