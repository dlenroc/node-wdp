import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type Settings = {
  Settings: Setting[];
};

export type Setting = {
  Name: string;
  Value: string;
  RequiresReboot: 'Yes' | 'No';
  Disabled: 'Yes' | 'No';
  Category: string;
  Type: 'Text' | 'Number' | 'Select' | 'Bool';
  OptionsVariable?: 'Yes' | 'No';
  Options?: string[];
  Min?: number;
  Max?: number;
};

export function getSettings(ctx: WdpCtx): Promise<Settings> {
  return wdpRequest(ctx, 'ext/settings');
}

export async function getSetting(ctx: WdpCtx, name: string): Promise<Setting> {
  return wdpRequest(ctx, `ext/settings/${name}`);
}

export async function setSetting(ctx: WdpCtx, name: string, value: any): Promise<Setting> {
  return wdpRequest(ctx, `ext/settings/${name}`, {
    method: 'PUT',
    json: {
      Value: value,
    },
  });
}
