import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type PluginTools = {
  Tools: PluginTool[];
};

export type PluginTool = any;

export type Workspaces = {
  Workspaces: Workspace[];
};

export type Workspace = any;

export type UniqueId = {
  UniqueId: string;
};

export function getPluginTools(ctx: WdpCtx): Promise<PluginTools> {
  return wdpRequest(ctx, 'core/tools');
}

export function getPluginWorkspaces(ctx: WdpCtx): Promise<Workspaces> {
  return wdpRequest(ctx, 'core/workspaces');
}

export function getUniqueId(ctx: WdpCtx): Promise<UniqueId> {
  return wdpRequest(ctx, 'core/uniqueId');
}
