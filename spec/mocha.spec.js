// copy-folder-cli
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import assert from 'assert';
import slash from 'slash';

// Setup
import { copyFolder } from '../dist/copy-folder.js';

// Utilities
const readDirSync = (folder) => readdirSync(folder).map(file => slash(file)).sort();
const readDirSyncRecursive = (folder, files) => {
   files = files ?? [];
   const process = (file) => {
      if (statSync(folder + '/' + file).isDirectory())
         files = readDirSyncRecursive(folder + '/' + file, files);
      else
         files.push(slash(join(folder, '/', file)));
      };
   readdirSync(folder).forEach(process);
   return files.sort();
   };

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual = readDirSync('dist');
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
describe('Calling copyFolder.cp() with no options', () => {

   it('copies all files in the source folder to the target folder', () => {
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
describe('Calling copyFolder.cp() with the fileExtensions option', () => {

   it('set to undefined results in all files being copied', () => {
      const source = 'spec/fixtures/source/subfolder';
      const target = 'spec/fixtures/target/default';
      copyFolder.cp(source, target, { fileExtensions: undefined });
      const actual = readDirSyncRecursive(target);
      const expected = [
         'spec/fixtures/target/default/mock2.html',
         'spec/fixtures/target/default/mock2.js',
         'spec/fixtures/target/default/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   it('set to ".js" only copies the JavaScript files', () => {
      const source = 'spec/fixtures/source';
      const target = 'spec/fixtures/target/js';
      copyFolder.cp(source, target, { fileExtensions: ['.js'] });
      const actual = readDirSyncRecursive(target);
      const expected = [
         'spec/fixtures/target/js/mock1.js',
         'spec/fixtures/target/js/subfolder/mock2.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Correct error is thrown', () => {

   it('when the "source" folder is missing', () => {
      const makeBogusCall = () => copyFolder.cp();
      const exception =     { message: '[copy-folder-cli] Must specify the source folder path.' };
      assert.throws(makeBogusCall, exception);
      });

   it('when the "target" folder is missing', () => {
      const makeBogusCall = () => copyFolder.cp('/source-folder');
      const exception =     { message: '[copy-folder-cli] Must specify the target folder path.' };
      assert.throws(makeBogusCall, exception);
      });

   });
