export type WdpCtx = {
  address: string;
  username?: string;
  password?: string;
  implementations?: {
    fetch?: typeof fetch;
    FormData?: typeof FormData;
    WebSocket?: typeof WebSocket;
  };
};
