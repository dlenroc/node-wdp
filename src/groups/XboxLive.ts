import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type XboxLiveSandbox = {
  Sandbox: string;
};

export function getXboxLiveSandbox(ctx: WdpCtx): Promise<XboxLiveSandbox> {
  return wdpRequest(ctx, 'ext/xboxlive/sandbox');
}

export function setXboxLiveSandbox(ctx: WdpCtx, sandbox: string): Promise<XboxLiveSandbox> {
  return wdpRequest(ctx, 'ext/xboxlive/sandbox', {
    method: 'PUT',
    json: {
      Sandbox: sandbox,
    },
  });
}
