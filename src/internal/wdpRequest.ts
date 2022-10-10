import type { WdpCtx } from '../WdpCtx.js';
import { WdpError } from '../WdpError.js';
import { getFetchImpl } from './getFetchImpl.js';
import { getFormDataImpl } from './getFormDataImpl.js';

export async function wdpRequest(ctx: WdpCtx, path: string, options: { method?: string; qs?: undefined | Record<string, any>; form?: Record<string, any>; json?: any } = {}): Promise<any> {
  const response = await getFetchImpl(ctx)(`${ctx.address}/${path}${options.qs ? '?' + new URLSearchParams(options.qs) : ''}`, {
    headers: {
      ...((ctx.username || ctx.password) && { Authorization: 'Basic ' + btoa((ctx.username || '') + ':' + (ctx.password || '')) }),
      ...(options.json && { 'Content-Type': 'application/json' }),
    },
    ...(options.method && { method: options.method }),
    ...(options.json && { body: JSON.stringify(options.json) }),
    ...(options.form && { body: Object.entries(options.form).reduce((form, [name, value]) => (form.append(name, value, typeof value === 'object' ? name : undefined), form), new (getFormDataImpl(ctx))()) }),
  });

  const isJson = !!response.headers.get('Content-Type')?.includes('json') == true && Number(response.headers.get('content-length')) > 0;
  const result = isJson ? await response.json() : await response.blob();

  if (!response.ok) {
    throw new WdpError({ ...result, Code: response.status });
  }

  return result;
}
