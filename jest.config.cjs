// jest.config.js
/** 
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Mencocokkan semua file tes yang berada dalam folder "tests" dengan ekstensi .test.js atau .test.ts
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)',
  ],

  // Setup file untuk testing environment sebelum setiap tes
  setupFiles: ['fake-indexeddb/auto'],

  // Environment yang akan digunakan untuk pengujian
  testEnvironment: 'jsdom',

  // Konfigurasi transform untuk mendukung Babel dan ESM
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },

  // Abaikan transformasi di node_modules untuk optimasi
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Mapper untuk menghindari error pada impor SCSS dan CSS
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
