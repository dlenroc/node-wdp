import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type FiddlerTracingState = {
  IsProxyEnabled: boolean;
  ProxyAddress?: string;
  ProxyPort?: string;
};

export function getFiddlerTracingState(ctx: WdpCtx): Promise<FiddlerTracingState> {
  return wdpRequest(ctx, 'ext/fiddler');
}

export async function enableFiddler(ctx: WdpCtx, proxyAddress: string, proxyPort: number, cert?: Blob): Promise<void> {
  await wdpRequest(ctx, 'ext/fiddler', {
    method: 'POST',
    qs: {
      proxyAddress,
      proxyPort,
      updateCert: !!cert,
    },
    ...(cert && { form: { 'FiddlerRoot.cer': cert } }),
  });
}

export async function disableFiddler(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'ext/fiddler', {
    method: 'DELETE',
  });
}
