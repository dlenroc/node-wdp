import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({ tsconfig: __dirname + '/tsconfig.json' }),
  ],
};
