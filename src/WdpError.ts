export class WdpError extends Error {
  constructor(response: { Reason?: string; CodeText?: string; Code?: number }) {
    super(response.Reason || response.CodeText || 'Unknown error has occurred');
    this.name = `WdpError(${response.Code ?? 500})`;
  }
}
