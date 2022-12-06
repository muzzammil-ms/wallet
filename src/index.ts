import Benefit from "./benefit";
import Session from "./session";
import NFT from "./nft";
import Collection from "./collection";
import {
  ILoginEvent,
  ILogoutEvent,
  WalletEvent,
  WalletEventPayloadMap,
} from "./events";
import WalletUI from "./ui";

type MetaskyOptions = {
  clubId: string;
};

type EventOptions = {
  once?: boolean;
};

type OpenActionType =
  | "LOGIN"
  | "LOGOUT"
  | "OPEN_MY_NFTS"
  | "OPEN_COLLECTION_DETAILS"
  | "OPEN_COLLECTION"
  | "OPEN_BENEFIT";

interface IOpenOptions {
  action: OpenActionType;
  payload: {};
}

interface LoginOptions extends IOpenOptions {
  action: "LOGIN";
  payload: { forced: boolean };
}

interface LogoutOptions extends IOpenOptions {
  action: "LOGOUT";
  payload: { clearUserSessionOnly?: boolean };
}

interface OpenMyNFTOptions extends IOpenOptions {
  action: "OPEN_MY_NFTS";
}

interface OpenCollectionDetailsOptions extends IOpenOptions {
  action: "OPEN_COLLECTION_DETAILS";
  payload: {
    collectionId: string;
  };
}

interface OpenCollectionOptions extends IOpenOptions {
  action: "OPEN_COLLECTION";
  payload: {
    collectionId: string;
  };
}

interface OpenBenefitOptions extends IOpenOptions {
  action: "OPEN_BENEFIT";
  payload: {
    benefitId: string;
  };
}

type DoOptions =
  | LoginOptions
  | LogoutOptions
  | OpenBenefitOptions
  | OpenCollectionDetailsOptions
  | OpenMyNFTOptions
  | OpenCollectionOptions;

class Wallet {
  private session: Session;
  private eventHandlersMap: {
    [key in WalletEvent]?: { options?: EventOptions; handler: Function }[];
  } = {};
  private ui: WalletUI;

  private handleEvent = (e: { event: WalletEvent; payload: any }) => {
    const registeredhandlers = this.eventHandlersMap[e.event] || [];
    registeredhandlers.forEach((handler) => {
      handler.handler(e);
    });
    this.eventHandlersMap[e.event] = registeredhandlers.filter(
      (handler) => !handler.options?.once
    );
  };

  /**
   * Opens wallet with autoclose on successsfull login operation.
   * No op if already loggedin.
   * @param options.forced Open wallet and force login user, even if user is
   * already loggedin in wallet. Autoclose after successfull login
   */
  private login = (options?: LoginOptions) => {
    const isLoginRequired =
      options?.payload?.forced || !this.session.isLoggedIn;
    if (!isLoginRequired) return;
    const onEvent = () => {
      this.off("LOGIN_SUCCESS", onEvent);
      this.off("BEFORE_CLOSE", onEvent);
      this.close();
    };
    this.on("LOGIN_SUCCESS", onEvent, { once: true });
    this.on("BEFORE_CLOSE", onEvent, { once: true });
    this.open(`/login?client_id=${this.session.clubId}`);
  };

  /**
   * Opens wallet in logout page
   * @param options.clearUserSessionOnly Deletes token from current browser
   * cache only. This will not logout user from wallet
   */
  private logout = (options: LogoutOptions) => {
    if (options?.payload?.clearUserSessionOnly) {
      this.session.onLogout();
      return;
    }
    const onEvent = () => {
      this.off("CANCEL_LOGOUT", onEvent);
      this.off("LOGOUT_SUCESS", onEvent);
      this.off("BEFORE_CLOSE", onEvent);
      this.close();
    };
    this.on("CANCEL_LOGOUT", onEvent, { once: true });
    this.on("LOGOUT_SUCESS", onEvent, { once: true });
    this.on("BEFORE_CLOSE", onEvent, { once: true });
    this.open(`/profile?client_id=${this.session.clubId}&showLogoutSheet=true`);
  };

  constructor(options?: MetaskyOptions) {
    this.session = new Session();
    this.ui = new WalletUI(
      () => {
        this.handleEvent({ event: "BEFORE_CLOSE", payload: {} });
      },
      () => {
        this.handleEvent({ event: "OPEN", payload: {} });
      }
    );
    if (typeof window !== "undefined") {
      this.session.clubId = options?.clubId || "";
      this.on("LOGIN_SUCCESS", (payload) => {
        this.session.onLogin(
          payload.payload.bearerToken,
          payload.payload.walletAddress
        );
      });
      this.on("LOGOUT_SUCESS", () => this.session.onLogout());
      window.addEventListener("message", (e) => {
        try {
          if (e.origin !== this.ui.baseUrl) return;
          console.log("Received", e.data);
          const data = JSON.parse(e.data);
          if (!data.event) return;
          this.handleEvent(data);
        } catch (error) {}
      });
    }
  }

  open = (path?: string) => {
    this.ui.openWallet(path);
  };

  do = (option?: string | DoOptions) => {
    if (!option || typeof option === "string") {
      this.ui.openWallet(option);
      return;
    }
    switch (option?.action) {
      case "LOGIN":
        this.login(option);
        break;
      case "LOGOUT":
        this.logout(option);
        break;
      case "OPEN_BENEFIT":
        new Benefit(option.payload.benefitId, this.session, this.ui).open();
        break;
      case "OPEN_COLLECTION":
        new Collection(option.payload.collectionId, this.session, this.ui).open(
          undefined,
          { uiState: "NFT_LIST" }
        );
        break;
      case "OPEN_COLLECTION_DETAILS":
        new Collection(option.payload.collectionId, this.session, this.ui).open(
          undefined,
          { uiState: "DETAIL" }
        );
        break;
      case "OPEN_MY_NFTS":
        this.ui.openWallet(`/nfts-list/own?client_id=${this.session.clubId}`);
        break;
      default:
        this.ui.openWallet();
    }
  };

  close = () => {
    this.ui.close();
  };

  on = <T extends WalletEvent>(
    eventName: T,
    handler: (data: WalletEventPayloadMap[T]) => void,
    options?: EventOptions
  ) => {
    const handlers = this.eventHandlersMap[eventName] || [];
    this.eventHandlersMap[eventName] = [...handlers, { handler, options }];
  };

  off = <T extends WalletEvent>(
    eventName: T,
    handler: (data: WalletEventPayloadMap[T]) => void
  ) => {
    const handlers = this.eventHandlersMap[eventName] || [];
    this.eventHandlersMap[eventName] = handlers.filter(
      (_handler) => _handler.handler !== handler
    );
  };
}

export default function Metasky(options: MetaskyOptions) {
  return new Wallet(options);
}

if (typeof window !== "undefined") {
  const initWallet = () => {
    (window as any).Metasky = Metasky;
  };

  if (document.readyState === "complete") {
    initWallet();
  } else if ((window as any).attachEvent) {
    (window as any).attachEvent(`onload`, initWallet);
  } else {
    window.addEventListener(`load`, initWallet, false);
  }
}
