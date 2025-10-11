import next from 'eslint-config-next';

export default [
  ...next,
  {
    rules: {
      'react/jsx-key': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  }
];