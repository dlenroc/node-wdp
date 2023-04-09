import type { WdpCtx } from '../WdpCtx.js';
import { WdpError } from '../WdpError.js';
import { getWebSocketImpl } from './getWebSocketImpl';

export function wdpSocket(ctx: WdpCtx, path: string, options?: { timeout?: number }): Promise<any> {
  return new Promise((resolve, reject) => {
    const signal = ctx.signal;
    if (signal?.aborted) {
      reject(signal.reason);
    }

    let finished = false;
    const timeout = setTimeout(onTimeout, options?.timeout || 5000);

    const url = new URL(ctx.address);
    url.username = ctx.username || '';
    url.password = ctx.password || '';
    if (!url.pathname.endsWith('/')) url.pathname += '/';
    url.pathname += path;
    url.protocol = 'wss:';

    /// @ts-ignore
    const socket = new (getWebSocketImpl(ctx))(url, [], { headers: { Origin: ctx.address } });
    socket.addEventListener('close', onClose);
    socket.addEventListener('error', onClose);
    socket.addEventListener('open', onOpen);
    signal?.addEventListener('abort', onAbort);

    function onAbort() {
      reject(signal?.reason);
      onClose();
    }

    function onTimeout() {
      reject(new WdpError({ Code: 504, Reason: `Connection timeout exceeded` }));
      onClose();
    }

    function onClose() {;
      finished = true;
      clearTimeout(timeout);
      socket.removeEventListener('close', onClose);
      socket.removeEventListener('error', onClose);
      socket.removeEventListener('open', onOpen);
      signal?.removeEventListener('abort', onAbort);

      if (socket.readyState === socket.OPEN) {
        socket.close();
      }

      reject(new WdpError({ Code: 500, Reason: 'Connection closed unexpectedly' }));
    }

    function onOpen() {
      if (finished) {
        return onClose();
      }

      finished = true;
      clearTimeout(timeout);
      socket.removeEventListener('open', onOpen);
      resolve(socket);
    }
  });
}
