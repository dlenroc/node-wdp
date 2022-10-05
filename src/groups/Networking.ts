import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type NetworkAdapters = {
  Adapters: NetworkAdapter[];
};

export type NetworkAdapter = {
  DDNSEnabled: string;
  Description: string;
  HardwareAddress: string;
  Index: number;
  Name: string;
  Type: string;
  DHCP: Dhcp;
  Gateways: IpAddress[];
  IpAddresses: IpAddress[];
};

export type Dhcp = {
  LeaseExpires: number;
  LeaseObtained: number;
  Address: IpAddress;
};

export type IpAddress = {
  IpAddress: string;
  Mask: string;
};

export function getIpConfig(ctx: WdpCtx): Promise<NetworkAdapters> {
  return wdpRequest(ctx, 'api/networking/ipconfig');
}

export async function setIpConfig(ctx: WdpCtx, guid: string, options?: { ipAddress?: string; subnetMask?: string; defaultGateway?: string; primaryDNS?: string; secondaryDNS?: string }): Promise<void> {
  await wdpRequest(ctx, 'api/networking/ipV4config', {
    method: 'PUT',
    json: {
      AdapterName: guid,
      ...(options?.ipAddress && { IPAddress: options.ipAddress }),
      ...(options?.subnetMask && { SubnetMask: options.subnetMask }),
      ...(options?.defaultGateway && { DefaultGateway: options.defaultGateway }),
      ...(options?.primaryDNS && { PrimaryDNS: options.primaryDNS }),
      ...(options?.secondaryDNS && { SecondaryDNS: options.secondaryDNS }),
    },
  });
}
