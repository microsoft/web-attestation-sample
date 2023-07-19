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
  // pull in dependencies from node_modules
  resolve({ browser: true }),

  // allow CommonJS/UMD modules to be imported
  commonjs(),

  !isDebug && terser({
    output: {
      comments: function (node, comment) {
        // remove all comment except those starting with '!'
        return comment.value.startsWith('!')
      }
    }
  }),
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

      // removes node's crypto import
      // 'output.globals' does not work with esm
      // 'external' does not remove the import - it just prevents the bundling
      externalGlobals({
        crypto: 'crypto'
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
      copy({
        targets: [
          { src: 'public/popup/popup.html', dest: 'dist/chrome' },
          { src: 'public/popup/popup.css', dest: 'dist/chrome' },
          { src: 'public/options/options.html', dest: 'dist/chrome' },
          { src: 'public/options/options.css', dest: 'dist/chrome' },
          { src: 'public/icons', dest: 'dist/chrome' },
          { src: 'dist/chrome', dest: 'dist', rename: 'firefox' },
          { src: 'src/manifest.chrome.json', dest: 'dist/chrome', rename: 'manifest.json' },
          { src: 'src/manifest.firefox.json', dest: 'dist/firefox', rename: 'manifest.json' }
        ],
        hook: 'writeBundle' // wait until the bundle is written
      })
    ],
    onwarn (warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY' && !isDebug) return
      warn(warning)
    }
  }
]
