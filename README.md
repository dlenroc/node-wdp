# @dlenroc/wdp · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/wdp)](https://www.npmjs.com/package/@dlenroc/wdp)

## Installation

```bash
npm install @dlenroc/wdp --save
```

## Usage

In this [Windows Device Portal (WDP)](https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal) binding, all functions are available in 2 styles:

- Via `Wdp` class

  Allows you to initialize a class by passing the configuration once through the constructor.

  ```ts
  import { Wdp } from '@dlenroc/wdp';         // ESM
  // const { WDP } = require('@dlenroc/wdp'); // CJS

  const wdp = new Wdp({ address: ... });
  const packages = await wdp.getInstalledAppPackages()
  console.log(packages);
  ```

- Via named import

  Allows you to import/use individual methods, but requires passing the configuration as the first parameter.

  ```ts
  import * as wdp from '@dlenroc/wdp';        // ESM
  // const wdp = require('@dlenroc/wdp');     // CJS

  const ctx = { address: ... };
  const packages = await wdp.getInstalledAppPackages(ctx);
  console.log(packages);
  ```

Regardless of which method you choose, the configuration will look the same.

```ts
{
  // required: WDP address
  address: 'https://192.168.18.5:11443',

  // optional: WDP username/password
  username: 'username',
  password: 'password',

  // optional: W3C compliant implementations
  implementations: { fetch, FormData, WebSocket }
}
```

> 📝 The ability to provide implementations allows you to provide only features that are missing in the engine, as well as customize those that may not meet your needs.

## Example

