import * as wdp from './groups/index.js';
import type { WdpCtx } from './WdpCtx.js';

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

export class Wdp {
  private readonly ctx: WdpCtx;

  constructor(ctx: WdpCtx) {
    this.ctx = ctx;
  }

  getInstalledAppPackages: OmitFirstArg<typeof wdp['getInstalledAppPackages']> = function (this: Wdp, ...args) {
    return wdp.getInstalledAppPackages(this.ctx, ...args);
  };

  getContentGroups: OmitFirstArg<typeof wdp['getContentGroups']> = function (this: Wdp, ...args) {
    return wdp.getContentGroups(this.ctx, ...args);
  };

  installApp: OmitFirstArg<typeof wdp['installApp']> = function (this: Wdp, ...args) {
    return wdp.installApp(this.ctx, ...args);
  };

  installCertificate: OmitFirstArg<typeof wdp['installCertificate']> = function (this: Wdp, ...args) {
    return wdp.installCertificate(this.ctx, ...args);
  };

  registerNetworkShareApp: OmitFirstArg<typeof wdp['registerNetworkShareApp']> = function (this: Wdp, ...args) {
    return wdp.registerNetworkShareApp(this.ctx, ...args);
  };

  getInstallationState: OmitFirstArg<typeof wdp['getInstallationState']> = function (this: Wdp, ...args) {
    return wdp.getInstallationState(this.ctx, ...args);
  };

  uninstallAppPackage: OmitFirstArg<typeof wdp['uninstallAppPackage']> = function (this: Wdp, ...args) {
    return wdp.uninstallAppPackage(this.ctx, ...args);
  };

  registerLooseApp: OmitFirstArg<typeof wdp['registerLooseApp']> = function (this: Wdp, ...args) {
    return wdp.registerLooseApp(this.ctx, ...args);
  };

  uploadLooseApp: OmitFirstArg<typeof wdp['uploadLooseApp']> = function (this: Wdp, ...args) {
    return wdp.uploadLooseApp(this.ctx, ...args);
  };

  pullInstallFromNetwork: OmitFirstArg<typeof wdp['pullInstallFromNetwork']> = function (this: Wdp, ...args) {
    return wdp.pullInstallFromNetwork(this.ctx, ...args);
  };

  deleteSshPins: OmitFirstArg<typeof wdp['deleteSshPins']> = function (this: Wdp, ...args) {
    return wdp.deleteSshPins(this.ctx, ...args);
  };

  getDeployInfo: OmitFirstArg<typeof wdp['getDeployInfo']> = function (this: Wdp, ...args) {
    return wdp.getDeployInfo(this.ctx, ...args);
  };

  getPairedBluetoothDevices: OmitFirstArg<typeof wdp['getPairedBluetoothDevices']> = function (this: Wdp, ...args) {
    return wdp.getPairedBluetoothDevices(this.ctx, ...args);
  };

  getAvailableBluetoothDevices: OmitFirstArg<typeof wdp['getAvailableBluetoothDevices']> = function (this: Wdp, ...args) {
    return wdp.getAvailableBluetoothDevices(this.ctx, ...args);
  };

  getBluetoothRadios: OmitFirstArg<typeof wdp['getBluetoothRadios']> = function (this: Wdp, ...args) {
    return wdp.getBluetoothRadios(this.ctx, ...args);
  };

  setBluetoothRadioState: OmitFirstArg<typeof wdp['setBluetoothRadioState']> = function (this: Wdp, ...args) {
    return wdp.setBluetoothRadioState(this.ctx, ...args);
  };

  removeBluetoothDevice: OmitFirstArg<typeof wdp['removeBluetoothDevice']> = function (this: Wdp, ...args) {
    return wdp.removeBluetoothDevice(this.ctx, ...args);
  };

  disconnectBluetoothDevice: OmitFirstArg<typeof wdp['disconnectBluetoothDevice']> = function (this: Wdp, ...args) {
    return wdp.disconnectBluetoothDevice(this.ctx, ...args);
  };

  connectBluetoothDevice: OmitFirstArg<typeof wdp['connectBluetoothDevice']> = function (this: Wdp, ...args) {
    return wdp.connectBluetoothDevice(this.ctx, ...args);
  };

