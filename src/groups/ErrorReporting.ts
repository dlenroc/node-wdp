import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type WerReports = {
  WerReports: WerReport[];
};

export type WerReport = {
  User: string;
  Reports: WerReportInfo[];
};

export type WerReportInfo = {
  CreationTime: number;
  Name: string;
  Type: string;
};

export type WerReportFiles = {
  Files: WerReportFile[];
};

export type WerReportFile = {
  Name: string;
  Size: number;
};

export function getWerReports(ctx: WdpCtx): Promise<WerReports> {
  return wdpRequest(ctx, 'api/wer/reports');
}

export function getWerReportFiles(ctx: WdpCtx, user: string, type: string, name: string): Promise<WerReportFiles> {
  return wdpRequest(ctx, 'api/wer/report/files', {
    qs: {
      user,
      type,
      name: btoa(name),
    },
  });
}

export function getWerReportFile(ctx: WdpCtx, user: string, type: string, name: string, file: string): Promise<Blob> {
  return wdpRequest(ctx, 'api/wer/report/file', {
    qs: {
      user,
      type,
      name: btoa(name),
      file: btoa(file),
    },
  });
}
