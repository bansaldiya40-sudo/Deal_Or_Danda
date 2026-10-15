// scripts/run-bridge.js
// Launches the local SQLite bridge and Cloudflare Tunnel simultaneously
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Start Bridge Server
const bridgePath = path.join(rootDir, 'scripts', 'bridge-server.js');
const bridgeProcess = spawn('node', [bridgePath], {
  cwd: rootDir,
  stdio: ['inherit', 'pipe', 'pipe'],
});

bridgeProcess.stdout.on('data', data => {
  const msg = data.toString();
  if (msg.includes('Status: Active')) {
    console.log('[Bridge Server] Listening on http://127.0.0.1:4001');
  }
});

bridgeProcess.stderr.on('data', data => {
  console.error('[Bridge Error]', data.toString().trim());
});

// 2. Start Cloudflare Tunnel
const cloudflaredExe = path.join(rootDir, 'scripts', 'bin', 'cloudflared.exe');
if (!fs.existsSync(cloudflaredExe)) {
  console.error(`[Error] cloudflared.exe not found at ${cloudflaredExe}`);
  process.exit(1);
}

const tunnelProcess = spawn(cloudflaredExe, ['tunnel', '--url', 'http://127.0.0.1:4001'], {
  cwd: rootDir,
  stdio: ['inherit', 'pipe', 'pipe'],
});

let tunnelUrlFound = false;

function processOutput(data) {
  const text = data.toString();
  const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
  if (match && !tunnelUrlFound) {
    tunnelUrlFound = true;
    const tunnelUrl = match[0];
    const secretPath = path.join(rootDir, '.bridge-secret');
    const secretToken = fs.existsSync(secretPath) ? fs.readFileSync(secretPath, 'utf-8').trim() : '';

    console.log(`\n================================================================`);
    console.log(` 🏏 DEAL OR DANDA — SECURE PRODUCTION BRIDGE ACTIVE`);
    console.log(`================================================================`);
    console.log(` Local Database : C:\\Deal_or_Danda\\deal_or_danda.db`);
    console.log(` Public Tunnel  : ${tunnelUrl}`);
    console.log(` Secret Token   : ${secretToken}`);
    console.log(`----------------------------------------------------------------`);
    console.log(` COPY THESE 2 ENVIRONMENT VARIABLES INTO VERCEL PROJECT SETTINGS:`);
    console.log(`   BRIDGE_TUNNEL_URL   = ${tunnelUrl}`);
    console.log(`   BRIDGE_SECRET_TOKEN = ${secretToken}`);
    console.log(`================================================================`);
    console.log(` Press Ctrl+C in this terminal when you want to stop the bridge.\n`);
  }
}

tunnelProcess.stdout.on('data', processOutput);
tunnelProcess.stderr.on('data', processOutput);

function shutdown() {
  console.log('\n[Shutting down local bridge and tunnel...]');
  bridgeProcess.kill();
  tunnelProcess.kill();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
