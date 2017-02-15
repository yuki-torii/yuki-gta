import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

let targets = [ { dest: 'dist/yuki-gta.js', format: 'umd' } ]

if (process.env.BUILD) {
  targets = targets.concat([
    { dest: 'dist/yuki-gta.common.js', format: 'cjs' },
    { dest: 'dist/yuki-gta.es5.js', format: 'es' }
  ])
}

export default {
  entry: 'src/index.js',
  plugins: [buble(), nodeResolve(), commonjs()],
  moduleName: 'yuki-gta',
  targets: targets
}
