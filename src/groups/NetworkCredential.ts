import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type NetworkCredentials = {
  Credentials: NetworkCredential[];
};

export type NetworkCredential = {
  NetworkPath: string;
  Username: string;
};

export function getNetworkCredentials(ctx: WdpCtx): Promise<NetworkCredentials> {
  return wdpRequest(ctx, 'ext/networkcredential');
}

export async function addNetworkCredential(ctx: WdpCtx, networkPath: string, username: string, password: string): Promise<void> {
  await wdpRequest(ctx, 'ext/networkcredential', {
    method: 'POST',
    qs: {
      NetworkPath: networkPath,
    },
    json: {
      NetworkPath: networkPath,
      Username: username,
      Password: password,
    },
  });
}

export async function deleteNetworkCredential(ctx: WdpCtx, networkPath: string): Promise<void> {
  await wdpRequest(ctx, 'ext/networkcredential', {
    method: 'DELETE',
    qs: {
      NetworkPath: networkPath,
    },
  });
}
