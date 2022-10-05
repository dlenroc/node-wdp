import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type AppCrashDumps = {
  CrashDumps: AppCrashDump[];
};

export type AppCrashDump = {
  FileDate: string;
  FileName: string;
  FileSize: number;
  PackageFullName: string;
};

export type AppCrashDumpSettings = {
  CrashDumpEnabled: boolean;
};

export type DumpFiles = {
  DumpFiles: DumpFile[];
};

export type DumpFile = {
  FileName: string;
  FileSize: number;
};

export type DumpSetting = {
  autoreboot: number;
  dumptype: number;
  maxdumpcount: number;
  overwrite: number;
};

export function getCrashDumps(ctx: WdpCtx): Promise<AppCrashDumps> {
  return wdpRequest(ctx, 'api/debug/dump/usermode/dumps');
}

export function getCrashDumpControlSettings(ctx: WdpCtx, packageFullName: string): Promise<AppCrashDumpSettings> {
  return wdpRequest(ctx, 'api/debug/dump/usermode/crashcontrol', {
    qs: {
      packageFullName,
    },
  });
}

export async function setCrashDumpControlSettings(ctx: WdpCtx, packageFullName: string, enable: boolean): Promise<void> {
  await wdpRequest(ctx, 'api/debug/dump/usermode/crashcontrol', {
    method: enable ? 'POST' : 'DELETE',
    qs: {
      packageFullName,
    },
  });
}

export async function getCrashDump(ctx: WdpCtx, packageFullName: string, fileName: string): Promise<Blob> {
  return wdpRequest(ctx, 'api/debug/dump/usermode/crashdump', {
    qs: {
      packageFullName,
      fileName,
    },
  });
}

export async function deleteCrashDump(ctx: WdpCtx, packageFullName: string, fileName: string): Promise<void> {
  await wdpRequest(ctx, 'api/debug/dump/usermode/crashdump', {
    method: 'DELETE',
    qs: {
      packageFullName,
      fileName,
    },
  });
}

export async function getProcessDump(ctx: WdpCtx, pid: number): Promise<Blob> {
  return wdpRequest(ctx, 'api/debug/dump/usermode/live', {
    qs: {
      pid,
    },
  });
}

export async function getKernelDump(ctx: WdpCtx): Promise<Blob> {
  return wdpRequest(ctx, 'api/debug/dump/livekernel');
}

export function getBugCheckDumps(ctx: WdpCtx): Promise<DumpFiles> {
  return wdpRequest(ctx, 'api/debug/dump/kernel/dumplist');
}

export function getBugCheckDump(ctx: WdpCtx, filename: string): Promise<Blob> {
  return wdpRequest(ctx, 'api/debug/dump/kernel/dump', {
    qs: {
      filename,
    },
  });
}

export function getCrashControlSettings(ctx: WdpCtx): Promise<DumpSetting> {
  return wdpRequest(ctx, 'api/debug/dump/kernel/crashcontrol');
}

export function setCrashControlSettings(ctx: WdpCtx, settings: DumpSetting): Promise<DumpSetting> {
  return wdpRequest(ctx, 'api/debug/dump/kernel/crashcontrol', {
    method: 'POST',
    qs: settings,
  });
}
