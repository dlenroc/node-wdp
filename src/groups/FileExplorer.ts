import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type KnownFolders = {
  KnownFolders: string[];
};

export type KnownFolderFiles = {
  Items: {
    CurrentDir: string;
    DateCreated: number;
    Id: string;
    Name: string;
    SubPath: string;
    Type: number;
    FileSize: number;
  }[];
};

export function getKnownFolders(ctx: WdpCtx): Promise<KnownFolders> {
  return wdpRequest(ctx, 'api/filesystem/apps/knownfolders');
}

export function getFiles(ctx: WdpCtx, knownFolderId: string, options?: { packageFullName?: string; path?: string }): Promise<KnownFolderFiles> {
  return wdpRequest(ctx, 'api/filesystem/apps/files', {
    qs: {
      knownfolderid: knownFolderId,
      packagefullname: options?.packageFullName || '',
      path: options?.path || '',
    },
  });
}

export async function deleteFile(ctx: WdpCtx, knownFolderId: string, filename: string, options: { packageFullName?: string; path?: string }): Promise<void> {
  await wdpRequest(ctx, 'api/filesystem/apps/file', {
    method: 'DELETE',
    qs: {
      knownfolderid: knownFolderId,
      filename,
      ...(options.packageFullName && { packagefullname: options.packageFullName }),
      ...(options.path && { path: options.path }),
    },
  });
}

export async function renameFile(ctx: WdpCtx, knownFolderId: string, filename: string, newFilename: string, options: { packageFullName?: string; path?: string }): Promise<void> {
  await wdpRequest(ctx, 'api/filesystem/apps/rename', {
    method: 'POST',
    qs: {
      knownfolderid: knownFolderId,
      filename: filename,
      newfilename: newFilename,
      ...(options.packageFullName && { packagefullname: options.packageFullName }),
      ...(options.path && { path: options.path }),
    },
  });
}

export async function createFolder(ctx: WdpCtx, knownFolderId: string, newFolderName: string, options: { packageFullName?: string; path?: string }): Promise<void> {
  await wdpRequest(ctx, 'api/filesystem/apps/folder', {
    method: 'POST',
    qs: {
      knownfolderid: knownFolderId,
      newfoldername: newFolderName,
      ...(options.packageFullName && { packagefullname: options.packageFullName }),
      ...(options.path && { path: options.path }),
    },
  });
}

export function getFile(ctx: WdpCtx, knownFolderId: string, filename: string, options?: { packageFullName?: string; path?: string }): Promise<Blob> {
  return wdpRequest(ctx, 'api/filesystem/apps/file', {
    qs: {
      knownfolderid: knownFolderId,
      filename,
      packagefullname: options?.packageFullName || '',
      path: options?.path || '',
    },
  });
}

export async function uploadFiles(ctx: WdpCtx, knownFolderId: string, files: Record<string, Blob>, options: { packageFullName?: string; path?: string; extract?: boolean }): Promise<void> {
  await wdpRequest(ctx, 'api/filesystem/apps/file', {
    method: 'POST',
    form: files,
    qs: {
      knownfolderid: knownFolderId,
      ...(options.packageFullName && { packagefullname: options.packageFullName }),
      ...(options.path && { path: options.path }),
      ...(options.extract && { path: options.extract }),
    },
  });
}
