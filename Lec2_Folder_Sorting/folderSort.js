let fs = require("fs");
let path = require("path");
const prompt = require('prompt-sync')(); 
const {extentions, subExtentions, createF, createF1} = require('./util.js');
let folderPath="./Downloads";
let extFolderPath;
let extFldPath;
  

function checkFolder(extention){
    extFolderPath=undefined;
    for(let ext in extentions){
        if(extentions[ext].includes(extention)){
            extFolderPath=`${folderPath}/${ext}`;
            break;
        }
    }
    if(extFolderPath===undefined){
        console.log(`Folder for ${extention} is Not Defined`)
        let newFolderName=prompt(`New Folder Name: `);
        createF(newFolderName, extention);
        extFolderPath=`${folderPath}/${newFolderName}`;
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

    // Embedding File in Sub Folder
    sortSubFolder(extFolderPath);  
}

function createFolder(){
    fs.mkdirSync(extFolderPath);
}

function chkFolder(fldPath, ext){
    extFldPath=undefined;
    for(let e in subExtentions){
        if(subExtentions[e]===ext){
            extFldPath=`${fldPath}/${e}`;
            break;
        }
    }
    if(extFldPath===undefined){
        console.log(`Folder for ${ext} is Not Defined`)
        let newFolderName=prompt(`New File Name: `);
        createF(newFolderName, ext);
        extFldPath=`${fldPath}/${newFolderName}`;
    }
    return fs.existsSync(extFldPath);
}

function mvFile(filename, fldPath){
    // copy file
    let destContent = fs.readdirSync(extFldPath); 
    for(let i=0;destContent.length;i++){
        if(destContent[i]===filename){
            console.log(`A file with filename ${filename} already exists`);
            let newFolderName=prompt(`New Folder Name: `);
            fs.renameSync(`${fldPath}/${filename}`, `${fldPath}/${newFolderName}`);
            filename=newFolderName;
            break;
        }
    }
    let sourcePathFolder = `${fldPath}/${filename}`;
    let destPathFolder = `${extFldPath}/${filename}`;
    fs.copyFileSync(sourcePathFolder, destPathFolder);

    // delete file
    fs.unlinkSync(sourcePathFolder);
}

function createFld(){
    fs.mkdirSync(extFldPath);
}

function sortSubFolder(fPath, filename=""){
    let fldPath = fPath+'/'+filename;
    let cnt = fs.readdirSync(fldPath);
    for(let j=0;j<cnt.length;j++){
        let ext = path.extname(cnt[j]);
        if(ext.length>0){
            let c = chkFolder(fldPath, ext);
            if(c){
                // move file
                mvFile(cnt[j], fldPath);
            }else{
                // create folder
                createFld();
                // move file
                mvFile(cnt[j], fldPath);
            }
        }
    }
}

function sortFolder(folderPath){
    // get Content
    let content = fs.readdirSync(folderPath);
    console.log(content);
    for(let i=0;i<content.length;i++){
        // get extension
        let extention = path.extname(content[i]+"");
        if(extention.length>0){
            console.log(extention);
            let folder = checkFolder(extention);
            console.log(extFolderPath);
            if(folder){
                // move file
                moveFile(content[i]);
            }else{
                // create folder
                createFolder();
                // move file
                moveFile(content[i]);
            }
        }else{
            sortSubFolder(folderPath, content[i]);
        }
    }    
}

sortFolder(folderPath);