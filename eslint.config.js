import baseConfig from '@jsimck/eslint-config';

export default [
  ...baseConfig,
  {
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
];
