module.exports = {
  webpack: (config, {dev, isServer}) => {
    // Replace React with Preact only in production
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    // Inline SVG
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test && rule.test.test('.svg')) {
        rule.test = RegExp(rule.test.toString().replace('|svg', ''))
      }
      return rule
    })
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset/source'
    })

    return config
  },
}
