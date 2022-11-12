import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.exports.import,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.exports.require,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
  ],
};
