# Multifile NPM Install

Multifile NPM Install is a project that allows you to use npm i on all directories and subdirectories within a parent directory. You would add the code within `npmi.js` to your parent folder and run `node npmi.js`. 

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Installation

Your folder structure should look like this:

```
.
└── Parent-Folder/
    ├── SubFolder1/
    │   ├── index.js
    │   └── package.json
    ├── SubFolder2/
    │   ├── Folder/
    │   │   ├── index.js
    │   │   └── package.json
    │   ├── index.js
    │   └── package.json
    └── npmi.js
```

Either copy the file `npmi.js` to your project or copy this code to your project within a file called `npmi.js`:

```
var fs = require("fs");
var resolve = require("path").resolve;
var join = require("path").join;
var cp = require("child_process");
var os = require("os");

var npmInstallFunction = (path) => {
  // ensure path has package.json
  if (!fs.existsSync(join(path, "package.json"))) {
    return;
  }

  // npm binary based on OS
  var npmCmd = os.platform().startsWith("win") ? "npm.cmd" : "npm";

  // install folder
  cp.spawn(npmCmd, ["i"], {
    env: process.env,
    cwd: path,
    stdio: "inherit",
  });
};

// get current folder path
var lib = resolve(__dirname, "./");

// loop through all files within directory
fs.readdirSync(lib).forEach(function (mod) {
  // checks all folders within parent directory for package.json
  var modPath = join(lib, mod);
  npmInstallFunction(modPath);

  // digs 1 folder deeper to check for package.json
  if (fs.statSync(modPath).isDirectory()) {
    var subLib = resolve(modPath, "./");

    fs.readdirSync(subLib).forEach(function (subMod) {
      var subModPath = join(subLib, subMod);

      npmInstallFunction(subModPath);
    });
  }
});

```

## Usage

Once you have `npmi.js` installed on your project directory, simply run `node npmi.js` and it will run `npm install` on all directories within your project. It will also dig one folder in to each directory.

## Acknowledgements

- [folder tree - tree.nathanfriend.io](https://tree.nathanfriend.io/)
- [stackoverflow - npm install nested folders](https://stackoverflow.com/a/31774097)