  getSSLCertificate: OmitFirstArg<typeof wdp['getSSLCertificate']> = function (this: Wdp, ...args) {
    return wdp.getSSLCertificate(this.ctx, ...args);
  };

  getContainers: OmitFirstArg<typeof wdp['getContainers']> = function (this: Wdp, ...args) {
    return wdp.getContainers(this.ctx, ...args);
  };

  getPluginTools: OmitFirstArg<typeof wdp['getPluginTools']> = function (this: Wdp, ...args) {
    return wdp.getPluginTools(this.ctx, ...args);
  };

  getPluginWorkspaces: OmitFirstArg<typeof wdp['getPluginWorkspaces']> = function (this: Wdp, ...args) {
    return wdp.getPluginWorkspaces(this.ctx, ...args);
  };

  getUniqueId: OmitFirstArg<typeof wdp['getUniqueId']> = function (this: Wdp, ...args) {
    return wdp.getUniqueId(this.ctx, ...args);
  };

  getDevices: OmitFirstArg<typeof wdp['getDevices']> = function (this: Wdp, ...args) {
    return wdp.getDevices(this.ctx, ...args);
  };

  getUsbDevices: OmitFirstArg<typeof wdp['getUsbDevices']> = function (this: Wdp, ...args) {
    return wdp.getUsbDevices(this.ctx, ...args);
  };

  getServiceTags: OmitFirstArg<typeof wdp['getServiceTags']> = function (this: Wdp, ...args) {
    return wdp.getServiceTags(this.ctx, ...args);
  };

  deleteAllServiceTags: OmitFirstArg<typeof wdp['deleteAllServiceTags']> = function (this: Wdp, ...args) {
    return wdp.deleteAllServiceTags(this.ctx, ...args);
  };

  addServiceTag: OmitFirstArg<typeof wdp['addServiceTag']> = function (this: Wdp, ...args) {
    return wdp.addServiceTag(this.ctx, ...args);
  };

  deleteServiceTag: OmitFirstArg<typeof wdp['deleteServiceTag']> = function (this: Wdp, ...args) {
    return wdp.deleteServiceTag(this.ctx, ...args);
  };

  getCrashDumps: OmitFirstArg<typeof wdp['getCrashDumps']> = function (this: Wdp, ...args) {
    return wdp.getCrashDumps(this.ctx, ...args);
  };

  getCrashDumpControlSettings: OmitFirstArg<typeof wdp['getCrashDumpControlSettings']> = function (this: Wdp, ...args) {
    return wdp.getCrashDumpControlSettings(this.ctx, ...args);
  };

  setCrashDumpControlSettings: OmitFirstArg<typeof wdp['setCrashDumpControlSettings']> = function (this: Wdp, ...args) {
    return wdp.setCrashDumpControlSettings(this.ctx, ...args);
  };

  getCrashDump: OmitFirstArg<typeof wdp['getCrashDump']> = function (this: Wdp, ...args) {
    return wdp.getCrashDump(this.ctx, ...args);
  };

  deleteCrashDump: OmitFirstArg<typeof wdp['deleteCrashDump']> = function (this: Wdp, ...args) {
    return wdp.deleteCrashDump(this.ctx, ...args);
  };

  getProcessDump: OmitFirstArg<typeof wdp['getProcessDump']> = function (this: Wdp, ...args) {
    return wdp.getProcessDump(this.ctx, ...args);
  };

  getKernelDump: OmitFirstArg<typeof wdp['getKernelDump']> = function (this: Wdp, ...args) {
    return wdp.getKernelDump(this.ctx, ...args);
  };

  getBugCheckDumps: OmitFirstArg<typeof wdp['getBugCheckDumps']> = function (this: Wdp, ...args) {
    return wdp.getBugCheckDumps(this.ctx, ...args);
  };

  getBugCheckDump: OmitFirstArg<typeof wdp['getBugCheckDump']> = function (this: Wdp, ...args) {
    return wdp.getBugCheckDump(this.ctx, ...args);
  };

  getCrashControlSettings: OmitFirstArg<typeof wdp['getCrashControlSettings']> = function (this: Wdp, ...args) {
    return wdp.getCrashControlSettings(this.ctx, ...args);
  };

  setCrashControlSettings: OmitFirstArg<typeof wdp['setCrashControlSettings']> = function (this: Wdp, ...args) {
    return wdp.setCrashControlSettings(this.ctx, ...args);
  };

