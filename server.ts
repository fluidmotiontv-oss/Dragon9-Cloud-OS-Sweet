import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily / safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// System state simulation engine
let sessionActive = true;
let activeSatNode = "STARLINK-ENT-LEO-8422";
let waydroidInstances = [
  { id: "wd-01", name: "Fluid Motion Phone OS (Android 14 Waydroid)", status: "running", fps: 120, codec: "AV1 Hardware Decode", bitrateMbps: 18.5, latencyMs: 22, memoryMb: 1840 },
  { id: "wd-02", name: "Sovereign Linux Workspace Container", status: "running", fps: 60, codec: "H.265 Ultra Low Latency", bitrateMbps: 12.2, latencyMs: 24, memoryMb: 1210 },
  { id: "wd-03", name: "SIP Telephony / Encrypted Baseband Daemon", status: "running", fps: 0, codec: "OPUS Direct SIP", bitrateMbps: 0.12, latencyMs: 14, memoryMb: 240 }
];
let vaultEncryptedFiles = [
  { id: "f-101", name: "Sovereign_Identity_Key_v9.pem", size: "4.2 KB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" },
  { id: "f-102", name: "Kite_Rider_LEO_Backhaul_Cert.crt", size: "12.8 KB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" },
  { id: "f-103", name: "SIP_Trunk_Direct_Dial_Config.json", size: "8.1 KB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" },
  { id: "f-104", name: "Fluid_Motion_Media_Stream_Cache.raw", size: "1.2 GB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" }
];

let systemLogs = [
  { timestamp: new Date().toISOString(), level: "INFO", source: "LEO-Backhaul", message: "Kite Rider satellite handshake established (<24ms latency target met)." },
  { timestamp: new Date().toISOString(), level: "SECURITY", source: "Zero-Trust", message: "Thin client device verified. Zero local storage validated." },
  { timestamp: new Date().toISOString(), level: "STREAM", source: "Fluid-Motion-Engine", message: "Stream output bound to AV1 120 FPS display receiver." }
];

// Helper to push system log
const addLog = (level: string, source: string, message: string) => {
  systemLogs.unshift({
    timestamp: new Date().toISOString(),
    level,
    source,
    message
  });
  if (systemLogs.length > 50) systemLogs.pop();
};

// API: Telemetry
app.get("/api/dragon9/telemetry", (req, res) => {
  res.json({
    sessionActive,
    activeSatNode,
    satellites: [
      { name: "STARLINK-ENT-LEO-8422", elevation: "78°", latencyMs: 22.4, rssiDbm: -68, bandwidthMbps: 340, status: activeSatNode === "STARLINK-ENT-LEO-8422" ? "ACTIVE_LINK" : "STANDBY" },
      { name: "STARLINK-ENT-LEO-9104", elevation: "62°", latencyMs: 28.1, rssiDbm: -72, bandwidthMbps: 310, status: activeSatNode === "STARLINK-ENT-LEO-9104" ? "ACTIVE_LINK" : "STANDBY" },
      { name: "KITE-RIDER-BALLOON-003", elevation: "88°", latencyMs: 14.8, rssiDbm: -54, bandwidthMbps: 450, status: activeSatNode === "KITE-RIDER-BALLOON-003" ? "ACTIVE_LINK" : "STANDBY" },
      { name: "GCP-SOVEREIGN-RELAY-01", elevation: "Ground VPS", latencyMs: 8.2, rssiDbm: -42, bandwidthMbps: 1000, status: activeSatNode === "GCP-SOVEREIGN-RELAY-01" ? "ACTIVE_LINK" : "STANDBY" }
    ],
    thinClient: {
      zeroStorageVerified: true,
      batterySaveRatio: "3.5x extended battery vs local flagship CPU/GPU",
      localPowerUsageWatt: 1.4,
      traditionalPowerUsageWatt: 8.2,
      displayReceiverResolution: "2560x1440 @ 120Hz",
      inputStreamerPollingHz: 1000,
      killSwitchArmed: true
    },
    waydroidInstances,
    vaultEncryptedFiles,
    systemLogs,
    timingEngine: {
      ptpDriftMicroseconds: 0.14,
      ptpSyncStatus: "LOCKED_PTP_GRANDMASTER",
      ntpOffsetMs: 0.02
    }
  });
});

