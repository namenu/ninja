var child = require("child_process");
var fs = require("fs");
var os = require("os");
const path = require("path");
var ext = os.platform();
var command = "python configure.py --bootstrap --verbose";
function build() {
  if (ext === "win32") {
    // running on visual studio command line
    child.execSync(command, { cwd: __dirname });
  } else {
    if (process.platform === "darwin") {
      process.env["CXXFLAGS"] = "-flto";
    }
    child.execSync(command, { stdio: [0, 1, 2], cwd: __dirname });
    child.execSync(`strip ninja`, { stdio: [0, 1, 2], cwd: __dirname });
  }
}
exports.build = build;
if (require.main === module) {
  build();
  var src = path.join(__dirname, `ninja${ext === "win32" ? ".exe" : ""}`);
  var dst = path.join(__dirname, "..", ext, `ninja.exe`);
  fs.copyFileSync(src, dst);
}
