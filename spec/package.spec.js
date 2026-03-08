// copy-folder-util
// Package Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import fs from 'fs';

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
describe('Library module', () => {

   it('is an object', () => {
      const actual =   { constructor: copyFolder.constructor.name };
      const expected = { constructor: 'Object' };
      assertDeepStrictEqual(actual, expected);
      });

   it('has functions named assert(), cp(), and reporter()', () => {
      const module = copyFolder;
      const actual = Object.keys(module).sort().map(key => [key, typeof module[key]]);
      const expected = [
         ['assert',     'function'],
         ['cli',        'function'],
         ['cp',         'function'],
         ['extraneous', 'object'],
         ['reporter',   'function'],
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
