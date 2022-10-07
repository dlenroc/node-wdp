import type { WdpCtx } from '../WdpCtx';
import { WdpError } from '../WdpError';

export function getWebSocketImpl(ctx: WdpCtx): any {
  // @ts-ignore
  const webSocketImpl = ctx.implementations?.WebSocket || (typeof WebSocket !== 'undefined' && WebSocket);
  if (!webSocketImpl) {
    throw new WdpError({ Reason: 'Please provide "WebSocket" implementation', Code: 400 });
  }

  return webSocketImpl;
}
