module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    // 'no-console': [
    //   'error',
    //   {
    //     allow: [
    //       'warn',
    //       'error'
    //     ]
    //   }
    // ],
    'no-debugger': 'error',
    'sort-imports': 2,
    'vue/no-v-html': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
