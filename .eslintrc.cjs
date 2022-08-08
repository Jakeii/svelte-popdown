module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
  rules: {
    'quotes': [ 'error', 'single' ],
    'curly': [ 'error' ],
    'brace-style': 'error',
    'keyword-spacing': [ 'error' ],
    'indent': [ 'error', 2 ],
    'no-multiple-empty-lines': 'error',
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'array-bracket-newline': 2,
    'operator-linebreak': 2,
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-property-newline': 2,
    'array-element-newline': [
      'error',
      {
        ArrayExpression: 'consistent',
      },
    ],
    'object-curly-newline': [
      'error', {
        'multiline': true,
        'consistent': true,
      },
    ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'no-trailing-spaces': [ 'error' ],
    'semi': [ 'error' ],
    'no-undef': 'error',
  }
};
