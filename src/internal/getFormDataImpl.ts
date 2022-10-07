import type { WdpCtx } from '../WdpCtx';
import { WdpError } from '../WdpError';

export function getFormDataImpl(ctx: WdpCtx): any {
  // @ts-ignore
  const formDataImpl = ctx.implementations?.FormData || (typeof FormData !== 'undefined' && FormData);
  if (!formDataImpl) {
    throw new WdpError({ Reason: 'Please provide "FormData" implementation', Code: 400 });
  }

  return formDataImpl;
}
