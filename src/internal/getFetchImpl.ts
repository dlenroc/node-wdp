import type { WdpCtx } from '../WdpCtx';
import { WdpError } from '../WdpError';

export function getFetchImpl(ctx: WdpCtx): any {
  // @ts-ignore
  const fetchImpl = ctx.implementations?.fetch || (typeof fetch !== 'undefined' && fetch);
  if (!fetchImpl) {
    throw new WdpError({ Reason: 'Please provide "fetch" implementation', Code: 400 });
  }

  return fetchImpl;
}
