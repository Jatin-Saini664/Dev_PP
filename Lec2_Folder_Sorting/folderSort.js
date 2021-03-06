let fs = require("fs");
let path = require("path");
let extentions = require("./util.js");
let folderPath="./Downloads";
let extFolderPath;

function checkFolder(extention){

    for(let ext in extentions){
        if(extentions[ext].includes(extention)){
            extFolderPath=`${folderPath}/${ext}`;
            break;
        }
    }
    return fs.existsSync(extFolderPath);
}

function moveFile(filename){
    // copy file
    let sourcePathFolder = `${folderPath}/${filename}`;
    let destPathFolder = `${extFolderPath}/${filename}`;
    fs.copyFileSync(sourcePathFolder, destPathFolder);

    // delete file
    fs.unlinkSync(sourcePathFolder);
}

function createFolder(){
    fs.mkdirSync(extFolderPath);
}

function sortFolder(folderPath){
    // get Content
    let content = fs.readdirSync(folderPath);
    for(let i=0;i<content.length;i++){
        // get extension
        let extention = path.extname(content[i]+"");
        let folder = checkFolder(extention);
        if(folder){
            // move file
            moveFile(content[i]);
        }else{
            // create folder
            createFolder();
            // move file
            moveFile(content[i]);
        }
    }    
}

sortFolder(folderPath);