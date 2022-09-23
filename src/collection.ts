import NFT from "./nft";
import Session from "./session";

/**
 * @improve Can be improved to allow user to mint or burn NFT from the collection
 */
class Collection {
  constructor(id: string, session: Session, walletBaseUrl: string) {}

  getMyNFTs = (): NFT[] => {
    return [];
  };

  listNFTs = (filters: any): NFT[] => {
    return [];
  };

  open = (filters: any) => {};
}

export default Collection;
