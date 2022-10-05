import { wdpRequest } from '../internal/wdpRequest.js';
import { wdpSocket } from '../internal/wdpSocket.js';
import type { WdpCtx } from '../WdpCtx.js';
import { WdpError } from '../WdpError.js';

export type PhysicalControllers = {
  ConnectedControllerCount: number;
};

export function getPhysicalControllers(ctx: WdpCtx): Promise<PhysicalControllers> {
  return wdpRequest(ctx, 'ext/remoteinput/controllers');
}

export async function disconnectPhysicalControllers(ctx: WdpCtx): Promise<void> {
  await wdpRequest(ctx, 'ext/remoteinput/controllers?source=', {
    method: 'DELETE',
  });
}

export async function getRemoteInput(ctx: WdpCtx) {
  const socket = await wdpSocket(ctx, 'ext/remoteinput');

  function send(data: Uint8Array) {
    if (socket.readyState !== socket.OPEN) {
      throw new WdpError({
        Reason: 'Connection to the device is closed, so commands are no longer accepted',
      });
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
    const buffer = new Uint8Array(15);
    buffer[0] = 0x03;

    const aBytes = new Uint8Array(new Uint16Array([action]).buffer);
    buffer[1] = aBytes[1] || 0;
    buffer[2] = aBytes[0] || 0;

    const xBytes = new Uint8Array(new Uint32Array([Math.trunc((x * 65535) / 100)]).buffer);
    buffer[3] = xBytes[3] || 0;
    buffer[4] = xBytes[2] || 0;
    buffer[5] = xBytes[1] || 0;
    buffer[6] = xBytes[0] || 0;

    const yBytes = new Uint8Array(new Uint32Array([Math.trunc((y * 65535) / 100)]).buffer);
    buffer[7] = yBytes[3] || 0;
    buffer[8] = yBytes[2] || 0;
    buffer[9] = yBytes[1] || 0;
    buffer[10] = yBytes[0] || 0;

    const dBytes = new Uint8Array(new Uint32Array([delta]).buffer);
    buffer[11] = dBytes[3] || 0;
    buffer[12] = dBytes[2] || 0;
    buffer[13] = dBytes[1] || 0;
    buffer[14] = dBytes[0] || 0;

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
