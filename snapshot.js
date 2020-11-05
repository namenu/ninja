var child = require("child_process");
var os = require("os");
var ext = os.platform();
var command = "python configure.py --bootstrap --verbose";
function build() {
  if (ext === "win32") {
    // running on visual studio command line
    child.execSync(command,{cwd:__dirname});
  } else {
    if (process.platform === "darwin") {
      process.env["CXXFLAGS"] = "-flto";
    }
    child.execSync(command, { stdio: [0, 1, 2], cwd : __dirname });
    child.execSync(`strip ninja`, { stdio: [0, 1, 2], cwd : __dirname });
  }
}
exports.build = build
if(require.main === module ){
  build()
}
