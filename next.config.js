module.exports = {
  transpilePackages: ['react-syntax-highlighter'],
  webpack: (config) => {
    // Inline SVG
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test && rule.test.test('.svg')) {
        rule.test = RegExp(rule.test.toString().replace('|svg', ''));
      }
      return rule;
    });
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset/source',
    });

    return config;
  },
};
