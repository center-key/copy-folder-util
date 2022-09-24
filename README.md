# copy-folder-cli
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_Recursively copy a folder (CLI tool designed for use in npm scripts)_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/copy-folder-cli/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/copy-folder-cli.svg)](https://www.npmjs.com/package/copy-folder-cli)
[![Vulnerabilities](https://snyk.io/test/github/center-key/copy-folder-cli/badge.svg)](https://snyk.io/test/github/center-key/copy-folder-cli)
[![Build](https://github.com/center-key/copy-folder-cli/workflows/build/badge.svg)](https://github.com/center-key/copy-folder-cli/actions/workflows/run-spec-on-push.yaml)

**copy-folder-cli** takes a source folder and copies its files and subfolders to a new destination.  The console output includes a timestamp and formatting helpful in build systems.

## A) Setup
Install package for node:
```shell
$ npm install --save-dev copy-folder-cli
```

## B) Usage
### 1. npm scripts
Run `copy-folder` from the `"scripts"` section of your **package.json** file.

The **first** parameter is the *source* folder.
The **second** parameter is the *target* folder.

Example **package.json** scripts:
```json
   "scripts": {
      "make-dist": "copy-folder build dist",
      "make-docs": "copy-folder src/web --ext=.html docs/api-manual"
   },
```

Try out the first script with the command: `npm run make-dist`

### 2. Global
You can install **copy-folder-cli** globally and then run it anywhere directly from the terminal.

Example terminal commands:
```shell
$ npm install --global copy-folder-cli
$ copy-folder src/web ext=.html docs/api-manual
```

### 3. CLI Flags
Command-line flags:
| Flag         | Description                                           | Value      |
| ------------ | ----------------------------------------------------- | ---------- |
| `--basename` | Filter files by filename ignoring the file extension. | **string** |
| `--cd`       | Change working directory before starting copy.        | **string** |
| `--ext`      | Filter files by file extension, such as `.js`.<br>Use a comma to specify multiple extensions. | **string** |
| `--quiet`    | Suppress informational messages.                      | N/A        |
| `--summary`  | Only print out the single line summary message.       | N/A        |

Examples:
   - `copy-folder build --basename=index dist`  &nbsp; Only copy files with filenames matching `index.*`.
   - `copy-folder -cd=spec fixtures mock1`      &nbsp; Copy the folder **spec/fixtures** to **spec/mock1**.
   - `copy-folder build dist --summary`         &nbsp; Displays the summary but not the individual files copied.
   - `copy-folder src/web --ext=.js,.html docs` &nbsp; Copy only the JavaScript and HTML files to the **docs** folder.

## C) Application Code
Even though **copy-folder-cli** is primarily intended for build scripts, the package can easily be used in ESM and TypeScript projects.

Example:
``` typescript
import { copyFolder } from 'copy-folder-cli';
const options = { fileExtentions: ['.html', '.js'] };
const results = copyFolder.cp('src/web', 'docs/api-manual', options);
console.log('Number of files copied:', results.count);
```

See the **TypeScript Declarations** at the top of [copy-folder.ts](copy-folder.ts) for documentation.

<br>

---
**Build Tools**
   - 🎋 [add-dist-header](https://github.com/center-key/add-dist-header):&nbsp; _Prepend a one-line header comment (with license notice) to distribution files_
   - 📄 [copy-file-util](https://github.com/center-key/copy-file-util):&nbsp; _Copy or rename a file (CLI tool designed for use in npm scripts)_
   - 📂 [copy-folder-cli](https://github.com/center-key/copy-folder-cli):&nbsp; _Recursively copy a folder (CLI tool designed for use in npm scripts)_
   - 🚦 [w3c-html-validator](https://github.com/center-key/w3c-html-validator):&nbsp; _Check the markup validity of HTML files using the W3C validator_

Feel free to submit questions at:<br>
[github.com/center-key/copy-folder-cli/issues](https://github.com/center-key/copy-folder-cli/issues)

[MIT License](LICENSE.txt)
