import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type XboxInfo = {
  OsVersion: string;
  DevMode: string;
  OsEdition: string;
  ConsoleType: string;
  ConsoleId: string;
  DeviceId: string;
  SerialNumber: string;
  DevkitCertificateExpirationTime: number;
};

export type OSInfo = {
  ComputerName: string;
  Language: string;
  OsEdition: string;
  OsEditionId: number;
  OsVersion: string;
  Platform: string;
};

export type DeviceFamily = {
  DeviceType: string;
};

export type ComputerName = {
  ComputerName: string;
};

export async function setComputerName(ctx: WdpCtx, name: string): Promise<void> {
  await wdpRequest(ctx, 'api/os/machinename', {
    method: 'POST',
    qs: {
      name: btoa(name),
    },
  });
}

export function getComputerName(ctx: WdpCtx): Promise<ComputerName> {
  return wdpRequest(ctx, 'api/os/machinename');
}

export async function getXboxInfo(ctx: WdpCtx): Promise<XboxInfo> {
  return wdpRequest(ctx, 'ext/xbox/info');
}

export function getOsInfo(ctx: WdpCtx): Promise<OSInfo> {
  return wdpRequest(ctx, 'api/os/info');
}

export function getDeviceFamily(ctx: WdpCtx): Promise<DeviceFamily> {
  return wdpRequest(ctx, 'api/os/devicefamily');
}
