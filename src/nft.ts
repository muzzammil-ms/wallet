import Session from "./session";
import WalletUI from "./ui";

type UIPageState = "BUY" | "SELL" | "SEND" | "REMOVE_FROM_SALE";

class NFT {
  private id: string;
  private session: Session;
  private ui: WalletUI;
  constructor(id: string, session: Session, ui: WalletUI) {
    this.session = session;
    this.ui = ui;
    this.id = id;
  }

  getDetails = () => {};

  open = (options?: { uiState?: UIPageState }) => {
    this.ui.openWallet(`/nft-details/${this.id}`);
  };
}

export default NFT;
