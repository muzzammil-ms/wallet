import Benefit from "./benefit";
import Session from "./session";
import NFT from "./nft";
import Collection from "./collection";
import { ILoginEvent, WalletEvent, WalletEventPayloadMap } from "./events";
import WalletUI, { WalletPermission, WalletPermissionConfig } from "./ui";

type WalletOptions = Partial<{
  client_id: string;
  permission: WalletPermissionConfig;
}>;

type EventOptions = {
  once?: boolean;
};

class Wallet {
  private client_id = "default";
  private session: Session;
  private eventHandlersMap: Map<
    WalletEvent,
    { options?: EventOptions; handler: Function }[]
  > = new Map();
  private ui: WalletUI;

  private handleEvent = (e: { event: WalletEvent; payload: any }) => {
    const registeredhandlers = this.eventHandlersMap.get(e.event) || [];
    registeredhandlers.forEach((handler) => {
      handler.handler(e.payload);
    });
    this.eventHandlersMap.set(
      e.event,
      registeredhandlers.filter((handler) => !handler.options?.once)
    );
  };

  constructor(options?: WalletOptions) {
    this.client_id = options?.client_id || "default";
    this.session = new Session();
    this.ui = new WalletUI(
      () => {
        this.handleEvent({ event: "BEFORE_CLOSE", payload: {} });
      },
      () => {
        this.handleEvent({ event: "OPEN", payload: {} });
      },
      options
    );
    if (typeof window !== "undefined") {
      this.on("LOGIN", (payload) => {
        this.session.onLogin(payload.payload.bearerToken);
      });
      this.on("LOGOUT", () => this.session.onLogout());
      window.addEventListener("message", (e) => {
        try {
          if (e.origin !== this.ui.baseUrl) return;
          const data = JSON.parse(e.data);
          this.handleEvent(data);
        } catch (error) {}
      });
    }
  }

  openWallet = (path?: string) => {
    this.ui.openWallet(path);
  };

  close = () => {
    this.ui.close();
  };

  /**
   * Opens wallet with autoclose on successsfull login operation.
   * No op if already loggedin.
   * @param options.forced Open wallet and force login user, even if user is
   * already loggedin in wallet. Autoclose after successfull login
   */
  login = async (options?: { forced: boolean }) => {
    const isLoginRequired = options?.forced || !this.session.isLoggedIn;
    if (!isLoginRequired) return;
    this.openWallet("/login");
    const onLoginSuccess = (data: ILoginEvent) => {
      this.close();
    };
    const onFrameClose = () => {
      this.off("LOGIN", onLoginSuccess);
    };
    this.on("LOGIN", onLoginSuccess, { once: true });
    this.on("BEFORE_CLOSE", onFrameClose, { once: true });
  };

  /**
   * Opens wallet in logout page
   * @param options.clearUserSessionOnly Deletes token from current browser
   * cache only. This will not logout user from wallet
   */
  logout = async (options?: { clearUserSessionOnly: boolean }) => {
    if (options?.clearUserSessionOnly) {
      this.session.onLogout();
      return;
    }
    this.openWallet("/logout");
  };

  benefit = (id: string): Benefit => {
    return new Benefit(id, this.session, this.ui);
  };

  nft = (id: string): NFT => {
    return new NFT(id, this.session, this.ui);
  };

  listCollections = (filters: any): Collection[] => {
    return [];
  };

  collection = (id: string) => {
    return new Collection(id, this.session, this.ui);
  };

  openMyNfts = () => {
    this.openWallet("/nfts-list/own");
  };

  /**
   *
   * @param whitelistId WhitelistId be uniquely shared with every client for
   * specific user case
   */
  whitelist = (whitelistId: string) => {
    this.openWallet(`/login?whitelist=true`);
  };

  on = <T extends WalletEvent>(
    eventName: T,
    handler: (data: WalletEventPayloadMap[T]) => void,
    options?: EventOptions
  ) => {
    const handlers = this.eventHandlersMap.get(eventName) || [];
    this.eventHandlersMap.set(eventName, [...handlers, { handler, options }]);
  };

  off = <T extends WalletEvent>(
    eventName: T,
    handler: (data: WalletEventPayloadMap[T]) => void
  ) => {
    const handlers = this.eventHandlersMap.get(eventName) || [];
    this.eventHandlersMap.set(
      eventName,
      handlers.filter((_handler) => _handler.handler !== handler)
    );
  };
}

if (typeof window !== "undefined") {
  const initWallet = () => {
    (window as any).Wallet = Wallet;
  };

  if (document.readyState === "complete") {
    initWallet();
  } else if ((window as any).attachEvent) {
    (window as any).attachEvent(`onload`, initWallet);
  } else {
    window.addEventListener(`load`, initWallet, false);
  }
}

export default Wallet;
