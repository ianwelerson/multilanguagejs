module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:jest/all'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'jest'
  ],
  rules: {
    'jest/no-hooks': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/no-disabled-tests': 'warn',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'max-len': ['error', { code: 100, ignoreComments: true }]
  }
}
