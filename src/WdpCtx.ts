export type WdpCtx = {
  address: string;
  username?: string;
  password?: string;
  signal?: AbortSignal;
  implementations?: {
    fetch?: any;
    FormData?: any;
    WebSocket?: any;
  };
};