Below you can see a simple example for Node.js 16 LTS using [node-fetch](https://www.npmjs.com/package/node-fetch) and [ws](https://www.npmjs.com/package/ws).

```js
import { Wdp } from '@dlenroc/wdp';
import nodeFetch, { Blob, FormData } from 'node-fetch';
import { readFile } from 'node:fs/promises';
import https from 'node:https';
import { setTimeout as sleep } from 'node:timers/promises';
import { WebSocket as NodeWebSocket } from 'ws';

// Custom implementations without SSL verification
const agent = new https.Agent({ rejectUnauthorized: false });
const fetch = (url, init) => nodeFetch(url, { ...init, agent });
const WebSocket = function (url, protocols, options) {
  return new NodeWebSocket(url, protocols, { ...options, agent });
};

const wdp = new Wdp({
  address: 'https://192.168.18.5:11443',
  username: 'auto-xbox',
  password: 'secret',
  implementations: { fetch, FormData, WebSocket },
});

// Install application
// const appContent = new Blob([await readFile('app.msix')]);
// await wdp.installApp('app.msix', appContent);
// while (true) {
//   const state = await wdp.getInstallationState();
//   if (!state.InstallRunning) break;
//   await sleep(500);
// }

// Open "Microsoft Edge"
const app = await wdp.getInstalledAppPackages();
const edge = app.InstalledPackages.find((app) => app.Name === 'Microsoft Edge');
if (!edge) throw new Error('Microsoft Edge is not installed');
await wdp.startApp(edge.PackageRelativeId);
await sleep(5000);

// Scroll page
const input = await wdp.getRemoteInput();
input.move(50, 50);
for (let i = 0; i < 500; i++) {
  input.verticalWheelMove(50, 80, -20);
  await sleep(50);
}
input.disconnect();
```

## APIs

```ts
getInstalledAppPackages(options?: { streamable?: boolean; includeframeworkpackages?: boolean }): Promise<AppPackages>
```

```ts
getContentGroups(packageFullName: string): Promise<ContentGroups>
```

```ts
installApp(name: string, content: Blob, extra?: Record<string, Blob>): Promise<void>
```

```ts
installCertificate(name: string, content: Blob): Promise<void>
```

```ts
registerNetworkShareApp(app: NetworkAppPackages): Promise<void>
```

```ts
getInstallationState(): Promise<InstallState>
```

```ts
uninstallAppPackage(packageFullName: string): Promise<void>
```

```ts
registerLooseApp(folder: string): Promise<void>
```

```ts
uploadLooseApp(folder: string, files: Record<string, Blob>): Promise<void>
```

```ts
pullInstallFromNetwork(install: Record<string, any>): Promise<void>
```

```ts
deleteSshPins(): Promise<void>
```

```ts
getDeployInfo(packageFullName: string, overlayFolder?: string): Promise<AppDeployInfo>
```

```ts
getPairedBluetoothDevices(): Promise<PairedBluetoothDevices>
```

```ts
getAvailableBluetoothDevices(): Promise<AvailableBluetoothDevices>
```

```ts
getBluetoothRadios(): Promise<BluetoothRadios>
```

```ts
setBluetoothRadioState(id: string, enable: boolean): Promise<void>
```

```ts
removeBluetoothDevice(deviceId: string): Promise<void>
```

```ts
disconnectBluetoothDevice(deviceId: string): Promise<void>
```

```ts
connectBluetoothDevice(deviceId: string): Promise<void>
```

```ts
getSSLCertificate(): Promise<Blob>
```

```ts
getContainers(): Promise<any>
```

```ts
getPluginTools(): Promise<PluginTools>
```

```ts
getPluginWorkspaces(): Promise<Workspaces>
```

```ts
getUniqueId(): Promise<UniqueId>
```

```ts
getDevices(): Promise<Devices>
```

```ts
getUsbDevices(): Promise<UsbDevices>
```

```ts
getServiceTags(): Promise<ServiceTags>
```

```ts
deleteAllServiceTags(): Promise<void>
```

```ts
addServiceTag(tag: string): Promise<void>
```

```ts
deleteServiceTag(tag: string): Promise<void>
```

```ts
getCrashDumps(): Promise<AppCrashDumps>
```

```ts
getCrashDumpControlSettings(packageFullName: string): Promise<AppCrashDumpSettings>
```

```ts
setCrashDumpControlSettings(packageFullName: string, enable: boolean): Promise<void>
```

```ts
getCrashDump(packageFullName: string, fileName: string): Promise<Blob>
```

```ts
deleteCrashDump(packageFullName: string, fileName: string): Promise<void>
```

```ts
getProcessDump(pid: number): Promise<Blob>
```

```ts
getKernelDump(): Promise<Blob>
```

```ts
getBugCheckDumps(): Promise<DumpFiles>
```

```ts
getBugCheckDump(filename: string): Promise<Blob>
```

```ts
getCrashControlSettings(): Promise<DumpSetting>
```

```ts
setCrashControlSettings(settings: DumpSetting): Promise<DumpSetting>
```

```ts
getWerReports(): Promise<WerReports>
```

```ts
getWerReportFiles(user: string, type: string, name: string): Promise<WerReportFiles>
```

```ts
getWerReportFile(user: string, type: string, name: string, file: string): Promise<Blob>
```

```ts
getEtwEvents(): Promise<EtwEvents>
```

```ts
getEtwProviders(): Promise<EtwProviders>
```

```ts
getCustomEtwProviders(): Promise<EtwProviders>
```

```ts
getFeatures(): Promise<FeatureCategories>
```

```ts
setFeatureState(id: string, state: boolean): Promise<void>
```

```ts
getFiddlerTracingState(): Promise<FiddlerTracingState>
```

```ts
enableFiddler(proxyAddress: string, proxyPort: number, cert?: Blob): Promise<void>
```

```ts
disableFiddler(): Promise<void>
```

```ts
getKnownFolders(): Promise<KnownFolders>
```

```ts
getFiles(knownFolderId: string, options?: { packageFullName?: string; path?: string }): Promise<KnownFolderFiles>
```

```ts
deleteFile(knownFolderId: string, filename: string, options: { packageFullName?: string; path?: string }): Promise<void>
```

```ts
renameFile(knownFolderId: string, filename: string, newFilename: string, options: { packageFullName?: string; path?: string }): Promise<void>
```

```ts
createFolder(knownFolderId: string, newFolderName: string, options: { packageFullName?: string; path?: string }): Promise<void>
```

```ts
getFile(knownFolderId: string, filename: string, options?: { packageFullName?: string; path?: string }): Promise<Blob>
```

```ts
uploadFiles(knownFolderId: string, files: Record<string, Blob>, options: { packageFullName?: string; path?: string; extract?: boolean }): Promise<void>
```

```ts
getHttpMonitorState(): Promise<HttpMonitorState>
```

```ts
getHttpMonitor(): Promise<HttpMonitor>
```

```ts
getLocationOverrideMode(): Promise<LocationOverride>
```

```ts
setLocationOverrideMode(override: boolean): Promise<LocationOverride>
```

```ts
getLocation(): Promise<Location>
```

```ts
setLocation(position: Location): Promise<Location>
```

```ts
getScreenshot(): Promise<Blob>
```

```ts
getNetworkCredentials(): Promise<NetworkCredentials>
```

```ts
addNetworkCredential(networkPath: string, username: string, password: string): Promise<void>
```

```ts
deleteNetworkCredential(networkPath: string): Promise<void>
```

```ts
getIpConfig(): Promise<NetworkAdapters>
```

```ts
setIpConfig(guid: string, options?: { ipAddress?: string; subnetMask?: string; defaultGateway?: string; primaryDNS?: string; secondaryDNS?: string }): Promise<void>
```

```ts
setComputerName(name: string): Promise<void>
```

```ts
getComputerName(): Promise<ComputerName>
```

```ts
getXboxInfo(): Promise<XboxInfo>
```

```ts
getOsInfo(): Promise<OSInfo>
```

```ts
getDeviceFamily(): Promise<DeviceFamily>
```

```ts
startCustomWprTrace(name: string, content: Blob): Promise<WprTraceState>
```

```ts
startCustomWprBootTrace(name: string, content: Blob): Promise<WprTraceState>
```

```ts
startWprTrace(profile: string): Promise<WprTraceState>
```

```ts
startWprBootTrace(profile: string): Promise<WprTraceState>
```

```ts
stopWprTrace(): Promise<void>
```

```ts
stopWprBootTrace(): Promise<void>
```

```ts
getWprTraceState(): Promise<WprTraceState>
```

```ts
getWprTraces(): Promise<WprTraces>
```

```ts
getWprTrace(filename: string): Promise<Blob>
```

```ts
deleteWprTrace(filename: string): Promise<void>
```

```ts
getPowerState(): Promise<PowerState>
```

```ts
getBatteryState(): Promise<BatteryState>
```

```ts
getPowerConfig(scheme: string): Promise<PowerConfig>
```

```ts
setPowerConfig(scheme: string, valueAC: number, valueDC: number): Promise<void>
```

```ts
setPowerActiveScheme(scheme: string): Promise<void>
```

```ts
getPowerActiveScheme(): Promise<ActivePowerScheme>
```

```ts
getSleepStudyReports(): Promise<SleepStudyReports>
```

```ts
getSleepStudyReport(fileName: string): Promise<Blob>
```

```ts
getSleepStudyTransform(): Promise<Blob>
```

```ts
getRootKeys(containerId?: string): Promise<RegistryRootKeys>
```

```ts
getSubKeys(rootKey: string, options?: { regKey?: string; containerId?: string }): Promise<RegistrySubKeys>
```

```ts
getRegValues(rootKey: string, options?: { regKey?: string; containerId?: string }): Promise<RegistryValues>
```

```ts
restart(): Promise<void>
```

```ts
shutdown(): Promise<void>
```

```ts
getPhysicalControllers(): Promise<PhysicalControllers>
```

```ts
disconnectPhysicalControllers(): Promise<void>
```

```ts
getRemoteInput(options?: { timeout?: number }): Promise<RemoteInput>
```

```ts
getProcesses(options?: { containerId?: string }): Promise<Processes>
```

```ts
getSystemPerformanceStatistics(): Promise<PerformanceStatistics>
```

```ts
getSmbCredentials(): Promise<SmbCredentials>
```

```ts
getSettings(): Promise<Settings>
```

```ts
getSetting(name: string): Promise<Setting>
```

```ts
setSetting(name: string, value: any): Promise<Setting>
```

```ts
startApp(appId: string, options?: { holographic?: boolean; packageFullName?: string }): Promise<void>
```

```ts
stopApp(packageFullName: string, force?: boolean): Promise<void>
```

```ts
suspendApp(packageFullName: string): Promise<void>
```

```ts
resumeApp(packageFullName: string): Promise<void>
```

```ts
stopProcess(pid: number, options?: { containerId?: string }): Promise<void>
```

```ts
getSignedInUser(): Promise<ActiveUser>
```

```ts
getUsers(): Promise<Users>
```

```ts
deleteUser(userId: number): Promise<void>
```

```ts
addUser(email: string, password: string, autoSignIn?: boolean): Promise<void>
```

```ts
setUserSignInState(userId: number, signIn: boolean): Promise<void>
```

```ts
getWindows(containerId?: string): Promise<any>
```

```ts
getWirelessInterfaces(): Promise<WifiInterfaces>
```

```ts
getAvailableWirelessNetworks(guid: string): Promise<WifiNetworks>
```

```ts
connectToNetwork(guid: string, ssid: string, key: string, createProfile?: boolean): Promise<void>
```

```ts
connectToNetworkUsingProfile(guid: string, profile: string): Promise<void>
```

```ts
disconnectFromNetwork(guid: string): Promise<void>
```

```ts
deleteWifiProfile(guid: string, profile: string): Promise<void>
```

```ts
getXboxLiveSandbox(): Promise<XboxLiveSandbox>
```

```ts
setXboxLiveSandbox(sandbox: string): Promise<XboxLiveSandbox>
```
