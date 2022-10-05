import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type BatteryState = {
  AcOnline: number;
  BatteryPresent: number;
  Charging: number;
  DefaultAlert1: number;
  DefaultAlert2: number;
  EstimatedTime: number;
  MaximumCapacity: number;
  RemainingCapacity: number;
};

export type ActivePowerScheme = {
  ActivePowerScheme: string;
};

export type PowerState = {
  LowPowerState?: boolean;
  LowPowerStateAvailable: boolean;
};

export type SleepStudyReports = {
  Reports: SleepStudyReport[];
};

export type SleepStudyReport = {
  FileName: string;
};

export type PowerConfig = any;

export function getPowerState(ctx: WdpCtx): Promise<PowerState> {
  return wdpRequest(ctx, 'api/power/state');
}

export function getBatteryState(ctx: WdpCtx): Promise<BatteryState> {
  return wdpRequest(ctx, 'api/power/battery');
}

export function getPowerConfig(ctx: WdpCtx, scheme: string): Promise<PowerConfig> {
  return wdpRequest(ctx, `api/power/cfg/${scheme}`);
}

export async function setPowerConfig(ctx: WdpCtx, scheme: string, valueAC: number, valueDC: number): Promise<void> {
  await wdpRequest(ctx, `api/power/cfg/${scheme}`, {
    method: 'POST',
    qs: {
      ValueAC: valueAC,
      ValueDC: valueDC,
    },
  });
}

export async function setPowerActiveScheme(ctx: WdpCtx, scheme: string): Promise<void> {
  await wdpRequest(ctx, 'api/power/activecfg', {
    method: 'POST',
    qs: { scheme },
  });
}

export function getPowerActiveScheme(ctx: WdpCtx): Promise<ActivePowerScheme> {
  return wdpRequest(ctx, 'api/power/activecfg');
}

export function getSleepStudyReports(ctx: WdpCtx): Promise<SleepStudyReports> {
  return wdpRequest(ctx, 'api/power/sleepstudy/reports');
}

export function getSleepStudyReport(ctx: WdpCtx, fileName: string): Promise<Blob> {
  return wdpRequest(ctx, 'api/power/sleepstudy/report', {
    qs: {
      FileName: btoa(fileName),
    },
  });
}

export function getSleepStudyTransform(ctx: WdpCtx): Promise<Blob> {
  return wdpRequest(ctx, 'api/power/sleepstudy/transform');
}
