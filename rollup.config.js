import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      format: 'module',
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      format: 'module',
    },
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        react: Object.keys(require('react')),
        'react-is': Object.keys(require('react-is')),
        'node_modules/react/react.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement',
        ],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
  ],
}
