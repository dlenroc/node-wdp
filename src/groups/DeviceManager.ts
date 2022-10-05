import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type Devices = {
  DeviceList: Device[];
};

export type Device = {
  Class: string;
  Description: string;
  FriendlyName?: string;
  ID: string;
  Manufacturer: string;
  ParentID: string;
  ProblemCode: number;
  StatusCode: number;
};

export type UsbDevices = {
  DeviceList: UsbDevice[];
};

export type UsbDevice = {
  ID: string;
  ParentID: string;
  Description?: string;
  Manufacturer?: string;
  ProblemCode?: number;
  StatusCode?: number;
};

export function getDevices(ctx: WdpCtx): Promise<Devices> {
  return wdpRequest(ctx, 'api/devicemanager/devices');
}

export function getUsbDevices(ctx: WdpCtx): Promise<UsbDevices> {
  return wdpRequest(ctx, 'ext/devices/usbdevices');
}
