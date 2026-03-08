// copy-folder-util
// Function cp() Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { cliArgvUtil } from 'cli-argv-util';

// Setup
import { copyFolder } from '../dist/copy-folder.js';

////////////////////////////////////////////////////////////////////////////////
describe('Calling copyFolder.cp() with no options', () => {

   it('copies all files in the source folder to the target folder', () => {
      const source = 'spec/fixtures';
      const target = 'spec/target/default';
      copyFolder.cp(source, target);
      const actual = cliArgvUtil.readFolder(target, { recursive: true }).sort();
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
      const source = 'fixtures';
      const target = 'target/basename';
      copyFolder.cp(source, target, { cd: 'spec', basename: undefined });
      const actual = cliArgvUtil.readFolder('spec/target/basename');
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
      const source = 'fixtures';
      const target = 'target/basename-mock2';
      copyFolder.cp(source, target, { cd: 'spec', basename: 'mock2' });
      const actual = cliArgvUtil.readFolder('spec/target/basename-mock2');
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
      const source = 'fixtures';
      const target = 'target/ext';
      copyFolder.cp(source, target, { cd: 'spec', fileExtensions: undefined });
      const actual = cliArgvUtil.readFolder('spec/target/ext');
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
      const source = 'fixtures';
      const target = 'target/ext-js';
      copyFolder.cp(source, target, { cd: 'spec', fileExtensions: ['.js'] });
      const actual = cliArgvUtil.readFolder('spec/target/ext-js');
      const expected = [
         'mock1.js',
         'subfolder',
         'subfolder/mock2.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
