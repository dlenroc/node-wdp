import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type FeatureCategories = {
  FeatureCategories: FeatureCategory[];
};

export type FeatureCategory = any;

export function getFeatures(ctx: WdpCtx): Promise<FeatureCategories> {
  return wdpRequest(ctx, 'api/featuremanager/features');
}

export async function setFeatureState(ctx: WdpCtx, id: string, state: boolean): Promise<void> {
  await wdpRequest(ctx, 'api/featuremanager/features/state', {
    method: 'POST',
    qs: {
      fid: id,
      isEnabled: state,
    },
  });
}
