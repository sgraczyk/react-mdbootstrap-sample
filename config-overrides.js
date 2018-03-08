const rewireTypescript = require('react-app-rewire-typescript');

module.exports = {
  webpack: function (config, env) {
    config = rewireTypescript(config, env);

    return config;
  },
  jest: function (config) {
    config.transform = {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.css?$': 'jest-css-modules'
    };
    config.testMatch = [
      '<rootDir>/src/**/__tests__/**/*.{ts,tsx,mjs}',
      '<rootDir>/src/**/?(*.)(spec|test).{ts,tsx,mjs}'
    ];
    config.moduleFileExtensions = [
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'node'
    ];
    config.setupTestFrameworkScriptFile = '<rootDir>/config/jest/setup-tests.ts'

    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      return configFunction(proxy, allowedHost);
    }
  }
}
