# copy-folder-cli
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_A recursive directory file copy utility designed for use in npm scripts_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/copy-folder-cli/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/copy-folder-cli.svg)](https://www.npmjs.com/package/copy-folder-cli)
[![Vulnerabilities](https://snyk.io/test/github/center-key/copy-folder-cli/badge.svg)](https://snyk.io/test/github/center-key/copy-folder-cli)
[![Build](https://github.com/center-key/copy-folder-cli/workflows/build/badge.svg)](https://github.com/center-key/copy-folder-cli/actions/workflows/run-spec-on-push.yaml)

**copy-folder-cli** copies a folder and its subfolders.

## 1) Setup

### Install
Install package for node:
```shell
$ npm install --save-dev copy-folder-cli
```

## 2) Usage
Call `copy-folder` from the `"scripts"` section of your **package.json** file.

The **first** parameter is the *source* folder.
The **second** parameter is the *target* folder.

Example **package.json** script:
```json
   "scripts": {
      "make-dist": "copy-folder build dist"
   },
```

Alternatively, you can run **copy-folder-cli** directly from the terminal in your project home
folder.

Example terminal command:
```shell
$ ls package.json
package.json
$ npx copy-folder build dist
```

## 3) CLI Flags
| Flag        | Description                                                                            | Values     | Default |
| ----------- | -------------------------------------------------------------------------------------- | ---------- | ------- |
| `--ext`     | Filter by file extension, such as `js`.<br>Use a comma to specify multiple extensions. | **string** | N/A     |
| `--quiet`   | Suppress informational messages.                                                       | N/A        | N/A     |
| `--summary` | Only print out the single line summary message.                                        | N/A        | N/A     |

<br>

---
Build Tools: [add-dist-header](../add-dist-header) | [copy-folder-cli](../copy-folder-cli)

[MIT License](LICENSE.txt)
