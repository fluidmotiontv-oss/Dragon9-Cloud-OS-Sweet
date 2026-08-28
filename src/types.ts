export interface SatelliteNode {
  name: string;
  elevation: string;
  latencyMs: number;
  rssiDbm: number;
  bandwidthMbps: number;
  status: 'ACTIVE_LINK' | 'STANDBY';
}

export interface ThinClientStats {
  zeroStorageVerified: boolean;
  batterySaveRatio: string;
  localPowerUsageWatt: number;
  traditionalPowerUsageWatt: number;
  displayReceiverResolution: string;
  inputStreamerPollingHz: number;
  killSwitchArmed: boolean;
}

export interface WaydroidInstance {
  id: string;
  name: string;
  status: 'running' | 'restarting' | 'stopped';
  fps: number;
  codec: string;
  bitrateMbps: number;
  latencyMs: number;
  memoryMb: number;
}

export interface VaultFile {
  id: string;
  name: string;
  size: string;
  encrypted: boolean;
  location: string;
}

export interface SystemLog {
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'CRITICAL' | 'SECURITY' | 'NETWORK' | 'STREAM' | 'CONTAINER';
  source: string;
  message: string;
}

export interface TimingEngineStats {
  ptpDriftMicroseconds: number;
  ptpSyncStatus: string;
  ntpOffsetMs: number;
}

export interface TelemetryData {
  sessionActive: boolean;
  activeSatNode: string;
  satellites: SatelliteNode[];
  thinClient: ThinClientStats;
  waydroidInstances: WaydroidInstance[];
  vaultEncryptedFiles: VaultFile[];
  systemLogs: SystemLog[];
  timingEngine: TimingEngineStats;
}

export interface ComparisonPillar {
  title: string;
  traditional: string;
  dragon9: string;
  iconName: string;
  advantage: string;
}
