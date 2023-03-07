var fs = require("fs");
var resolve = require("path").resolve;
var join = require("path").join;
var cp = require("child_process");
var os = require("os");

// get library path
var lib = resolve(__dirname, "./");

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

fs.readdirSync(lib).forEach(function (mod) {
  var modPath = join(lib, mod);

  if (fs.existsSync(join(modPath, "Solved" || "Unsolved"))) {
    var libArray = [];
    var subLibSolved = join(modPath, "Solved");
    var subLibUnsolved = join(modPath, "Unsolved");
    libArray.push(subLibSolved, subLibUnsolved);

    libArray.forEach((subLib) => {
      fs.readdirSync(subLib).forEach(function (subMod) {
        var subModPath = join(subLib, subMod);

        npmInstallFunction(subModPath);
      });
    });
  }

  npmInstallFunction(modPath);
});
