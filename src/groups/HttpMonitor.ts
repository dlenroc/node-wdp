import { wdpRequest } from '../internal/wdpRequest.js';
import { wdpSocket } from '../internal/wdpSocket.js';
import type { WdpCtx } from '../WdpCtx.js';
import { WdpError } from '../WdpError.js';

export type HttpMonitorState = {
  Enabled: boolean;
};

export type HttpExchange = {
  RequestHeaders: Record<string, string>;
  RequestContentHeaders: Record<string, string>;
  RequestURL: string;
  RequestMethod: string;
  RequestMessage: string;
  ResponseHeaders: Record<string, string>;
  ResponseContentHeaders: Record<string, string>;
  StatusCode: number;
  ReasonPhrase: string;
  ResponseMessage: string;
};

export type HttpMonitor = {
  enable(): void;
  disable(): void;
  disconnect(): void;
  on(name: 'raw', callback: (event: string) => void): void;
  on(name: 'exchange', callback: (event: HttpExchange) => void): void;
  off(name: 'raw' | 'exchange', callback: () => void): void;
};

export function getHttpMonitorState(ctx: WdpCtx): Promise<HttpMonitorState> {
  return wdpRequest(ctx, 'ext/httpmonitor/sessions');
}

export async function getHttpMonitor(ctx: WdpCtx): Promise<HttpMonitor> {
  const socket = await wdpSocket(ctx, 'ext/httpmonitor/sessions');

  const listeners = {
    raw: new Set<(event: string) => void>(),
    exchange: new Set<(event: HttpExchange) => void>(),
  };

  function assertState(): void {
    if (ctx.signal?.aborted) {
      throw ctx.signal.reason;
    }

    if (socket.readyState !== socket.OPEN) {
      throw new WdpError({ Reason: 'Commands are no longer accepted', Code: 409 });
    }
  }

  function getListeners(name: string): Set<any> {
    const set = (listeners as any)[name];
    if (!set) {
      throw new WdpError({
        Reason: `Event "${name}" is not one of the valid events: ${Object.keys(listeners).join(', ')}`,
        Code: 400,
      });
    }

    return set;
  }

  socket.addEventListener('message', (event: any) => {
    for (const listener of listeners.raw) {
      listener(event.data);
    }

    if (listeners.exchange.size) {
      const json = JSON.parse(event.data);
      if (Array.isArray(json.Sessions)) {
        for (const session of json.Sessions) {
          for (const listener of listeners.exchange) {
            listener(session);
          }
        }
      }
    }
  });

  return {
    disconnect() {
      assertState();
      socket.close();
    },
    enable() {
      assertState();
      socket.send('enable');
    },
    disable() {
      assertState();
      socket.send('disable');
    },
    on(name: string, callback: (event: any) => void) {
      assertState();
      getListeners(name).add(callback);
    },
    off(name: string, callback: () => void) {
      assertState();
      getListeners(name).delete(callback);
    },
  };
}
