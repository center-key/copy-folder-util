// copy-folder-util
// CLI Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { cliArgvUtil } from 'cli-argv-util';
import fs from 'node:fs';

// Setup
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

////////////////////////////////////////////////////////////////////////////////
describe('Executing the CLI', () => {
   const run = (posix) => cliArgvUtil.run(pkg, posix);

   it('with basic parameters creates the expected new menu file', () => {
      run('copy-folder --cd=spec/fixtures subfolder --ext=.css ../target/cli');
      const actual =   fs.readdirSync('spec/target/cli').sort();
      const expected = ['mock2.min.css'];
      assertDeepStrictEqual(actual, expected);
      });

   it('on a folder with a subfolder copies the nested files', () => {
      run('copy-folder spec/fixtures --ext=.js spec/target/cli-nested');
      const actual = cliArgvUtil.readFolder('spec/target/cli-nested');
      const expected = [
         'mock1.js',
         'subfolder',
         'subfolder/mock2.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
