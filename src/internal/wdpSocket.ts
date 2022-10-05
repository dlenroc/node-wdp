import type { WdpCtx } from '../WdpCtx.js';
import { WdpError } from '../WdpError.js';

export function wdpSocket(ctx: WdpCtx, path: string, options?: { timeout?: number }): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    let finished = false;
    const timeout = setTimeout(onTimeout, options?.timeout || 5000);

    const url = new URL(ctx.address);
    url.username = ctx.username || '';
    url.password = ctx.password || '';
    if (!url.pathname.endsWith('/')) url.pathname += '/';
    url.pathname += path;
    url.protocol = 'wss:';

    /// @ts-ignore
    const socket = new (ctx.implementations?.WebSocket || globalThis.WebSocket)(url, [], { headers: { Origin: ctx.address } });
    socket.addEventListener('close', onClose);
    socket.addEventListener('error', onClose);
    socket.addEventListener('open', onOpen);

    function onClose() {
      finished = true;
      clearTimeout(timeout);
      reject(new WdpError({ Code: 500, Reason: 'Connection closed unexpectedly' }));
    }

    function onTimeout() {
      finished = true;
      socket.removeEventListener('close', onClose);
      socket.removeEventListener('error', onClose);
      reject(new WdpError({ Code: 504, Reason: `Connection timeout exceeded` }));
    }

    function onOpen() {
      if (finished) {
        socket.close();
        return;
      }

      finished = true;
      clearTimeout(timeout);
      socket.removeEventListener('close', onClose);
      socket.removeEventListener('error', onClose);
      resolve(socket);
    }
  });
}
