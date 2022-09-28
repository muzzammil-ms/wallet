const WalletEventList = ["LOGIN", "LOGOUT", "OPEN", "BEFORE_CLOSE"] as const;

export type WalletEvent = typeof WalletEventList[number];

interface IBaseEvent {
  event: WalletEvent;
}

export interface ILoginEvent extends IBaseEvent {
  event: "LOGIN";
  payload: {
    user: {};
    bearerToken: string;
  };
}

export interface ILogoutEvent extends IBaseEvent {
  event: "LOGOUT";
}

export interface IOpenEvent extends IBaseEvent {
  event: "OPEN";
}

export interface IBeforeCloseEvent extends IBaseEvent {
  event: "BEFORE_CLOSE";
}

export type WalletEventPayloadMap = {
  LOGIN: ILoginEvent;
  LOGOUT: ILogoutEvent;
  OPEN: IOpenEvent;
  BEFORE_CLOSE: IBeforeCloseEvent;
};