  getWerReports: OmitFirstArg<typeof wdp['getWerReports']> = function (this: Wdp, ...args) {
    return wdp.getWerReports(this.ctx, ...args);
  };

  getWerReportFiles: OmitFirstArg<typeof wdp['getWerReportFiles']> = function (this: Wdp, ...args) {
    return wdp.getWerReportFiles(this.ctx, ...args);
  };

  getWerReportFile: OmitFirstArg<typeof wdp['getWerReportFile']> = function (this: Wdp, ...args) {
    return wdp.getWerReportFile(this.ctx, ...args);
  };

  getEtwEvents: OmitFirstArg<typeof wdp['getEtwEvents']> = function (this: Wdp, ...args) {
    return wdp.getEtwEvents(this.ctx, ...args);
  };

  getEtwProviders: OmitFirstArg<typeof wdp['getEtwProviders']> = function (this: Wdp, ...args) {
    return wdp.getEtwProviders(this.ctx, ...args);
  };

  getCustomEtwProviders: OmitFirstArg<typeof wdp['getCustomEtwProviders']> = function (this: Wdp, ...args) {
    return wdp.getCustomEtwProviders(this.ctx, ...args);
  };

  getFeatures: OmitFirstArg<typeof wdp['getFeatures']> = function (this: Wdp, ...args) {
    return wdp.getFeatures(this.ctx, ...args);
  };

  setFeatureState: OmitFirstArg<typeof wdp['setFeatureState']> = function (this: Wdp, ...args) {
    return wdp.setFeatureState(this.ctx, ...args);
  };

  getFiddlerTracingState: OmitFirstArg<typeof wdp['getFiddlerTracingState']> = function (this: Wdp, ...args) {
    return wdp.getFiddlerTracingState(this.ctx, ...args);
  };

  enableFiddler: OmitFirstArg<typeof wdp['enableFiddler']> = function (this: Wdp, ...args) {
    return wdp.enableFiddler(this.ctx, ...args);
  };

  disableFiddler: OmitFirstArg<typeof wdp['disableFiddler']> = function (this: Wdp, ...args) {
    return wdp.disableFiddler(this.ctx, ...args);
  };

  getKnownFolders: OmitFirstArg<typeof wdp['getKnownFolders']> = function (this: Wdp, ...args) {
    return wdp.getKnownFolders(this.ctx, ...args);
  };

  getFiles: OmitFirstArg<typeof wdp['getFiles']> = function (this: Wdp, ...args) {
    return wdp.getFiles(this.ctx, ...args);
  };

  deleteFile: OmitFirstArg<typeof wdp['deleteFile']> = function (this: Wdp, ...args) {
    return wdp.deleteFile(this.ctx, ...args);
  };

  renameFile: OmitFirstArg<typeof wdp['renameFile']> = function (this: Wdp, ...args) {
    return wdp.renameFile(this.ctx, ...args);
  };

  createFolder: OmitFirstArg<typeof wdp['createFolder']> = function (this: Wdp, ...args) {
    return wdp.createFolder(this.ctx, ...args);
  };

  getFile: OmitFirstArg<typeof wdp['getFile']> = function (this: Wdp, ...args) {
    return wdp.getFile(this.ctx, ...args);
  };

  uploadFiles: OmitFirstArg<typeof wdp['uploadFiles']> = function (this: Wdp, ...args) {
    return wdp.uploadFiles(this.ctx, ...args);
  };

  getHttpMonitorState: OmitFirstArg<typeof wdp['getHttpMonitorState']> = function (this: Wdp, ...args) {
    return wdp.getHttpMonitorState(this.ctx, ...args);
  };

  getHttpMonitor: OmitFirstArg<typeof wdp['getHttpMonitor']> = function (this: Wdp, ...args) {
    return wdp.getHttpMonitor(this.ctx, ...args);
  };

  getLocationOverrideMode: OmitFirstArg<typeof wdp['getLocationOverrideMode']> = function (this: Wdp, ...args) {
    return wdp.getLocationOverrideMode(this.ctx, ...args);
  };

  setLocationOverrideMode: OmitFirstArg<typeof wdp['setLocationOverrideMode']> = function (this: Wdp, ...args) {
    return wdp.setLocationOverrideMode(this.ctx, ...args);
  };

