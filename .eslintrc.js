module.exports = {
  'env': {
    'browser': true,
    'commonjs': true
  },
  'extends': [
    'plugin:react/recommended',
    'google'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'parser': 'babel-eslint',
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': 'off',
    /*"linebreak-style": [
      "error",
      "unix"
    ],*/
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'require-jsdoc': 'off',
    'max-len': 'off', // 单行长度
    'comma-dangle': [2, 'never'],
    'no-invalid-this': 'off', // this
    'react/prop-types': 'off',
    'react/no-string-refs': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'indent': 'off',
    'guard-for-in': 'off',
    "object-curly-spacing": "off", // 大括号内是否允许不必要的空格
    "no-multi-spaces":0,
    "camelcase":0
  }
}
