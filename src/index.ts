import Benefit from "./benefit";
import Session from "./session";
import NFT from "./nft";
import Collection from "./collection";
import { ILoginEvent, WalletEvent, WalletEventPayloadMap } from "./events";

type WalletPermissionConfig = Partial<{
  "clipboard-read": boolean;
  "clipboard-write": boolean;
  camera: boolean;
  microphone: boolean;
}>;

type WalletPermission = keyof WalletPermissionConfig;

type WalletOptions = Partial<{
  client_id: string;
  permission: WalletPermissionConfig;
}>;

type EventOptions = {
  once?: boolean;
};

class Wallet {
  private readonly baseUrl = "https://wallet.metasky.me";
  private client_id = "default";
  private portalId = ``;
  private iframeId = ``;
  private walletPermissions: WalletPermissionConfig;
  private session: Session;
  private eventHandlersMap: Map<
    WalletEvent,
    { options?: EventOptions; handler: Function }[]
  > = new Map();

  private generateRandomnString = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  private generatePortalId = () => {
    return `skywallet-${this.generateRandomnString(10)}`;
  };

  private injectPortal = () => {
    const elem = document.getElementById(this.portalId);
    if (elem) return;
    // Start injecting iframe
    const style = document.createElement("style");
    style.innerHTML = `
            #${this.portalId} .close-container {
                min-width: 315px;
                max-width: 428px;
                width: 100%;
                position: fixed;
                left: 50%;
                right: 50%;
                transform: translateX(-50%);
                -webkit-box-align: center;
                align-items: center;
                -webkit-box-pack: end;
                justify-content: flex-end;
                background-color: rgb(204, 213, 236);
                z-index: 100;
                height: 40px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(46, 54, 72);
                cursor: pointer;
                display: flex !important;
            }
            #${this.portalId} .close-icon {
                width: 20px;
                height: 20px;
                padding: 0px;
                margin: 10px;
                pointer-events: all;
                color: black;
                font-size: 12px;
                font-weight: 600;
                z-index: 9;
                background-color: rgb(253, 215, 63);
                border: 0px;
                cursor: pointer;
                border-radius: 100% !important;
            }
            #${this.portalId} .iframe {
                height: 926px;
                max-width: 428px;
                min-width: 375px;
                width: 100%;
                position: fixed;
                left: 50%;
                right: 50%;
                -webkit-transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                transform: translateX(-50%);
                z-index: 99;
                background-color: #e6eaf0;
                padding-top: 2.5rem;
                max-height: 90vh;        
            }
            @media (max-width: 429px) {
                #${this.portalId} .iframe {
                    height: 100%;
                    max-height: 100vh;  
                }
            }
            #${this.portalId} .overlay {
                position: fixed;
                display: block;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 90;
                cursor: pointer;
                -webkit-backdrop-filter: blur(20px);
                backdrop-filter: blur(20px);
            }
            #${this.portalId} {
                display: none;
                position: fixed;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 88;        
            }
        `;
    document.head.appendChild(style);
    /**
     * Create Portal
     */
    const portal = document.createElement("div");
    portal.setAttribute("id", this.portalId);
    /**
     * Create Iframe
     */
    const iframe = document.createElement(`iframe`);
    iframe.setAttribute("src", "");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowFullScreen", "true");
    iframe.setAttribute(
      "allow",
      Object.keys(this.walletPermissions)
        .filter((k) => this.walletPermissions[k as WalletPermission])
        .join(";")
    );
    iframe.setAttribute("class", `iframe`);
    iframe.setAttribute("id", this.iframeId);
    /**
     * Overlay
     */
    const overlay = document.createElement("div");
    overlay.setAttribute("class", `overlay`);
    /**
     * Close Container
     */
    const closeContainer = document.createElement("div");
    closeContainer.setAttribute("class", `close-container`);
    closeContainer.onclick = this.close;
    const closeText = document.createElement("span");
    closeText.innerHTML = "Close";
    const cross = document.createElement("button");
    cross.innerHTML = "X";
    cross.setAttribute("class", "close-icon");

    /**
     * Constructing the integration structure
     */
    closeContainer.appendChild(closeText);
    closeContainer.appendChild(cross);
    portal.appendChild(closeContainer);
    portal.appendChild(iframe);
    portal.appendChild(overlay);
    document.body.appendChild(portal);
  };

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
    this.walletPermissions = {
      ...{
        camera: true,
        "clipboard-read": true,
        "clipboard-write": true,
        microphone: true,
      },
      ...(options?.permission || {}),
    };
    this.portalId = this.generatePortalId();
    this.iframeId = `${this.portalId}-iframe`;
    this.session = new Session(this.iframeId);
    if (typeof window !== "undefined") {
      this.on("LOGIN", (payload) =>
        this.session.onLogin(payload.payload.bearerToken)
      );
      this.on("LOGOUT", () => this.session.onLogout());
      window.addEventListener("message", (e) => {
        try {
          const data = JSON.parse(e.data);
          this.handleEvent(data);
        } catch (error) {}
      });
      this.injectPortal();
    }
  }

  /**
   * Opens wallet in default page. Login flow will be triggered if user is not loggedin
   */
  openWallet = (path?: string) => {
    document
      .getElementById(this.iframeId)
      ?.setAttribute("src", `${this.baseUrl}/${path}`);
    document
      .getElementById(this.portalId)
      ?.setAttribute("style", "display: block;");
  };

  close = () => {
    document.getElementById(this.iframeId)?.setAttribute("src", ``);
    document.getElementById(this.portalId)?.setAttribute("style", ``);
    this.handleEvent({ event: "BEFORE_CLOSE", payload: {} });
  };

  /**
   * Opens wallet with autoclose on successsfull login operation.
   * No op if already loggedin.
   * @param options.forced Open wallet and force login user, even if user is
   * already loggedin in wallet. Autoclose after successfull login
   */
  login = async (options?: { forced: boolean }) => {
    const isLoginRequired = options?.forced || !this.session.isLoggedIn;
    if (isLoginRequired) {
      this.openWallet("/login");
      const onLoginSuccess = (data: ILoginEvent) => {
        this.close();
      };
      const onFrameClose = () => {
        this.off("LOGIN", onLoginSuccess);
      };
      this.on("LOGIN", onLoginSuccess, { once: true });
      this.on("BEFORE_CLOSE", onFrameClose, { once: true });
    }
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

  benefit = (benefitId: string): Benefit => {
    return new Benefit(benefitId, this.session, this.baseUrl);
  };

  nft = (nftId: string): NFT => {
    return new NFT(nftId, this.session, this.baseUrl);
  };

  listCollections = (filters: any): Collection[] => {
    return [];
  };

  collection = (id: string) => {
    return new Collection("", this.session, this.baseUrl);
  };

  openMyNfts = () => {};

  /**
   *
   * @param whitelistId WhitelistId be uniquely shared with every client for
   * specific user case
   */
  whitelist = (whitelistId: string) => {};

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