  getLocation: OmitFirstArg<typeof wdp['getLocation']> = function (this: Wdp, ...args) {
    return wdp.getLocation(this.ctx, ...args);
  };

  setLocation: OmitFirstArg<typeof wdp['setLocation']> = function (this: Wdp, ...args) {
    return wdp.setLocation(this.ctx, ...args);
  };

  getScreenshot: OmitFirstArg<typeof wdp['getScreenshot']> = function (this: Wdp, ...args) {
    return wdp.getScreenshot(this.ctx, ...args);
  };

  getNetworkCredentials: OmitFirstArg<typeof wdp['getNetworkCredentials']> = function (this: Wdp, ...args) {
    return wdp.getNetworkCredentials(this.ctx, ...args);
  };

  addNetworkCredential: OmitFirstArg<typeof wdp['addNetworkCredential']> = function (this: Wdp, ...args) {
    return wdp.addNetworkCredential(this.ctx, ...args);
  };

  deleteNetworkCredential: OmitFirstArg<typeof wdp['deleteNetworkCredential']> = function (this: Wdp, ...args) {
    return wdp.deleteNetworkCredential(this.ctx, ...args);
  };

  getIpConfig: OmitFirstArg<typeof wdp['getIpConfig']> = function (this: Wdp, ...args) {
    return wdp.getIpConfig(this.ctx, ...args);
  };

  setIpConfig: OmitFirstArg<typeof wdp['setIpConfig']> = function (this: Wdp, ...args) {
    return wdp.setIpConfig(this.ctx, ...args);
  };

  setComputerName: OmitFirstArg<typeof wdp['setComputerName']> = function (this: Wdp, ...args) {
    return wdp.setComputerName(this.ctx, ...args);
  };

  getComputerName: OmitFirstArg<typeof wdp['getComputerName']> = function (this: Wdp, ...args) {
    return wdp.getComputerName(this.ctx, ...args);
  };

  getXboxInfo: OmitFirstArg<typeof wdp['getXboxInfo']> = function (this: Wdp, ...args) {
    return wdp.getXboxInfo(this.ctx, ...args);
  };

  getOsInfo: OmitFirstArg<typeof wdp['getOsInfo']> = function (this: Wdp, ...args) {
    return wdp.getOsInfo(this.ctx, ...args);
  };

  getDeviceFamily: OmitFirstArg<typeof wdp['getDeviceFamily']> = function (this: Wdp, ...args) {
    return wdp.getDeviceFamily(this.ctx, ...args);
  };

  startCustomWprTrace: OmitFirstArg<typeof wdp['startCustomWprTrace']> = function (this: Wdp, ...args) {
    return wdp.startCustomWprTrace(this.ctx, ...args);
  };

  startCustomWprBootTrace: OmitFirstArg<typeof wdp['startCustomWprBootTrace']> = function (this: Wdp, ...args) {
    return wdp.startCustomWprBootTrace(this.ctx, ...args);
  };

  startWprTrace: OmitFirstArg<typeof wdp['startWprTrace']> = function (this: Wdp, ...args) {
    return wdp.startWprTrace(this.ctx, ...args);
  };

  startWprBootTrace: OmitFirstArg<typeof wdp['startWprBootTrace']> = function (this: Wdp, ...args) {
    return wdp.startWprBootTrace(this.ctx, ...args);
  };

  stopWprTrace: OmitFirstArg<typeof wdp['stopWprTrace']> = function (this: Wdp, ...args) {
    return wdp.stopWprTrace(this.ctx, ...args);
  };

  stopWprBootTrace: OmitFirstArg<typeof wdp['stopWprBootTrace']> = function (this: Wdp, ...args) {
    return wdp.stopWprBootTrace(this.ctx, ...args);
  };

  getWprTraceState: OmitFirstArg<typeof wdp['getWprTraceState']> = function (this: Wdp, ...args) {
    return wdp.getWprTraceState(this.ctx, ...args);
  };

  getWprTraces: OmitFirstArg<typeof wdp['getWprTraces']> = function (this: Wdp, ...args) {
    return wdp.getWprTraces(this.ctx, ...args);
  };

  getWprTrace: OmitFirstArg<typeof wdp['getWprTrace']> = function (this: Wdp, ...args) {
    return wdp.getWprTrace(this.ctx, ...args);
  };

