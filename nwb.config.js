module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: {
      global: 'vert',
      externals: {}
    }
  },
  babel: {
    plugins: [
      'transform-flow-strip-types',
      ['transform-react-jsx', { pragma: 'h' }]
    ]
  }
}
