import Session from "./session";
import WalletUI from "./ui";

class Benefit {
  private id: string;
  private session: Session;
  private ui: WalletUI;
  constructor(id: string, session: Session, ui: WalletUI) {
    this.session = session;
    this.ui = ui;
    this.id = id;
  }

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

  open = () => {
    this.ui.openWallet(`/benefit-details/${this.id}?client_id=${this.session.clientId}`);
  };
}

export default Benefit;