  deleteWprTrace: OmitFirstArg<typeof wdp['deleteWprTrace']> = function (this: Wdp, ...args) {
    return wdp.deleteWprTrace(this.ctx, ...args);
  };

  getPowerState: OmitFirstArg<typeof wdp['getPowerState']> = function (this: Wdp, ...args) {
    return wdp.getPowerState(this.ctx, ...args);
  };

  getBatteryState: OmitFirstArg<typeof wdp['getBatteryState']> = function (this: Wdp, ...args) {
    return wdp.getBatteryState(this.ctx, ...args);
  };

  getPowerConfig: OmitFirstArg<typeof wdp['getPowerConfig']> = function (this: Wdp, ...args) {
    return wdp.getPowerConfig(this.ctx, ...args);
  };

  setPowerConfig: OmitFirstArg<typeof wdp['setPowerConfig']> = function (this: Wdp, ...args) {
    return wdp.setPowerConfig(this.ctx, ...args);
  };

  setPowerActiveScheme: OmitFirstArg<typeof wdp['setPowerActiveScheme']> = function (this: Wdp, ...args) {
    return wdp.setPowerActiveScheme(this.ctx, ...args);
  };

  getPowerActiveScheme: OmitFirstArg<typeof wdp['getPowerActiveScheme']> = function (this: Wdp, ...args) {
    return wdp.getPowerActiveScheme(this.ctx, ...args);
  };

  getSleepStudyReports: OmitFirstArg<typeof wdp['getSleepStudyReports']> = function (this: Wdp, ...args) {
    return wdp.getSleepStudyReports(this.ctx, ...args);
  };

  getSleepStudyReport: OmitFirstArg<typeof wdp['getSleepStudyReport']> = function (this: Wdp, ...args) {
    return wdp.getSleepStudyReport(this.ctx, ...args);
  };

  getSleepStudyTransform: OmitFirstArg<typeof wdp['getSleepStudyTransform']> = function (this: Wdp, ...args) {
    return wdp.getSleepStudyTransform(this.ctx, ...args);
  };

  getRootKeys: OmitFirstArg<typeof wdp['getRootKeys']> = function (this: Wdp, ...args) {
    return wdp.getRootKeys(this.ctx, ...args);
  };

  getSubKeys: OmitFirstArg<typeof wdp['getSubKeys']> = function (this: Wdp, ...args) {
    return wdp.getSubKeys(this.ctx, ...args);
  };

  getRegValues: OmitFirstArg<typeof wdp['getRegValues']> = function (this: Wdp, ...args) {
    return wdp.getRegValues(this.ctx, ...args);
  };

  restart: OmitFirstArg<typeof wdp['restart']> = function (this: Wdp, ...args) {
    return wdp.restart(this.ctx, ...args);
  };

  shutdown: OmitFirstArg<typeof wdp['shutdown']> = function (this: Wdp, ...args) {
    return wdp.shutdown(this.ctx, ...args);
  };

  getPhysicalControllers: OmitFirstArg<typeof wdp['getPhysicalControllers']> = function (this: Wdp, ...args) {
    return wdp.getPhysicalControllers(this.ctx, ...args);
  };

  disconnectPhysicalControllers: OmitFirstArg<typeof wdp['disconnectPhysicalControllers']> = function (this: Wdp, ...args) {
    return wdp.disconnectPhysicalControllers(this.ctx, ...args);
  };

  getRemoteInput: OmitFirstArg<typeof wdp['getRemoteInput']> = function (this: Wdp, ...args) {
    return wdp.getRemoteInput(this.ctx, ...args);
  };

  getProcesses: OmitFirstArg<typeof wdp['getProcesses']> = function (this: Wdp, ...args) {
    return wdp.getProcesses(this.ctx, ...args);
  };

  getSystemPerformanceStatistics: OmitFirstArg<typeof wdp['getSystemPerformanceStatistics']> = function (this: Wdp, ...args) {
    return wdp.getSystemPerformanceStatistics(this.ctx, ...args);
  };

  getSmbCredentials: OmitFirstArg<typeof wdp['getSmbCredentials']> = function (this: Wdp, ...args) {
    return wdp.getSmbCredentials(this.ctx, ...args);
  };

