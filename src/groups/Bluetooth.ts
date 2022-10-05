import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type BluetoothRadios = {
  BluetoothRadios: BluetoothRadio[];
};

export type BluetoothRadio = {
  BluetoothAddress: number;
  DisplayName: string;
  HasUnknownUsbDevice: boolean;
  HasProblem: boolean;
  ID: string;
  ProblemCode: number;
  State: string;
};

export type PairedBluetoothDevices = {
  PairedDevices: PairedBluetoothDevice[];
};

export type PairedBluetoothDevice = AvailableBluetoothDevice & {
  AudioConnectionStatus: string;
};

export type AvailableBluetoothDevices = {
  AvailableDevices: AvailableBluetoothDevice[];
};

export type AvailableBluetoothDevice = {
  Name: string;
  ID: string;
};

export function getPairedBluetoothDevices(ctx: WdpCtx): Promise<PairedBluetoothDevices> {
  return wdpRequest(ctx, 'api/bt/getpaired');
}

export function getAvailableBluetoothDevices(ctx: WdpCtx): Promise<AvailableBluetoothDevices> {
  return wdpRequest(ctx, 'api/bt/getavailable');
}

export function getBluetoothRadios(ctx: WdpCtx): Promise<BluetoothRadios> {
  return wdpRequest(ctx, 'api/bt/getradios');
}

export function setBluetoothRadioState(ctx: WdpCtx, id: string, enable: boolean): Promise<void> {
  return wdpRequest(ctx, 'api/bt/setradio', {
    method: 'POST',
    qs: {
      ID: btoa(id),
      State: enable ? 'On' : 'Off',
    },
  });
}

export async function removeBluetoothDevice(ctx: WdpCtx, deviceId: string): Promise<void> {
  await wdpRequest(ctx, 'api/bt/unpair', {
    method: 'POST',
    qs: {
      deviceId: btoa(deviceId),
    },
  });
}

export async function disconnectBluetoothDevice(ctx: WdpCtx, deviceId: string): Promise<void> {
  await wdpRequest(ctx, 'api/bt/disconnectdevice', {
    method: 'POST',
    qs: {
      deviceId: btoa(deviceId),
    },
  });
}

export async function connectBluetoothDevice(ctx: WdpCtx, deviceId: string): Promise<void> {
  await wdpRequest(ctx, 'api/bt/connectdevice', {
    method: 'POST',
    qs: {
      deviceId: btoa(deviceId),
    },
  });
}
