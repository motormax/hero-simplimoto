/* eslint-env browser */
/* eslint-disable import/no-extraneous-dependencies */
require('jest-plugins')([
  // List all jest-plugins here.
  'jest-plugin-action',
  'jest-plugin-context',
  'jest-plugin-its',
  'jest-plugin-set',
]);

window.matchMedia = window.matchMedia || jest.fn(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));
