// copy-folder-util
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { execSync } from 'node:child_process';
import { revWebAssets } from 'rev-web-assets';
import assert from 'assert';
import fs from     'fs';

// Setup
import { copyFolder } from '../dist/copy-folder.js';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

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

   it('has a cp() function', () => {
      const actual =   { validate: typeof copyFolder.cp };
      const expected = { validate: 'function' };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Calling copyFolder.cp() with no options', () => {

   it('copies all files in the source folder to the target folder', () => {
      const source = 'spec/fixtures/source';
      const target = 'spec/fixtures/target/default';
      copyFolder.cp(source, target);
      const actual = revWebAssets.readFolderRecursive(target);
      const expected = [
         'spec/fixtures/target/default/mock1.html',
         'spec/fixtures/target/default/mock1.js',
         'spec/fixtures/target/default/mock1.min.css',
         'spec/fixtures/target/default/subfolder/mock2.html',
         'spec/fixtures/target/default/subfolder/mock2.js',
         'spec/fixtures/target/default/subfolder/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Calling copyFolder.cp() with the basename option', () => {

   it('set to undefined results in all files being copied', () => {
      const source = 'source';
      const target = 'target/basename';
      copyFolder.cp(source, target, { cd: 'spec/fixtures', basename: undefined });
      const actual = revWebAssets.readFolderRecursive('spec/fixtures/target/basename');
      const expected = [
         'spec/fixtures/target/basename/mock1.html',
         'spec/fixtures/target/basename/mock1.js',
         'spec/fixtures/target/basename/mock1.min.css',
         'spec/fixtures/target/basename/subfolder/mock2.html',
         'spec/fixtures/target/basename/subfolder/mock2.js',
         'spec/fixtures/target/basename/subfolder/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   it('set to "mock2" only copies the "mock2" files', () => {
      const source = 'source';
      const target = 'target/basename-mock2';
      copyFolder.cp(source, target, { cd: 'spec/fixtures', basename: 'mock2' });
      const actual = revWebAssets.readFolderRecursive('spec/fixtures/target/basename-mock2');
      const expected = [
         'spec/fixtures/target/basename-mock2/subfolder/mock2.html',
         'spec/fixtures/target/basename-mock2/subfolder/mock2.js',
         'spec/fixtures/target/basename-mock2/subfolder/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Calling copyFolder.cp() with the fileExtensions option', () => {

   it('set to undefined results in all files being copied', () => {
      const source = 'source';
      const target = 'target/ext';
      copyFolder.cp(source, target, { cd: 'spec/fixtures', fileExtensions: undefined });
      const actual = revWebAssets.readFolderRecursive('spec/fixtures/target/ext');
      const expected = [
         'spec/fixtures/target/ext/mock1.html',
         'spec/fixtures/target/ext/mock1.js',
         'spec/fixtures/target/ext/mock1.min.css',
         'spec/fixtures/target/ext/subfolder/mock2.html',
         'spec/fixtures/target/ext/subfolder/mock2.js',
         'spec/fixtures/target/ext/subfolder/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   it('set to ".js" only copies the JavaScript files', () => {
      const source = 'source';
      const target = 'target/ext-js';
      copyFolder.cp(source, target, { cd: 'spec/fixtures', fileExtensions: ['.js'] });
      const actual = revWebAssets.readFolderRecursive('spec/fixtures/target/ext-js');
      const expected = [
         'spec/fixtures/target/ext-js/mock1.js',
         'spec/fixtures/target/ext-js/subfolder/mock2.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Correct error is thrown', () => {

   it('when the "source" folder is missing', () => {
      const makeBogusCall = () => copyFolder.cp();
      const exception =     { message: '[copy-folder-util] Must specify the source folder path.' };
      assert.throws(makeBogusCall, exception);
      });

   it('when the "target" folder is missing', () => {
      const makeBogusCall = () => copyFolder.cp('/source-folder');
      const exception =     { message: '[copy-folder-util] Must specify the target folder path.' };
      assert.throws(makeBogusCall, exception);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Executing the CLI', () => {
   const run = (posix) => {
      const name =    Object.keys(pkg.bin).sort()[0];
      const command = process.platform === 'win32' ? posix.replaceAll('\\ ', '" "') : posix;
      return execSync(command.replace(name, 'node bin/cli.js'), { stdio: 'inherit' });
      };

   it('with basic parameters creates the expected new menu file', () => {
      run('copy-folder --cd=spec/fixtures/source subfolder --ext=.css ../target/cli');
      const actual = revWebAssets.readFolderRecursive('spec/fixtures/target/cli');
      const expected = [
         'spec/fixtures/target/cli/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
