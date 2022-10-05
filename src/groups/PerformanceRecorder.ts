import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type WprTraceState = {
  SessionType: string;
  State: string;
};

export type WprTraces = {
  Items: WprTrace[];
};

export type WprTrace = {
  CurrentDir: string;
  DateCreated: number;
  FileSize: number;
  Id: string;
  Name: string;
  SubPath: string;
  Type: number;
};

export function startCustomWprTrace(ctx: WdpCtx, name: string, content: Blob): Promise<WprTraceState> {
  return wdpRequest(ctx, 'api/wpr/customtrace', {
    method: 'POST',
    form: {
      [name]: content,
    },
  });
}

export function startCustomWprBootTrace(ctx: WdpCtx, name: string, content: Blob): Promise<WprTraceState> {
  return wdpRequest(ctx, 'api/wpr/customboottrace', {
    method: 'POST',
    form: {
      [name]: content,
    },
  });
}

export function startWprTrace(ctx: WdpCtx, profile: string): Promise<WprTraceState> {
  return wdpRequest(ctx, 'api/wpr/trace', {
    method: 'POST',
    qs: {
      profile,
    },
  });
}

export function startWprBootTrace(ctx: WdpCtx, profile: string): Promise<WprTraceState> {
  return wdpRequest(ctx, 'api/wpr/boottrace', {
    method: 'POST',
    qs: {
      profile,
    },
  });
}

export async function stopWprTrace(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'api/wpr/trace');
}

export async function stopWprBootTrace(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'api/wpr/boottrace');
}

export function getWprTraceState(ctx: WdpCtx): Promise<WprTraceState> {
  return wdpRequest(ctx, 'api/wpr/status');
}

export function getWprTraces(ctx: WdpCtx): Promise<WprTraces> {
  return wdpRequest(ctx, 'api/wpr/tracefiles');
}

export async function getWprTrace(ctx: WdpCtx, filename: string): Promise<Blob> {
  return wdpRequest(ctx, 'api/wpr/tracefile', {
    qs: {
      filename,
    },
  });
}

export async function deleteWprTrace(ctx: WdpCtx, filename: string): Promise<void> {
  await wdpRequest(ctx, 'api/wpr/tracefile', {
    method: 'DELETE',
    qs: {
      filename,
    },
  });
}
