'use strict';

module.exports = {
    env: {
        es6: true,
        node: true,
        mocha: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 5,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    globals: {},
    rules: {
        indent: ['error', 4], 'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'], semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'max-len': ["error", 120],
    },
};
