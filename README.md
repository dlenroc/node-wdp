# @dlenroc/wdp · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/wdp)](https://www.npmjs.com/package/@dlenroc/wdp)

## Installation

```bash
npm install @dlenroc/wdp --save
```

## Usage

[Windows Device Portal (WDP)](https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal) abilities are exported by this library in 2 styles.

### Traditional

All methods will be available after `Wdp` instance creation.

```typescript
import { Wdp } from '@dlenroc/wdp';         // ESM
// const { WDP } = require('@dlenroc/wdp'); // CJS

const wdp = new Wdp({ address: ... });
const packages = await wdp.getInstalledAppPackages()
console.log(packages);
```

### Functional

Individual methods can be imported and used separately, but you will have to pass the configuration as the first parameter.

```typescript
import * as wdp from '@dlenroc/wdp';        // ESM
// const wdp = require('@dlenroc/wdp');     // CJS

const ctx = { address: ... };
const packages = await wdp.getInstalledAppPackages(ctx);
console.log(packages);
```

## Example

Below you can see a working example that will work on LTS versions of Node.

```js
import * as wdp from '@dlenroc/wdp';
import * as fs from 'fs/promises';
import nodeFetch, { Blob, FormData } from 'node-fetch';
import https from 'node:https';
import { setTimeout as sleep } from 'timers/promises';
import { WebSocket as NodeWebSocket } from 'ws';

// Configure SSL, Proxy, .etc
const agent = new https.Agent({ keepAlive: true, rejectUnauthorized: false });
const fetch = (url, init) => nodeFetch(url, { ...init, agent });
const WebSocket = function (url, protocols, options) {
  return new NodeWebSocket(url, protocols, { ...options, agent });
};

// Create WDP context
const ctx = {
  address: 'https://192.168.18.5:11443',

  // adding 'auto-' to the actual username allow using more methods
  username: 'auto-xbox',
  password: 'secret',

  // provide implementations if they are not present in the global object
  implementations: { fetch, FormData, WebSocket },
};

// Install application
// const appContent = new Blob([await fs.readFile('app.msix')]);
// await wdp.installApp(ctx, 'app.msix', appContent);
// while (true) {
//   const state = await wdp.getInstallationState(ctx);
//   if (!state.InstallRunning) break;
//   await sleep(500);
// }

// Open "Microsoft Edge"
const app = await wdp.getInstalledAppPackages(ctx);
const edge = app.InstalledPackages.find((app) => app.Name === 'Microsoft Edge');
if (!edge) throw new Error('Microsoft Edge is not installed');
await wdp.startApp(ctx, edge.PackageRelativeId);
await sleep(5000);

// Scroll page
const input = await wdp.getRemoteInput(ctx);
input.move(50, 50);
for (let i = 0; i < 500; i++) {
  input.verticalWheelMove(50, 80, -20);
  await sleep(50);
}
input.disconnect();
```
