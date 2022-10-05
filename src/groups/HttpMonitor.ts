import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type HttpMonitorState = {
  Enabled: boolean;
};

export function getHttpMonitorState(ctx: WdpCtx): Promise<HttpMonitorState> {
  return wdpRequest(ctx, 'ext/httpmonitor/sessions');
}
