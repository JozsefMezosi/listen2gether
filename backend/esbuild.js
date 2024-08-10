import { build } from 'esbuild';

build({
  entryPoints: ['./src/server.ts'],
  outfile: './dist/server.cjs',
  format: 'cjs',
  platform: 'node',
  minify: true,
  bundle: true,
}).catch((error) => {
  console.error(error);
});