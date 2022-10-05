import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type WifiInterfaces = {
  Enabled: boolean;
  Interfaces: WifiInterface[];
};

export type WifiInterface = {
  Description: string;
  GUID: string;
  Index: number;
  ProfilesList: WifiProfile[];
};

export type WifiProfile = {
  GroupPolicyProfile: boolean;
  Name: string;
  PerUserProfile: boolean;
};

export type WifiNetworks = {
  AvailableNetworks: WifiNetwork[];
};

export type WifiNetwork = {
  AlreadyConnected: boolean;
  AuthenticationAlgorithm: string;
  Channel: number;
  CipherAlgorithm: string;
  Connectable: number;
  InfrastructureType: string;
  ProfileAvailable: boolean;
  ProfileName: string;
  SSID: string;
  SecurityEnabled: number;
  SignalQuality: number;
  BSSID: number[];
  PhysicalTypes: string[];
};

export function getWirelessInterfaces(ctx: WdpCtx): Promise<WifiInterfaces> {
  return wdpRequest(ctx, 'api/wifi/interfaces');
}

export function getAvailableWirelessNetworks(ctx: WdpCtx, guid: string): Promise<WifiNetworks> {
  return wdpRequest(ctx, 'api/wifi/networks', {
    qs: {
      interface: guid,
    },
  });
}

export async function connectToNetwork(ctx: WdpCtx, guid: string, ssid: string, key: string, createProfile?: boolean): Promise<void> {
  await wdpRequest(ctx, 'api/wifi/network', {
    method: 'POST',
    qs: {
      op: 'connect',
      interface: guid,
      ssid: btoa(ssid),
      createprofile: createProfile ? 'yes' : 'no',
      ...(key && { key: btoa(key) }),
    },
  });
}

export async function connectToNetworkUsingProfile(ctx: WdpCtx, guid: string, profile: string): Promise<void> {
  await wdpRequest(ctx, 'api/wifi/network', {
    method: 'POST',
    qs: {
      interface: guid,
      profile: btoa(profile),
      op: 'connect',
    },
  });
}

export async function disconnectFromNetwork(ctx: WdpCtx, guid: string): Promise<void> {
  await wdpRequest(ctx, 'api/wifi/network', {
    method: 'POST',
    qs: {
      interface: guid,
      op: 'disconnect',
    },
  });
}

export async function deleteWifiProfile(ctx: WdpCtx, guid: string, profile: string): Promise<void> {
  await wdpRequest(ctx, 'api/wifi/profile', {
    method: 'DELETE',
    qs: {
      interface: guid,
      profile: btoa(profile),
    },
  });
}
