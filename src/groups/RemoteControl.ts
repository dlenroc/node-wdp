import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export async function restart(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'api/control/restart', {
    method: 'POST',
  });
}

export async function shutdown(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'api/control/shutdown', {
    method: 'POST',
  });
}