  getSettings: OmitFirstArg<typeof wdp['getSettings']> = function (this: Wdp, ...args) {
    return wdp.getSettings(this.ctx, ...args);
  };

  getSetting: OmitFirstArg<typeof wdp['getSetting']> = function (this: Wdp, ...args) {
    return wdp.getSetting(this.ctx, ...args);
  };

  setSetting: OmitFirstArg<typeof wdp['setSetting']> = function (this: Wdp, ...args) {
    return wdp.setSetting(this.ctx, ...args);
  };

  startApp: OmitFirstArg<typeof wdp['startApp']> = function (this: Wdp, ...args) {
    return wdp.startApp(this.ctx, ...args);
  };

  stopApp: OmitFirstArg<typeof wdp['stopApp']> = function (this: Wdp, ...args) {
    return wdp.stopApp(this.ctx, ...args);
  };

  suspendApp: OmitFirstArg<typeof wdp['suspendApp']> = function (this: Wdp, ...args) {
    return wdp.suspendApp(this.ctx, ...args);
  };

  resumeApp: OmitFirstArg<typeof wdp['resumeApp']> = function (this: Wdp, ...args) {
    return wdp.resumeApp(this.ctx, ...args);
  };

  stopProcess: OmitFirstArg<typeof wdp['stopProcess']> = function (this: Wdp, ...args) {
    return wdp.stopProcess(this.ctx, ...args);
  };

  getSignedInUser: OmitFirstArg<typeof wdp['getSignedInUser']> = function (this: Wdp, ...args) {
    return wdp.getSignedInUser(this.ctx, ...args);
  };

  getUsers: OmitFirstArg<typeof wdp['getUsers']> = function (this: Wdp, ...args) {
    return wdp.getUsers(this.ctx, ...args);
  };

  deleteUser: OmitFirstArg<typeof wdp['deleteUser']> = function (this: Wdp, ...args) {
    return wdp.deleteUser(this.ctx, ...args);
  };

  addUser: OmitFirstArg<typeof wdp['addUser']> = function (this: Wdp, ...args) {
    return wdp.addUser(this.ctx, ...args);
  };

  setUserSignInState: OmitFirstArg<typeof wdp['setUserSignInState']> = function (this: Wdp, ...args) {
    return wdp.setUserSignInState(this.ctx, ...args);
  };

  getWindows: OmitFirstArg<typeof wdp['getWindows']> = function (this: Wdp, ...args) {
    return wdp.getWindows(this.ctx, ...args);
  };

  getWirelessInterfaces: OmitFirstArg<typeof wdp['getWirelessInterfaces']> = function (this: Wdp, ...args) {
    return wdp.getWirelessInterfaces(this.ctx, ...args);
  };

  getAvailableWirelessNetworks: OmitFirstArg<typeof wdp['getAvailableWirelessNetworks']> = function (this: Wdp, ...args) {
    return wdp.getAvailableWirelessNetworks(this.ctx, ...args);
  };

  connectToNetwork: OmitFirstArg<typeof wdp['connectToNetwork']> = function (this: Wdp, ...args) {
    return wdp.connectToNetwork(this.ctx, ...args);
  };

  connectToNetworkUsingProfile: OmitFirstArg<typeof wdp['connectToNetworkUsingProfile']> = function (this: Wdp, ...args) {
    return wdp.connectToNetworkUsingProfile(this.ctx, ...args);
  };

  disconnectFromNetwork: OmitFirstArg<typeof wdp['disconnectFromNetwork']> = function (this: Wdp, ...args) {
    return wdp.disconnectFromNetwork(this.ctx, ...args);
  };

  deleteWifiProfile: OmitFirstArg<typeof wdp['deleteWifiProfile']> = function (this: Wdp, ...args) {
    return wdp.deleteWifiProfile(this.ctx, ...args);
  };

  getXboxLiveSandbox: OmitFirstArg<typeof wdp['getXboxLiveSandbox']> = function (this: Wdp, ...args) {
    return wdp.getXboxLiveSandbox(this.ctx, ...args);
  };

  setXboxLiveSandbox: OmitFirstArg<typeof wdp['setXboxLiveSandbox']> = function (this: Wdp, ...args) {
    return wdp.setXboxLiveSandbox(this.ctx, ...args);
  };
}
