class Session {
  private bearerToken: string = ``;
  constructor() {}

  onLogin = (bearerToken: string) => {};

  onLogout = () => {};

  get isLoggedIn() {
    return true;
  }
}

export default Session;