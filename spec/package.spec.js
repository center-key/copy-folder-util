// copy-folder-util
// Package Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import fs from 'node:fs';

// Setup
import { copyFolder } from '../dist/copy-folder.js';

////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual = fs.readdirSync('dist').sort();
      const expected = [
         'copy-folder.d.ts',
         'copy-folder.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const version =  copyFolder.version;
      const semVer =   /\d+[.]\d+[.]\d+/;
      const actual =   { version: version, valid: semVer.test(version) };
      const expected = { version: version, valid: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Library module', () => {

   it('is exported as an object', () => {
      const actual =   { type: typeof copyFolder };
      const expected = { type: 'object' };
      assertDeepStrictEqual(actual, expected);
      });

   it('has functions named assert(), cp(), and reporter()', () => {
      const module = copyFolder;
      const actual = Object.keys(module).sort().map(key => [key, typeof module[key]]);
      const expected = [
         ['assertOk',   'function'],
         ['cli',        'function'],
         ['cp',         'function'],
         ['extraneous', 'object'],
         ['reporter',   'function'],
         ['version',    'string'],
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
