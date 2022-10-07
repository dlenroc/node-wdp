export type WdpCtx = {
  address: string;
  username?: string;
  password?: string;
  implementations?: {
    fetch?: any;
    FormData?: any;
    WebSocket?: any;
  };
};
