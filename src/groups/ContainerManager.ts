import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export function getContainers(ctx: WdpCtx): Promise<any> {
  return wdpRequest(ctx, 'api/containermanager/containers');
}
