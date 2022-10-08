import * as methods from './groups/index.js';
import type { WdpCtx } from './WdpCtx.js';

const context = Symbol('WdpCtx');

export class Wdp {
  [context]: WdpCtx;

  constructor(options: WdpCtx) {
    this[context] = options;
  }
}

for (const [name, value] of Object.entries(methods)) {
  if (typeof value === 'function') {
    // @ts-ignore
    Wdp.prototype[name] = function (...args: any): any {
      // @ts-ignore
      return methods[name](this[context], ...args);
    };
  }
}

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

export interface Wdp {
  getInstalledAppPackages: OmitFirstArg<typeof methods['getInstalledAppPackages']>;
  getContentGroups: OmitFirstArg<typeof methods['getContentGroups']>;
  installApp: OmitFirstArg<typeof methods['installApp']>;
  installCertificate: OmitFirstArg<typeof methods['installCertificate']>;
  registerNetworkShareApp: OmitFirstArg<typeof methods['registerNetworkShareApp']>;
  getInstallationState: OmitFirstArg<typeof methods['getInstallationState']>;
  uninstallAppPackage: OmitFirstArg<typeof methods['uninstallAppPackage']>;
  registerLooseApp: OmitFirstArg<typeof methods['registerLooseApp']>;
  uploadLooseApp: OmitFirstArg<typeof methods['uploadLooseApp']>;
  pullInstallFromNetwork: OmitFirstArg<typeof methods['pullInstallFromNetwork']>;
  deleteSshPins: OmitFirstArg<typeof methods['deleteSshPins']>;
  getDeployInfo: OmitFirstArg<typeof methods['getDeployInfo']>;
  getPairedBluetoothDevices: OmitFirstArg<typeof methods['getPairedBluetoothDevices']>;
  getAvailableBluetoothDevices: OmitFirstArg<typeof methods['getAvailableBluetoothDevices']>;
  getBluetoothRadios: OmitFirstArg<typeof methods['getBluetoothRadios']>;
  setBluetoothRadioState: OmitFirstArg<typeof methods['setBluetoothRadioState']>;
  removeBluetoothDevice: OmitFirstArg<typeof methods['removeBluetoothDevice']>;
  disconnectBluetoothDevice: OmitFirstArg<typeof methods['disconnectBluetoothDevice']>;
  connectBluetoothDevice: OmitFirstArg<typeof methods['connectBluetoothDevice']>;
  getSSLCertificate: OmitFirstArg<typeof methods['getSSLCertificate']>;
  getContainers: OmitFirstArg<typeof methods['getContainers']>;
  getPluginTools: OmitFirstArg<typeof methods['getPluginTools']>;
  getPluginWorkspaces: OmitFirstArg<typeof methods['getPluginWorkspaces']>;
  getUniqueId: OmitFirstArg<typeof methods['getUniqueId']>;
  getDevices: OmitFirstArg<typeof methods['getDevices']>;
  getUsbDevices: OmitFirstArg<typeof methods['getUsbDevices']>;
  getServiceTags: OmitFirstArg<typeof methods['getServiceTags']>;
  deleteAllServiceTags: OmitFirstArg<typeof methods['deleteAllServiceTags']>;
  addServiceTag: OmitFirstArg<typeof methods['addServiceTag']>;
  deleteServiceTag: OmitFirstArg<typeof methods['deleteServiceTag']>;
  getCrashDumps: OmitFirstArg<typeof methods['getCrashDumps']>;
  getCrashDumpControlSettings: OmitFirstArg<typeof methods['getCrashDumpControlSettings']>;
  setCrashDumpControlSettings: OmitFirstArg<typeof methods['setCrashDumpControlSettings']>;
  getCrashDump: OmitFirstArg<typeof methods['getCrashDump']>;
  deleteCrashDump: OmitFirstArg<typeof methods['deleteCrashDump']>;
  getProcessDump: OmitFirstArg<typeof methods['getProcessDump']>;
  getKernelDump: OmitFirstArg<typeof methods['getKernelDump']>;
  getBugCheckDumps: OmitFirstArg<typeof methods['getBugCheckDumps']>;
  getBugCheckDump: OmitFirstArg<typeof methods['getBugCheckDump']>;
  getCrashControlSettings: OmitFirstArg<typeof methods['getCrashControlSettings']>;
  setCrashControlSettings: OmitFirstArg<typeof methods['setCrashControlSettings']>;
  getWerReports: OmitFirstArg<typeof methods['getWerReports']>;
  getWerReportFiles: OmitFirstArg<typeof methods['getWerReportFiles']>;
  getWerReportFile: OmitFirstArg<typeof methods['getWerReportFile']>;
  getEtwEvents: OmitFirstArg<typeof methods['getEtwEvents']>;
  getEtwProviders: OmitFirstArg<typeof methods['getEtwProviders']>;
  getCustomEtwProviders: OmitFirstArg<typeof methods['getCustomEtwProviders']>;
  getFeatures: OmitFirstArg<typeof methods['getFeatures']>;
  setFeatureState: OmitFirstArg<typeof methods['setFeatureState']>;
  getFiddlerTracingState: OmitFirstArg<typeof methods['getFiddlerTracingState']>;
  enableFiddler: OmitFirstArg<typeof methods['enableFiddler']>;
  disableFiddler: OmitFirstArg<typeof methods['disableFiddler']>;
  getKnownFolders: OmitFirstArg<typeof methods['getKnownFolders']>;
  getFiles: OmitFirstArg<typeof methods['getFiles']>;
  deleteFile: OmitFirstArg<typeof methods['deleteFile']>;
  renameFile: OmitFirstArg<typeof methods['renameFile']>;
  createFolder: OmitFirstArg<typeof methods['createFolder']>;
  getFile: OmitFirstArg<typeof methods['getFile']>;
  uploadFiles: OmitFirstArg<typeof methods['uploadFiles']>;
  getHttpMonitorState: OmitFirstArg<typeof methods['getHttpMonitorState']>;
  getHttpMonitor: OmitFirstArg<typeof methods['getHttpMonitor']>;
  getLocationOverrideMode: OmitFirstArg<typeof methods['getLocationOverrideMode']>;
  setLocationOverrideMode: OmitFirstArg<typeof methods['setLocationOverrideMode']>;
  getLocation: OmitFirstArg<typeof methods['getLocation']>;
  setLocation: OmitFirstArg<typeof methods['setLocation']>;
  getScreenshot: OmitFirstArg<typeof methods['getScreenshot']>;
  getNetworkCredentials: OmitFirstArg<typeof methods['getNetworkCredentials']>;
  addNetworkCredential: OmitFirstArg<typeof methods['addNetworkCredential']>;
  deleteNetworkCredential: OmitFirstArg<typeof methods['deleteNetworkCredential']>;
  getIpConfig: OmitFirstArg<typeof methods['getIpConfig']>;
  setIpConfig: OmitFirstArg<typeof methods['setIpConfig']>;
  setComputerName: OmitFirstArg<typeof methods['setComputerName']>;
  getComputerName: OmitFirstArg<typeof methods['getComputerName']>;
  getXboxInfo: OmitFirstArg<typeof methods['getXboxInfo']>;
  getOsInfo: OmitFirstArg<typeof methods['getOsInfo']>;
  getDeviceFamily: OmitFirstArg<typeof methods['getDeviceFamily']>;
  startCustomWprTrace: OmitFirstArg<typeof methods['startCustomWprTrace']>;
  startCustomWprBootTrace: OmitFirstArg<typeof methods['startCustomWprBootTrace']>;
  startWprTrace: OmitFirstArg<typeof methods['startWprTrace']>;
  startWprBootTrace: OmitFirstArg<typeof methods['startWprBootTrace']>;
  stopWprTrace: OmitFirstArg<typeof methods['stopWprTrace']>;
  stopWprBootTrace: OmitFirstArg<typeof methods['stopWprBootTrace']>;
  getWprTraceState: OmitFirstArg<typeof methods['getWprTraceState']>;
  getWprTraces: OmitFirstArg<typeof methods['getWprTraces']>;
  getWprTrace: OmitFirstArg<typeof methods['getWprTrace']>;
  deleteWprTrace: OmitFirstArg<typeof methods['deleteWprTrace']>;
  getPowerState: OmitFirstArg<typeof methods['getPowerState']>;
  getBatteryState: OmitFirstArg<typeof methods['getBatteryState']>;
  getPowerConfig: OmitFirstArg<typeof methods['getPowerConfig']>;
  setPowerConfig: OmitFirstArg<typeof methods['setPowerConfig']>;
  setPowerActiveScheme: OmitFirstArg<typeof methods['setPowerActiveScheme']>;
  getPowerActiveScheme: OmitFirstArg<typeof methods['getPowerActiveScheme']>;
  getSleepStudyReports: OmitFirstArg<typeof methods['getSleepStudyReports']>;
  getSleepStudyReport: OmitFirstArg<typeof methods['getSleepStudyReport']>;
  getSleepStudyTransform: OmitFirstArg<typeof methods['getSleepStudyTransform']>;
  getRootKeys: OmitFirstArg<typeof methods['getRootKeys']>;
  getSubKeys: OmitFirstArg<typeof methods['getSubKeys']>;
  getRegValues: OmitFirstArg<typeof methods['getRegValues']>;
  restart: OmitFirstArg<typeof methods['restart']>;
  shutdown: OmitFirstArg<typeof methods['shutdown']>;
  getPhysicalControllers: OmitFirstArg<typeof methods['getPhysicalControllers']>;
  disconnectPhysicalControllers: OmitFirstArg<typeof methods['disconnectPhysicalControllers']>;
  getRemoteInput: OmitFirstArg<typeof methods['getRemoteInput']>;
  getProcesses: OmitFirstArg<typeof methods['getProcesses']>;
  getSystemPerformanceStatistics: OmitFirstArg<typeof methods['getSystemPerformanceStatistics']>;
  getSmbCredentials: OmitFirstArg<typeof methods['getSmbCredentials']>;
  getSettings: OmitFirstArg<typeof methods['getSettings']>;
  getSetting: OmitFirstArg<typeof methods['getSetting']>;
  setSetting: OmitFirstArg<typeof methods['setSetting']>;
  startApp: OmitFirstArg<typeof methods['startApp']>;
  stopApp: OmitFirstArg<typeof methods['stopApp']>;
  suspendApp: OmitFirstArg<typeof methods['suspendApp']>;
  resumeApp: OmitFirstArg<typeof methods['resumeApp']>;
  stopProcess: OmitFirstArg<typeof methods['stopProcess']>;
  getSignedInUser: OmitFirstArg<typeof methods['getSignedInUser']>;
  getUsers: OmitFirstArg<typeof methods['getUsers']>;
  deleteUser: OmitFirstArg<typeof methods['deleteUser']>;
  addUser: OmitFirstArg<typeof methods['addUser']>;
  setUserSignInState: OmitFirstArg<typeof methods['setUserSignInState']>;
  getWindows: OmitFirstArg<typeof methods['getWindows']>;
  getWirelessInterfaces: OmitFirstArg<typeof methods['getWirelessInterfaces']>;
  getAvailableWirelessNetworks: OmitFirstArg<typeof methods['getAvailableWirelessNetworks']>;
  connectToNetwork: OmitFirstArg<typeof methods['connectToNetwork']>;
  connectToNetworkUsingProfile: OmitFirstArg<typeof methods['connectToNetworkUsingProfile']>;
  disconnectFromNetwork: OmitFirstArg<typeof methods['disconnectFromNetwork']>;
  deleteWifiProfile: OmitFirstArg<typeof methods['deleteWifiProfile']>;
  getXboxLiveSandbox: OmitFirstArg<typeof methods['getXboxLiveSandbox']>;
  setXboxLiveSandbox: OmitFirstArg<typeof methods['setXboxLiveSandbox']>;
}
