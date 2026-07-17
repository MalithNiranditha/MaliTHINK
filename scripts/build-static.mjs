import { execSync } from 'node:child_process';
import { existsSync, rmSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, '.output');
const publicDir = path.join(outputDir, 'public');
const serverDir = path.join(outputDir, 'server');
const firebaseCacheDir = path.join(root, '.firebase');
const distDir = path.join(root, 'dist');

for (const dir of [outputDir, publicDir, serverDir, firebaseCacheDir, distDir]) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
}

mkdirSync(outputDir, { recursive: true });

execSync('npx vite build', {
  stdio: 'inherit',
  cwd: root,
  env: {
    ...process.env,
    NITRO_PRESET: 'firebase',
  },
});
