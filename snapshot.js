

var child = require('child_process')
var os = require('os')
var ext = os.platform()

if(ext === 'win32')
{
    // running on visual studio command line
    child.execSync("c:\\Python27\\python.exe configure.py --bootstrap")

} else {
    child.execSync(`./configure.py --bootstrap`, {stdio:[0,1,2]})
    child.execSync(`strip ninja`, {stdio:[0,1,2]})        
}
// git archive --format=tar.gz HEAD -o ./ninja.tar.gz