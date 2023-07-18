import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import externalGlobals from 'rollup-plugin-external-globals'
import typescript from 'rollup-plugin-typescript2'

const isDebug = process.env.NODE_ENV !== 'production'

const copyright = `
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT license.
 */`

const commonPlugins = [
  !isDebug && terser(),
  typescript({
    tsconfig: 'tsconfig.json'
  })
]

export default [
  {
    external: ['crypto'],
    input: {
      background: 'src/background/index.ts',
      popup: 'src/popup/index.ts',
      options: 'src/options/index.ts'
    },
    output: {
      dir: 'dist/chrome',
      format: 'esm',
      sourcemap: isDebug ? 'inline' : false,
      banner: isDebug ? undefined : copyright,
      entryFileNames: '[name].js',
      chunkFileNames: 'common-[name].js'
    },
    plugins: [
      commonPlugins,

      // pull in dependencies from node_modules
      resolve({ browser: true }),

      // allow CommonJS modules to be imported - cryptoMath.js is commonjs
      commonjs(),

      // removes node crypto import
      // 'output.globals' does not work with esm
      // 'external' does not remove - just does not bundle
      externalGlobals({
        crypto: 'crypto'
      }),

      copy({
        targets: [
          { src: 'public/popup/popup.html', dest: 'dist/chrome' },
          { src: 'public/popup/popup.css', dest: 'dist/chrome' },
          { src: 'public/options/options.html', dest: 'dist/chrome' },
          { src: 'public/options/options.css', dest: 'dist/chrome' },
          // Move the below to another section if you decided to omit this options sections
          // These are not specific to 'options' but needs to be triggered from somewhere
          { src: 'public/icons', dest: 'dist/chrome' },
          { src: 'dist/chrome', dest: 'dist', rename: 'firefox' },
          { src: 'src/manifest.chrome.json', dest: 'dist/chrome', rename: 'manifest.json' },
          { src: 'src/manifest.firefox.json', dest: 'dist/firefox', rename: 'manifest.json' }
        ]
      })
    ],
    onwarn (warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY' && !isDebug) return
      warn(warning)
    }
  },
  {
    input: 'src/content/index.ts',
    output: {
      file: 'dist/chrome/content.js',
      format: 'iife',
      sourcemap: isDebug ? 'inline' : false,
      banner: isDebug ? undefined : copyright
    },
    plugins: [
      commonPlugins,
      resolve()
    ],
    onwarn (warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY' && !isDebug) return
      warn(warning)
    }
  }
]
