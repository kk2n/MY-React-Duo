const glob = require("glob");
const path = require("path");
module.exports = function getEntry(globPath, pathDir,entryName) {
    let files = glob.sync(globPath);
    let entries = {},
        entry,
        dirname,
        basename,
        pathname,
        extname;
    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        let fileName=entry.substring(entry.lastIndexOf('/') + 1).replace('.entry','');//文件名
        let parentMulu=entry.substring(entry.indexOf('/')+1).replace(entry.substring(entry.lastIndexOf('/')),'');

        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir
            ? pathname.replace(pathDir, "").replace('.'+entryName, "").replace('\\', "/")
            : pathname;
        entries[pathname] = "./" + entry;
    }
    return entries;
};
