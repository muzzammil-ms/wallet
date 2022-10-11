const WalletEventList = [
  "LOGIN_SUCCESS",
  "LOGOUT_SUCESS",
  "OPEN",
  "BEFORE_CLOSE",
] as const;

export type WalletEvent = typeof WalletEventList[number];

interface IBaseEvent {
  event: WalletEvent;
}

export interface ILoginEvent extends IBaseEvent {
  event: "LOGIN_SUCCESS";
  payload: {
    user: {};
    bearerToken: string;
  };
}

export interface ILogoutEvent extends IBaseEvent {
  event: "LOGOUT_SUCESS";
}

export interface IOpenEvent extends IBaseEvent {
  event: "OPEN";
}

export interface IBeforeCloseEvent extends IBaseEvent {
  event: "BEFORE_CLOSE";
}

export type WalletEventPayloadMap = {
  LOGIN_SUCCESS: ILoginEvent;
  LOGOUT_SUCESS: ILogoutEvent;
  OPEN: IOpenEvent;
  BEFORE_CLOSE: IBeforeCloseEvent;
};