var fs = require('fs');
var path = require('path');

let createFile = (path, info) => {
    fs.appendFile(path, info, (err) => {
        if(err) throw err;
    });
}

let getFiles = (dir, folderArr_) => {
    let foldersAmount = 0;
    let filesAmount = 0;
    let json = {
        way: '',
        folderCount: 0,
        fileCount: 0,
    }
    
    let folderArr = folderArr_ || [];
    folderArr.shift()

    if(dir) {
        json.way = path.resolve(dir)
    } else {
        return 0;
    }

    let files = fs.readdirSync(dir);
    for (let i in files){
        let name = dir + '/' + files[i];
        
        if (fs.statSync(name).isDirectory()){
            foldersAmount++;
            folderArr.push(name);
        } else {
            filesAmount++;
        }
    }
    json.folderCount = foldersAmount;
    json.fileCount = filesAmount;
    console.log('JSON: ', json)
    let jsonWay = json.way + '/' + 'info.json';
    createFile(jsonWay, JSON.stringify(json))
    if(folderArr !== []) {
        getFiles(folderArr[0], folderArr);
    }
};

getFiles('./Folder1')