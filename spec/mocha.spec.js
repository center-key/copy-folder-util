// copy-folder-util
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { cliArgvUtil } from 'cli-argv-util';
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
      const actual = fs.readdirSync(target, { recursive: true }).sort();
      const expected = [
         'mock1.html',
         'mock1.js',
         'mock1.min.css',
         'subfolder',
         'subfolder/mock2.html',
         'subfolder/mock2.js',
         'subfolder/mock2.min.css',
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
      const actual = fs.readdirSync('spec/fixtures/target/basename', { recursive: true }).sort();
      const expected = [
         'mock1.html',
         'mock1.js',
         'mock1.min.css',
         'subfolder',
         'subfolder/mock2.html',
         'subfolder/mock2.js',
         'subfolder/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   it('set to "mock2" only copies the "mock2" files', () => {
      const source = 'source';
      const target = 'target/basename-mock2';
      copyFolder.cp(source, target, { cd: 'spec/fixtures', basename: 'mock2' });
      const actual = fs.readdirSync('spec/fixtures/target/basename-mock2', { recursive: true }).sort();
      const expected = [
         'subfolder',
         'subfolder/mock2.html',
         'subfolder/mock2.js',
         'subfolder/mock2.min.css',
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
      const actual = fs.readdirSync('spec/fixtures/target/ext', { recursive: true }).sort();
      const expected = [
         'mock1.html',
         'mock1.js',
         'mock1.min.css',
         'subfolder',
         'subfolder/mock2.html',
         'subfolder/mock2.js',
         'subfolder/mock2.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   it('set to ".js" only copies the JavaScript files', () => {
      const source = 'source';
      const target = 'target/ext-js';
      copyFolder.cp(source, target, { cd: 'spec/fixtures', fileExtensions: ['.js'] });
      const actual = fs.readdirSync('spec/fixtures/target/ext-js', { recursive: true }).sort();
      const expected = [
         'mock1.js',
         'subfolder',
         'subfolder/mock2.js',
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
   const run = (posix) => cliArgvUtil.run(pkg, posix);

   it('with basic parameters creates the expected new menu file', () => {
      run('copy-folder --cd=spec/fixtures/source subfolder --ext=.css ../target/cli');
      const actual =   fs.readdirSync('spec/fixtures/target/cli').sort();
      const expected = ['mock2.min.css'];
      assertDeepStrictEqual(actual, expected);
      });

   });
