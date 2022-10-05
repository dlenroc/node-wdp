import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type LocationOverride = {
  Override: boolean;
};

export type Location = {
  Latitude: number;
  Longitude: number;
};

export function getLocationOverrideMode(ctx: WdpCtx): Promise<LocationOverride> {
  return wdpRequest(ctx, 'ext/location/override');
}

export function setLocationOverrideMode(ctx: WdpCtx, override: boolean): Promise<LocationOverride> {
  return wdpRequest(ctx, 'ext/location/override', {
    method: 'PUT',
    json: { Override: override },
  });
}

export function getLocation(ctx: WdpCtx): Promise<Location> {
  return wdpRequest(ctx, 'ext/location/position');
}

export function setLocation(ctx: WdpCtx, position: Location): Promise<Location> {
  return wdpRequest(ctx, 'ext/location/position', {
    method: 'PUT',
    json: position,
  });
}
