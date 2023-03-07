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
  if (fs.existsSync(join(modPath, "Solved" || "Unsolved"))) {
    var subLib = resolve(modPath, "./");

    fs.readdirSync(subLib).forEach(function (subMod) {
      var subModPath = join(subLib, subMod);

      npmInstallFunction(subModPath);
    });
  }
});
