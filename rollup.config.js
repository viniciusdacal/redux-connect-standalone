import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

var env = process.env.NODE_ENV
var config = {
  format: 'umd',
  moduleName: 'ReduxConnectStandalone',
  external: ['redux', 'react-redux', 'react', 'prop-types'],
  globals: {
    'redux': 'redux',
    'prop-types': 'prop-types',
    'react-redux': 'react-redux',
    'react': 'React',
  },
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: [
        '**/node_modules/**',
        'src/__mocks__/**',
      ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
