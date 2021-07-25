module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'indent': ['error', 2, {'SwitchCase': 1, 'VariableDeclarator': 1}],
    'max-len': ['error', {'code': 120}],
    'semi': ['error', 'never'],

    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'require-jsdoc': 'off',
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
}
