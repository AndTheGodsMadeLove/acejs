import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

export default [
  // ESM + CJS + UMD build
  defineConfig({
    input: 'src/ace.js',
    output: [
      {
        file: 'dist/acejs.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/acejs.cjs.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/acejs.min.js',
        format: 'umd',
        name: 'acejs',
        plugins: [terser()],
        sourcemap: true,
      },
    ],
    external: [],
    plugins: [
      babel({ babelHelpers: 'bundled', extensions: ['.js'] }),
      terser()
    ],
  }),
  // Type definitions build
  defineConfig({
    input: 'src/ace.d.ts',
    output: [{ file: 'dist/acejs.d.ts', format: 'es' }],
    plugins: [dts()],
  }),
];
