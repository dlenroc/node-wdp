import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type ServiceTags = {
  tags: string[];
};

export function getServiceTags(ctx: WdpCtx): Promise<ServiceTags> {
  return wdpRequest(ctx, 'api/dns-sd/tags');
}

export async function deleteAllServiceTags(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'api/dns-sd/tags', {
    method: 'DELETE',
  });
}

export async function addServiceTag(ctx: WdpCtx, tag: string): Promise<void> {
  await wdpRequest(ctx, 'api/dns-sd/tag', {
    method: 'POST',
    qs: {
      tagValue: tag,
    },
  });
}

export async function deleteServiceTag(ctx: WdpCtx, tag: string): Promise<void> {
  await wdpRequest(ctx, 'api/dns-sd/tag', {
    method: 'DELETE',
    qs: {
      tagValue: tag,
    },
  });
}
