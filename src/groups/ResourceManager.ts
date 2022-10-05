import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';
import type { AppPackageVersion } from './AppDeployment.js';

export type Processes = {
  Processes: Process[];
};

export type Process = {
  CPUUsage: number;
  ImageName: string;
  PageFileUsage: number;
  PrivateWorkingSet: number;
  ProcessId: number;
  SessionId: number;
  TotalCommit: number;
  UserName: string;
  VirtualSize: number;
  WorkingSetSize: number;
  AppName?: string;
  IsRunning?: boolean;
  PackageFullName?: string;
  Publisher?: string;
  Version?: AppPackageVersion;
};

export type PerformanceStatistics = {
  AvailablePages: number;
  CommitLimit: number;
  CommittedPages: number;
  CpuLoad: number;
  IOOtherSpeed: number;
  IOReadSpeed: number;
  IOWriteSpeed: number;
  NonPagedPoolPages: number;
  PageSize: number;
  PagedPoolPages: number;
  TotalPages: number;
  GPUData: GpuData;
  NetworkingData: NetworkingData;
};

export type GpuData = {
  AvailableAdapters: GpuAdapterData[];
};

export type GpuAdapterData = {
  DedicatedMemory: number;
  DedicatedMemoryUsed: number;
  Description: string;
  SystemMemory: number;
  SystemMemoryUsed: number;
  EnginesUtilization: number[];
};

export type NetworkingData = {
  NetworkInBytes: number;
  NetworkOutBytes: number;
};

export function getProcesses(ctx: WdpCtx, options?: { containerId?: string }): Promise<Processes> {
  return wdpRequest(ctx, 'api/resourcemanager/processes', {
    qs: options,
  });
}

export function getSystemPerformanceStatistics(ctx: WdpCtx): Promise<PerformanceStatistics> {
  return wdpRequest(ctx, 'api/resourcemanager/systemperf');
}
