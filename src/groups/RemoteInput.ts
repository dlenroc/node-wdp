import { wdpRequest } from '../internal/wdpRequest.js';
import { wdpSocket } from '../internal/wdpSocket.js';
import type { WdpCtx } from '../WdpCtx.js';
import { WdpError } from '../WdpError.js';

export type PhysicalControllers = {
  ConnectedControllerCount: number;
};

export type RemoteInput = {
  clearAll(): void;
  keyCodeDown(code: number): void;
  keyCodeUp(code: number): void;
  scanCodeDown(code: number): void;
  scanCodeUp(code: number): void;
  move(x: number, y: number): void;
  leftDown(x: number, y: number): void;
  leftUp(x: number, y: number): void;
  rightDown(x: number, y: number): void;
  rightUp(x: number, y: number): void;
  middleDown(x: number, y: number): void;
  middleUp(x: number, y: number): void;
  x1Down(x: number, y: number): void;
  x1Up(x: number, y: number): void;
  x2Down(x: number, y: number): void;
  x2Up(x: number, y: number): void;
  verticalWheelMove(x: number, y: number, delta: number): void;
  horizontalWheelMove(x: number, y: number, delta: number): void;
  disconnect(): void;
};

export function getPhysicalControllers(ctx: WdpCtx): Promise<PhysicalControllers> {
  return wdpRequest(ctx, 'ext/remoteinput/controllers');
}

export async function disconnectPhysicalControllers(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'ext/remoteinput/controllers?source=', {
    method: 'DELETE',
  });
}

export async function getRemoteInput(ctx: WdpCtx, options?: { timeout?: number }): Promise<RemoteInput> {
  const socket = await wdpSocket(ctx, 'ext/remoteinput', options);

  function send(data: ArrayBuffer) {
    if (socket.readyState !== socket.OPEN) {
      throw new WdpError({ Reason: 'Commands are no longer accepted', Code: 409 });
    }

    socket.send(data);
  }

  function sendClearAllEvent() {
    const buffer = new Uint8Array(1);
    buffer[0] = 0x04;
    send(buffer);
  }

  function sendKeyboardEvent(input: number, action: number, code: number) {
    const buffer = new Uint8Array(3);
    buffer[0] = input;
    buffer[1] = code;
    buffer[2] = action;
    send(buffer);
  }

  function sendMouseEvent(action: number, x: number, y: number, delta: number) {
    const buffer = new ArrayBuffer(15);
    const dataView = new DataView(buffer);
    dataView.setUint8(0, 0x03);
    dataView.setUint16(1, action)
    dataView.setUint32(3, Math.trunc((x * 65535) / 100))
    dataView.setUint32(7, Math.trunc((y * 65535) / 100))
    dataView.setUint32(11, delta);
    send(buffer);
  }

  return {
    clearAll() {
      sendClearAllEvent();
    },
    keyCodeDown(code: number) {
      sendKeyboardEvent(0x01, 0x01, code);
    },
    keyCodeUp(code: number) {
      sendKeyboardEvent(0x01, 0x00, code);
    },
    scanCodeDown(code: number) {
      sendKeyboardEvent(0x02, 0x01, code);
    },
    scanCodeUp(code: number) {
      sendKeyboardEvent(0x02, 0x00, code);
    },
    move(x: number, y: number) {
      sendMouseEvent(0x0001, x, y, 0);
    },
    leftDown(x: number, y: number) {
      sendMouseEvent(0x0002, x, y, 0);
    },
    leftUp(x: number, y: number) {
      sendMouseEvent(0x0004, x, y, 0);
    },
    rightDown(x: number, y: number) {
      sendMouseEvent(0x0008, x, y, 0);
    },
    rightUp(x: number, y: number) {
      sendMouseEvent(0x0010, x, y, 0);
    },
    middleDown(x: number, y: number) {
      sendMouseEvent(0x0020, x, y, 0);
    },
    middleUp(x: number, y: number) {
      sendMouseEvent(0x0040, x, y, 0);
    },
    x1Down(x: number, y: number) {
      sendMouseEvent(0x0080, x, y, 0);
    },
    x1Up(x: number, y: number) {
      sendMouseEvent(0x0100, x, y, 0);
    },
    x2Down(x: number, y: number) {
      sendMouseEvent(0x0200, x, y, 0);
    },
    x2Up(x: number, y: number) {
      sendMouseEvent(0x0400, x, y, 0);
    },
    verticalWheelMove(x: number, y: number, delta: number) {
      sendMouseEvent(0x0800, x, y, delta);
    },
    horizontalWheelMove(x: number, y: number, delta: number) {
      sendMouseEvent(0x1000, x, y, delta);
    },
    disconnect() {
      socket.close();
    },
  };
}
