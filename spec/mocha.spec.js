// copy-folder-cli
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import assert from 'assert';

// Setup
import { copyFolder } from '../dist/copy-folder.js';

// Utilities
const readDirSyncRecursive = (folder, files) => {
   files = files ?? [];
   const process = (file) => {
      if (statSync(folder + '/' + file).isDirectory())
         files = readDirSyncRecursive(folder + '/' + file, files);
      else
         files.push(join(folder, '/', file));
      };
   readdirSync(folder).forEach(process);
   return files.sort();
   };

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual = readdirSync('dist').sort();
      const expected = [
         'copy-folder.d.ts',
         'copy-folder.js',
         'copy-folder.umd.cjs',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Library module', () => {

   it('is an object', () => {
      const actual =   { constructor: copyFolder.constructor.name };
      const expected = { constructor: 'Object' };
      assertDeepStrictEqual(actual, expected);
      });

   it('has a cp() function', () => {
      const actual =   { validate: typeof copyFolder.cp };
      const expected = { validate: 'function' };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Calling copyFolder.cp()', () => {

   it('copies all files in the source folder to the destination folder', () => {
      const source = 'spec/fixtures/source';
      const target = 'spec/fixtures/target/all';
      copyFolder.cp(source, target);
      const actual = readDirSyncRecursive(target);
      const expected = [
         'spec/fixtures/target/all/mock1.html',
         'spec/fixtures/target/all/mock1.js',
         'spec/fixtures/target/all/mock1.min.css',
         'spec/fixtures/target/all/subfolder/mock2.html',
         'spec/fixtures/target/all/subfolder/mock2.js',
         'spec/fixtures/target/all/subfolder/mock2.min.css',
        ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Correct error is thrown', () => {

   it('when "source" folder is missing', () => {
      const makeBogusCall = () => copyFolder.cp();
      const exception =     { message: '[copy-folder-cli] Must specify the "source" folder path.' };
      assert.throws(makeBogusCall, exception);
      });

   it('when "target" folder is missing', () => {
      const makeBogusCall = () => copyFolder.cp('/source-folder');
      const exception =     { message: '[copy-folder-cli] Must specify the "target" folder path.' };
      assert.throws(makeBogusCall, exception);
      });

   });
