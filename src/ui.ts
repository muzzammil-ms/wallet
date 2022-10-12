export type WalletPermissionConfig = Partial<{
  "clipboard-read": boolean;
  "clipboard-write": boolean;
  camera: boolean;
  microphone: boolean;
}>;

export type WalletPermission = keyof WalletPermissionConfig;

class WalletUI {
  public readonly baseUrl = "https://wallet.metasky.me";
  private portalId = ``;
  private iframeId = ``;
  private walletPermissions: WalletPermissionConfig;
  private onClose: Function;
  private onOpen: Function;

  static generateRandomnString = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  static generatePortalId = () => {
    return `skywallet-${WalletUI.generateRandomnString(10)}`;
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

  constructor(
    onClose: () => void,
    onOpen: () => void,
    options?: { permission?: WalletPermissionConfig }
  ) {
    this.onClose = onClose;
    this.onOpen = onOpen;
    this.walletPermissions = {
      ...{
        camera: true,
        "clipboard-read": true,
        "clipboard-write": true,
        microphone: true,
      },
      ...(options?.permission || {}),
    };
    this.portalId = WalletUI.generatePortalId();
    this.iframeId = `${this.portalId}-iframe`;
    if (typeof window !== "undefined") {
      this.injectPortal();
    }
  }

  /**
   * Opens wallet in default page. Login flow will be triggered if user is not loggedin
   */
  openWallet = (path = "") => {
    document
      .getElementById(this.iframeId)
      ?.setAttribute("src", `${this.baseUrl}${path}`);
    document
      .getElementById(this.portalId)
      ?.setAttribute("style", "display: block;");
    this.onOpen();
  };

  close = () => {
    document.getElementById(this.iframeId)?.setAttribute("src", ``);
    document.getElementById(this.portalId)?.setAttribute("style", ``);
    this.onClose();
  };
}

export default WalletUI;
