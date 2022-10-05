import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type RegistryRootKeys = {
  RootKeys: RegistryKey[];
};

export type RegistrySubKeys = {
  SubKeys: RegistryKey[];
};

export type RegistryValues = {
  Values: RegistryValue[];
};

export type RegistryKey = {
  ChildCount: number;
  Name: string;
};

export type RegistryValue = {
  Type: string;
  Name: string;
  Data: string;
};

export function getRootKeys(ctx: WdpCtx, containerId?: string): Promise<RegistryRootKeys> {
  return wdpRequest(ctx, 'api/registryeditor/rootkeys', {
    qs: {
      ...(containerId && { containerId }),
    },
  });
}

export function getSubKeys(ctx: WdpCtx, rootKey: string, options?: { regKey?: string; containerId?: string }): Promise<RegistrySubKeys> {
  return wdpRequest(ctx, 'api/registryeditor/subkeys', {
    qs: {
      rootkey: rootKey,
      ...(options?.regKey && { regkey: options.regKey }),
      ...(options?.containerId && { containerId: options?.containerId }),
    },
  });
}

export function getRegValues(ctx: WdpCtx, rootKey: string, options?: { regKey?: string; containerId?: string }): Promise<RegistryValues> {
  return wdpRequest(ctx, 'api/registryeditor/values', {
    qs: {
      rootkey: rootKey,
      ...(options?.regKey && { regkey: options.regKey }),
      ...(options?.containerId && { containerId: options?.containerId }),
    },
  });
}
