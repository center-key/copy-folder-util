# copy-folder-cli
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_A recursive directory file copy utility designed for use in npm scripts_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/copy-folder-cli/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/copy-folder-cli.svg)](https://www.npmjs.com/package/copy-folder-cli)
[![Vulnerabilities](https://snyk.io/test/github/center-key/copy-folder-cli/badge.svg)](https://snyk.io/test/github/center-key/copy-folder-cli)
[![Build](https://github.com/center-key/copy-folder-cli/workflows/build/badge.svg)](https://github.com/center-key/copy-folder-cli/actions/workflows/run-spec-on-push.yaml)

**copy-folder-cli** copies a folder and its subfolders.

## 1) Setup

Install package for node:
```shell
$ npm install --save-dev copy-folder-cli
```

## 2) Usage

### npm scripts
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

### Global
You can install **copy-folder-cli** globally and then run it anywhere directly from the terminal.

Example terminal commands:
```shell
$ npm install --global copy-folder-cli
$ copy-folder src/web ext=html docs/api-manual
```

### TypeScript Code
Even though **copy-folder-cli** is primarily intended for use in build scripts, the package can easily be used in TypeScript projects.

``` typescript
import { copyFolder } from 'copy-folder-cli';
const results = copyFolder.cp('src/web', 'docs/api-manual', { fileExtentions: ['html', 'js'] });
console.log('Files copied:', results.count);
```

See the **TypeScript Declaration File** file [clabe.d.ts](dist/clabe.d.ts) in the **dist** folder for documentation.

## 3) CLI Flags

| Flag        | Description                                                                            | Values     | Default |
| ----------- | -------------------------------------------------------------------------------------- | ---------- | ------- |
| `--ext`     | Filter by file extension, such as `js`.<br>Use a comma to specify multiple extensions. | **string** | N/A     |
| `--quiet`   | Suppress informational messages.                                                       | N/A        | N/A     |
| `--summary` | Only print out the single line summary message.                                        | N/A        | N/A     |

<br>

---
**Build Tools**
   - 🎋 [add-dist-header](https://github.com/center-key/add-dist-header): _Adds a header comment to a file and saves it to your distribution folder_
   - 📂 [copy-folder-cli](https://github.com/center-key/copy-folder-cli): _A recursive directory file copy utility designed for use in npm scripts_

[MIT License](LICENSE.txt)
