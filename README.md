# copy-folder-cli
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_A recursive directory file copy utility designed for use in npm scripts_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/copy-folder-cli/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/copy-folder-cli.svg)](https://www.npmjs.com/package/copy-folder-cli)
[![Vulnerabilities](https://snyk.io/test/github/center-key/copy-folder-cli/badge.svg)](https://snyk.io/test/github/center-key/copy-folder-cli)
[![Build](https://github.com/center-key/copy-folder-cli/workflows/build/badge.svg)](https://github.com/center-key/copy-folder-cli/actions/workflows/run-spec-on-push.yaml)

**copy-folder-cli** copies a folder and its subfolders.

## A) Setup

Install package for node:
```shell
$ npm install --save-dev copy-folder-cli
```

## B) Usage

### 1. npm scripts
Call `copy-folder` from the `"scripts"` section of your **package.json** file.

The **first** parameter is the *source* folder.
The **second** parameter is the *target* folder.

Example **package.json** script:
```json
   "scripts": {
      "make-dist": "copy-folder build dist"
   },
```

Try out the script with the command: `npm run make-dist`

### 2. Global
You can install **copy-folder-cli** globally and then run it anywhere directly from the terminal.

Example terminal commands:
```shell
$ npm install --global copy-folder-cli
$ copy-folder src/web ext=.html docs/api-manual
```

### 3. ESM and TypeScript Code
Even though **copy-folder-cli** is primarily intended for build scripts, the package can easily be used in ESM and TypeScript projects.

``` typescript
import { copyFolder } from 'copy-folder-cli';
const options = { fileExtentions: ['.html', '.js'] };
const results = copyFolder.cp('src/web', 'docs/api-manual', options);
console.log('Files copied:', results.count);
```

See the **TypeScript Declaration File** file [copy-folder.d.ts](dist/copy-folder.d.ts) in the **dist** folder for documentation.

## C) CLI Flags

| Flag         | Description                                           | Value      |
| ------------ | ----------------------------------------------------- | ---------- |
| `--basename` | Filter files by filename ignoring the file extension. | **string** |
| `--ext`      | Filter files by file extension, such as `.js`.<br>Use a comma to specify multiple extensions. | **string** |
| `--quiet`    | Suppress informational messages.                      | N/A        |
| `--summary`  | Only print out the single line summary message.       | N/A        |

### Examples
   - `copy-folder build --basename=index dist`  &nbsp; Only copy files with filenames matching `index.*`.
   - `copy-folder build dist --summary`         &nbsp; Displays the summary but not the individual files copied.
   - `copy-folder src/web --ext=.js,.html docs` &nbsp; Copy only the JavaScript and HTML files to the **docs** folder.

<br>

---
**Build Tools**
   - 🎋 [add-dist-header](https://github.com/center-key/add-dist-header):&nbsp; _Adds a header comment to a file and saves it to your distribution folder_
   - 📄 [copy-file-util](https://github.com/center-key/copy-file-util):&nbsp; _A file copy and rename cli tool designed for use in npm scripts_
   - 📂 [copy-folder-cli](https://github.com/center-key/copy-folder-cli):&nbsp; _A recursive directory file copy utility designed for use in npm scripts_

[MIT License](LICENSE.txt)
