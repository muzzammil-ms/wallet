import NFT from "./nft";
import Session from "./session";
import WalletUI from "./ui";

type UIPageState = "DETAIL" | "NFT_LIST";

/**
 * @improve Can be improved to allow user to mint or burn NFT from the collection
 */
class Collection {
  private id: string;
  private session: Session;
  private ui: WalletUI;
  constructor(id: string, session: Session, ui: WalletUI) {
    this.session = session;
    this.ui = ui;
    this.id = id;
  }

  getMyNFTs = (): NFT[] => {
    return [];
  };

  listNFTs = (filters: any): NFT[] => {
    return [];
  };

  open = (filters: any, options?: { uiState: UIPageState }) => {
    let path = `/collection-details?filters={"collectionIds":["${this.id}"]}`;
    if (options?.uiState === "NFT_LIST") {
      path = `/marketplace/listings?filters={"collectionIds":["${this.id}"]}`;
    }
    this.ui.openWallet(path);
  };
}

export default Collection;
