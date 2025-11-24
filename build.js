import { build } from 'esbuild';
import fs from 'fs';

console.log('🔨 Building CommonJS bundle...\n');

try {
  // Ensure dist directory exists
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist', { recursive: true });
  }

  await build({
    entryPoints: ['src/index.js'],
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'cjs',
    outfile: 'dist/index.cjs',
    external: [
      'node-fetch'
    ],
    minify: false,
    sourcemap: false,
    logLevel: 'info'
  });

  console.log('\n✅ CommonJS bundle created: dist/index.cjs');
  console.log('📦 Package is ready for publishing!\n');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}