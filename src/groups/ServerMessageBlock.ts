import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type SmbCredentials = {
  Path: string;
  Username: string;
  Password: string;
};

export async function getSmbCredentials(ctx: WdpCtx): Promise<SmbCredentials> {
  return wdpRequest(ctx, 'ext/smb/developerfolder');
}
