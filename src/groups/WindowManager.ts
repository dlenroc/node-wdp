import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export function getWindows(ctx: WdpCtx, containerId?: string): Promise<any> {
  return wdpRequest(ctx, 'api/windowmanager/windows', {
    qs: {
      ...(containerId && { containerId }),
    },
  });
}
