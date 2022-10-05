import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type EtwEvents = {
  Events: EtwEvent[];
  Frequency: number;
};

export type EtwEvent = Record<string, string> & {
  Timestamp: number;
  ProviderName: string;
  ID: number;
  TaskName: string;
  Keyword: number;
  Level: number;
};

export type EtwProviders = {
  Providers: EtwProvider[];
};

export type EtwProvider = {
  GUID: string;
  Name: string;
};

export async function getEtwEvents(ctx: WdpCtx): Promise<EtwEvents> {
  return wdpRequest(ctx, 'api/etw/session/realtime');
}

export function getEtwProviders(ctx: WdpCtx): Promise<EtwProviders> {
  return wdpRequest(ctx, 'api/etw/providers');
}

export function getCustomEtwProviders(ctx: WdpCtx): Promise<EtwProviders> {
  return wdpRequest(ctx, 'api/etw/customproviders');
}
