import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';
import { WdpError } from '../WdpError.js';
import type { ActiveUser } from './UserInformation.js';

export type AppPackages = {
  HolographicAvailable: boolean;
  InstalledPackages: AppPackage[];
};

export type AppPackage = {
  AppListEntry?: number;
  CanUninstall: boolean;
  Name: string;
  PackageDisplayName: string;
  PackageFamilyName: string;
  PackageFullName: string;
  PackageOrigin: number;
  PackageRelativeId?: string;
  Publisher: string;
  UninstallDeniedReason?: string;
  Version: AppPackageVersion;
  RegisteredUsers: ActiveUser[];
};

export type AppPackageVersion = {
  Build: number;
  Major: number;
  Minor: number;
  Revision: number;
};

export type ContentGroups = {
  ContentGroups: any[];
};

export type NetworkAppPackages = {
  mainpackage: NetworkAppPackage;
  optionalpackages?: NetworkAppPackage[];
};

export type NetworkAppPackage = {
  networkshare: string;
  username?: string;
  password?: string;
};

export type InstallState = {
  InstallRunning: boolean;
};

export type AppDeployInfo = {
  DeployInfo: AppDeploy[];
};

export type AppDeploy = {
  PackageFullName: string;
  OverlayFolder: string;
  DeployType?: string;
  DeployPathOrSpecifiers?: string;
  DeployDrive?: string;
  DeploySizeInBytes?: number;
};

export function getInstalledAppPackages(ctx: WdpCtx, options?: { streamable?: boolean; includeframeworkpackages?: boolean }): Promise<AppPackages> {
  return wdpRequest(ctx, 'api/app/packagemanager/packages', {
    qs: options,
  });
}

export function getContentGroups(ctx: WdpCtx, packageFullName: string): Promise<ContentGroups> {
  return wdpRequest(ctx, 'api/app/packagemanager/contentgroups', {
    qs: {
      package: packageFullName,
    },
  });
}

export async function installApp(ctx: WdpCtx, name: string, content: Blob, extra?: Record<string, Blob>): Promise<void> {
  await wdpRequest(ctx, 'api/app/packagemanager/package', {
    method: 'POST',
    form: {
      [name]: content,
      ...extra,
    },
    qs: {
      package: name,
    },
  });
}

export async function installCertificate(ctx: WdpCtx, name: string, content: Blob): Promise<void> {
  await wdpRequest(ctx, 'api/app/packagemanager/certificate', {
    method: 'POST',
    form: {
      [name]: content,
    },
  });
}

export async function registerNetworkShareApp(ctx: WdpCtx, app: NetworkAppPackages): Promise<void> {
  await wdpRequest(ctx, 'api/app/packagemanager/networkapp', {
    method: 'POST',
    json: app,
  });
}

export async function getInstallationState(ctx: WdpCtx): Promise<InstallState> {
  const result = await wdpRequest(ctx, 'api/app/packagemanager/state');
  const state = { InstallRunning: !('Success' in result) };
  if (!state.InstallRunning && !result.Success) {
    throw new WdpError({ ...result, Code: 400 });
  }

  return state;
}

export async function uninstallAppPackage(ctx: WdpCtx, packageFullName: string): Promise<void> {
  await wdpRequest(ctx, 'api/app/packagemanager/package', {
    method: 'DELETE',
    qs: {
      package: packageFullName,
    },
  });
}

export async function registerLooseApp(ctx: WdpCtx, folder: string): Promise<void> {
  await wdpRequest(ctx, 'api/app/packagemanager/register', {
    method: 'POST',
    qs: {
      folder: btoa(folder),
    },
  });
}

export async function uploadLooseApp(ctx: WdpCtx, folder: string, files: Record<string, Blob>): Promise<void> {
  await wdpRequest(ctx, 'api/app/packagemanager/upload', {
    method: 'POST',
    form: files,
    qs: {
      destinationFolder: btoa(folder),
    },
  });
}

export async function pullInstallFromNetwork(ctx: WdpCtx, install: Record<string, any>): Promise<void> {
  await wdpRequest(ctx, 'api/app/packagemanager/pullinstall', {
    method: 'POST',
    json: install,
  });
}

export async function deleteSshPins(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'ext/app/sshpins', {
    method: 'DELETE',
  });
}

export async function getDeployInfo(ctx: WdpCtx, packageFullName: string, overlayFolder?: string): Promise<AppDeployInfo> {
  return wdpRequest(ctx, 'ext/app/deployinfo', {
    method: 'POST',
    json: {
      DeployInfo: [
        {
          PackageFullName: packageFullName,
          ...(overlayFolder && { OverlayFolder: overlayFolder }),
        },
      ],
    },
  });
}
