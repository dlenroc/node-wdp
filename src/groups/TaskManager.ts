import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export async function startApp(ctx: WdpCtx, appId: string, options?: { holographic?: boolean; packageFullName?: string }): Promise<void> {
  await wdpRequest(ctx, 'api/taskmanager/app', {
    method: 'POST',
    qs: {
      appid: btoa(appId),
      ...(options?.holographic && { screen: 'holographic' }),
      ...(options?.packageFullName && { package: btoa(options.packageFullName) }),
    },
  });
}

export async function stopApp(ctx: WdpCtx, packageFullName: string, force?: boolean): Promise<void> {
  await wdpRequest(ctx, 'api/taskmanager/app', {
    method: 'DELETE',
    qs: {
      package: btoa(packageFullName),
      ...(force && { forcestop: 'yes' }),
    },
  });
}

export async function suspendApp(ctx: WdpCtx, packageFullName: string): Promise<void> {
  await wdpRequest(ctx, 'api/taskmanager/app/state', {
    method: 'POST',
    qs: {
      package: btoa(packageFullName),
      state: 'suspend',
    },
  });
}

export async function resumeApp(ctx: WdpCtx, packageFullName: string): Promise<void> {
  await wdpRequest(ctx, 'api/taskmanager/app/state', {
    method: 'POST',
    qs: {
      package: btoa(packageFullName),
      state: 'resume',
    },
  });
}

export async function stopProcess(ctx: WdpCtx, pid: number, options?: { containerId?: string }): Promise<void> {
  await wdpRequest(ctx, 'api/taskmanager/process', {
    method: 'DELETE',
    qs: {
      pid,
      ...(options?.containerId && { containerId: options.containerId }),
    },
  });
}
