import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export function getScreenshot(ctx: WdpCtx): Promise<Blob> {
  return wdpRequest(ctx, 'ext/screenshot', {
    qs: {
      download: true,
    },
  });
}