// API: Action endpoint
app.post("/api/dragon9/action", (req, res) => {
  const { action, payload } = req.body;

  if (action === "kill_session") {
    sessionActive = false;
    addLog("CRITICAL", "Session-Revoker", "Instant Remote Session Revoked. Thin client buffer purged. Zero data trace left on endpoint.");
    return res.json({ success: true, message: "Session revoked immediately.", sessionActive });
  }

  if (action === "reconnect_session") {
    sessionActive = true;
    addLog("SECURITY", "Session-Manager", "Sovereign handshake restored with Thin Client endpoint.");
    return res.json({ success: true, message: "Session re-established.", sessionActive });
  }

  if (action === "failover_satellite") {
    const target = payload?.node || "KITE-RIDER-BALLOON-003";
    activeSatNode = target;
    addLog("NETWORK", "Kite-Rider-LEO", `Doppler shift handover executed to node ${target}. Latency optimized.`);
    return res.json({ success: true, activeSatNode, message: `Handover complete to ${target}` });
  }

  if (action === "wipe_vault") {
    const count = vaultEncryptedFiles.length;
    vaultEncryptedFiles = [];
    addLog("SECURITY", "Sovereign-Vault", `Zero-Knowledge Vault cryptographic emergency wipe triggered (${count} items un-recoverably purged).`);
    return res.json({ success: true, message: "Cryptographic vault key shredded." });
  }

  if (action === "restart_waydroid") {
    const { instanceId } = payload;
    const inst = waydroidInstances.find(i => i.id === instanceId);
    if (inst) {
      inst.status = "restarting";
      addLog("CONTAINER", "Waydroid-Engine", `Restarting container instance ${inst.name}...`);
      setTimeout(() => {
        inst.status = "running";
        addLog("CONTAINER", "Waydroid-Engine", `Container instance ${inst.name} is online and operational.`);
      }, 1500);
    }
    return res.json({ success: true, waydroidInstances });
  }

  return res.status(400).json({ error: "Unknown action" });
});

// API: AI Assistant
app.post("/api/dragon9/ai-assistant", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response if API key is not configured in local environment
      return res.json({
        answer: `[Dragon 9 Sovereign AI Inspector - Local Offline Engine]
Analyzing infrastructure prompt: "${prompt}"

• Security Assessment: All thin-client inputs are securely streamed using encrypted zero-trust WebSocket pipelines. Zero local flash storage footprint maintained.
• Latency Strategy: LEO Satellite Backhaul current link (${activeSatNode}) maintains <25ms RTT. PTP grandmaster synchronized.
• Waydroid Status: 3 active container instances operating in sovereign memory isolations.

Note: Provide your GEMINI_API_KEY in Settings > Secrets to activate real-time Gemini 3.6 reasoning!`,
        source: "offline-rule-engine"
      });
    }

    const systemInstruction = `You are the Dragon 9 Sovereign AI Infrastructure Advisor & Cloud OS Systems Engineer.
You specialize in:
- Dragon 9 ICP / ISP Architecture (Zero-Storage Phone, Display Receiver, Input Streamer)
- Kite Rider & LEO Satellite Low-Latency Backhaul (<40ms latency, Starlink Enterprise, Doppler shift handovers)
- Sovereign Linux Server, Waydroid Cloud OS Containerization, Fluid Motion Media Engine (AV1/H.265 streaming)
- Sovereign Storage & Cryptographic Vault (Zero-knowledge, instant cryptographic shredding)
- Synchronised PTP/NTP Timing Engine & Direct SIP Cloud Telephony
- Comparing Dragon 9 Sovereign Model vs Traditional $1,000+ local processor smartphones.

Be crisp, technical, confident, authoritative, and structured. Use concise bullet points and technical metrics where relevant.`;

    const userPromptWithTelemetry = `
User Question: ${prompt}

Current Live System Telemetry Context:
- Active Satellite Link: ${activeSatNode}
- Active Session Status: ${sessionActive ? "CONNECTED" : "REVOKED"}
- Thin Client: Zero-Storage, Battery Save 3.5x, AV1 120Hz display stream
- Containers: ${waydroidInstances.map(w => `${w.name} (${w.status}, ${w.fps}FPS)`).join(", ")}
${context ? `Additional Context: ${JSON.stringify(context)}` : ""}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPromptWithTelemetry,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return res.json({
      answer: response.text || "No response generated from Dragon 9 AI Engine.",
      source: "gemini-3.6-flash"
    });
  } catch (error: any) {
    console.error("Gemini AI Assistant error:", error);
    return res.status(500).json({
      error: "Failed to query Dragon 9 Sovereign AI Assistant.",
      details: error.message
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dragon 9 Sovereign Cloud Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
