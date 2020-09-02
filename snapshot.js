var child = require("child_process");
var os = require("os");
var ext = os.platform();
if (process.argv.includes("-build")) {
  if (ext === "win32") {
    // running on visual studio command line
    child.execSync("python configure.py --bootstrap");
  } else {
    child.execSync(`./configure.py --bootstrap`, { stdio: [0, 1, 2] });
    child.execSync(`strip ninja`, { stdio: [0, 1, 2] });
  }
}
if (process.argv.includes("-tar")) {
  child.exec(`git archive --format=tar.gz HEAD -o ./ninja.tar.gz`);
}
