# copy-folder-util
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_Recursively copy files from one folder to another folder (CLI tool designed for use in npm package.json scripts)_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/copy-folder-util/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/copy-folder-util.svg)](https://www.npmjs.com/package/copy-folder-util)
[![Build](https://github.com/center-key/copy-folder-util/workflows/build/badge.svg)](https://github.com/center-key/copy-folder-util/actions/workflows/run-spec-on-push.yaml)

**copy-folder-util** takes a source folder and copies its files and subfolders to a new destination.&nbsp;
The command's console output includes a timestamp and formatting helpful in build systems.

<img src=https://raw.githubusercontent.com/center-key/copy-folder-util/main/screenshot.png
width=800 alt=screenshot>

## A) Setup
Install package for node:
```shell
$ npm install --save-dev copy-folder-util
```

## B) Usage
### 1. npm package.json scripts
Run `copy-folder` from the `"scripts"` section of your **package.json** file.

Parameters:
* The **first** parameter is the *source* folder.
* The **second** parameter is the *target* folder.

Example **package.json** scripts:
```json
   "scripts": {
      "make-dist": "copy-folder build dist",
      "make-docs": "copy-folder src/web --ext=.html docs/api-manual"
   },
```

### 2. Command-line npx
Example terminal commands:
```shell
$ npm install --save-dev copy-folder-util
$ npx copy-folder src/web ext=.html docs/api-manual
```
You can also install **copy-folder-util** globally (`--global`) and then run it anywhere directly from the terminal.

### 3. CLI flags
Command-line flags:
| Flag         | Description                                           | Value      |
| ------------ | ----------------------------------------------------- | ---------- |
| `--basename` | Filter files by filename ignoring the file extension. | **string** |
| `--cd`       | Change working directory before starting copy.        | **string** |
| `--ext`      | Filter files by file extension, such as `.js`.<br>Use a comma to specify multiple extensions. | **string** |
| `--note`     | Place to add a comment only for humans.               | **string** |
| `--quiet`    | Suppress informational messages.                      | N/A        |
| `--summary`  | Only print out the single line summary message.       | N/A        |

Examples:
   - `copy-folder build --basename=index dist` <br>
   Only copies files with filenames matching `index.*`.

   - `copy-folder -cd=spec fixtures mock1`<br>
   Copies the folder **spec/fixtures** to **spec/mock1**.

   - `copy-folder build dist --summary`<br>
   Displays the summary but not the individual files copied.

   - `copy-folder 'src/Legal Notices' dist --summary`<br>
   Copies a folder that has a space in its name.

   - `copy-folder src/web --ext=.js,.html docs`<br>
   Copies only the JavaScript and HTML files to the **docs** folder.

_**Note:** Single quotes in commands are normalized so they work cross-platform and avoid the errors often encountered on Microsoft Windows._

## C) Application Code
Even though **copy-folder-util** is primarily intended for build scripts, the package can be used programmatically in ESM and TypeScript projects.

Example:
``` typescript
import { copyFolder } from 'copy-folder-util';

const options = { fileExtensions: ['.html', '.js'] };
const results = copyFolder.cp('src/web', 'docs/api-manual', options);
console.log('Number of files copied:', results.count);
```

See the **TypeScript Declarations** at the top of [copy-folder.ts](copy-folder.ts) for documentation.

<br>

---
**CLI Build Tools for package.json**
   - 🎋 [add-dist-header](https://github.com/center-key/add-dist-header):&nbsp; _Prepend a one-line banner comment (with license notice) to distribution files_
   - 📄 [copy-file-util](https://github.com/center-key/copy-file-util):&nbsp; _Copy or rename a file with optional package version number_
   - 📂 [copy-folder-util](https://github.com/center-key/copy-folder-util):&nbsp; _Recursively copy files from one folder to another folder_
   - 🪺 [recursive-exec](https://github.com/center-key/recursive-exec):&nbsp; _Run a command on each file in a folder and its subfolders_
   - 🔍 [replacer-util](https://github.com/center-key/replacer-util):&nbsp; _Find and replace strings or template outputs in text files_
   - 🔢 [rev-web-assets](https://github.com/center-key/rev-web-assets):&nbsp; _Revision web asset filenames with cache busting content hash fingerprints_
   - 🚆 [run-scripts-util](https://github.com/center-key/run-scripts-util):&nbsp; _Organize npm package.json scripts into named groups of easy to manage commands_
   - 🚦 [w3c-html-validator](https://github.com/center-key/w3c-html-validator):&nbsp; _Check the markup validity of HTML files using the W3C validator_

Feel free to submit questions at:<br>
[github.com/center-key/copy-folder-util/issues](https://github.com/center-key/copy-folder-util/issues)

[MIT License](LICENSE.txt)
