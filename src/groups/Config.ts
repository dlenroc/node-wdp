import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export function getSSLCertificate(ctx: WdpCtx): Promise<Blob> {
  return wdpRequest(ctx, 'config/rootcertificate');
}
