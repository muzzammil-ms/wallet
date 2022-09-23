import Session from "./session";

class Benefit {
  constructor(id: string, session: Session, walletBaseUrl: string) {}

  getDetails = async () => {};

  /**
   * @discuss Should be improved to return reason incase user is not allowed to claim NFT
   * Also need to discuss on how can user claim benefit using SDK. Or should it be allowed
   * just using Wallet
   * @returns
   */
  canClaimBenefit = (): boolean => {
    return false;
  };

  claim = () => {};

  open = () => {};
}

export default Benefit;
