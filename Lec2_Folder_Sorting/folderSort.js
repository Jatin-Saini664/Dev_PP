// let fs = require("fs");
// let path = require("path");
// let extentions = require("./util.js");
// let folderPath="./Downloads";
// let extFolderPath;

// function checkFolder(extention){

//     for(let ext in extentions){
//         if(extentions[ext].includes(extention)){
//             extFolderPath=`${folderPath}/${ext}`;
//             break;
//         }
//     }
//     return fs.existsSync(extFolderPath);
// }

// function moveFile(filename){
//     // copy file
//     let sourcePathFolder = `${folderPath}/${filename}`;
//     let destPathFolder = `${extFolderPath}/${filename}`;
//     fs.copyFileSync(sourcePathFolder, destPathFolder);

//     // delete file
//     fs.unlinkSync(sourcePathFolder);
// }

// function createFolder(){
//     fs.mkdirSync(extFolderPath);
// }

// function sortFolder(folderPath){
//     // get Content
//     let content = fs.readdirSync(folderPath);
//     for(let i=0;i<content.length;i++){
//         // get extension
//         let extention = path.extname(content[i]+"");
//         let folder = checkFolder(extention);
//         if(folder){
//             // move file
//             moveFile(content[i]);
//         }else{
//             // create folder
//             createFolder();
//             // move file
//             moveFile(content[i]);
//         }
//     }    
// }

// sortFolder(folderPath);

// Updated FolderSort

const fs = require("fs");
const path = require("path");
let extensions = require("./util");
let folderPath = "./Downloads";
let extFolderPath;

function checkFolder(extension , folderPath) {
  // .mp3
  // folderPath ( "./Downloads/Audio" )
  // check if extension is matching with any folderName
  // .jpg => Images
  // "./Downloads"
  for (let key in extensions) {
    // "Images" \\ "Audio" ......
    if ( extensions[key].includes(extension)) {
      // string interpolation
      extFolderPath = `${folderPath}/${key}`;
      break;
    }
  }
  // "./Downloads/Images"
  return fs.existsSync(extFolderPath);
}
function moveFile(fileName , folderPath) {
  // copy file
  let sourceFilePath = `${folderPath}/${fileName}`; // "./Downloads/abc.txt"
  let destinationFilePath = `${extFolderPath}/${fileName}`; // "./Downloads/Documents/abc.txt"
  fs.copyFileSync(sourceFilePath , destinationFilePath);

  // delete file
  fs.unlinkSync(sourceFilePath);
}
function createFolder() {
  fs.mkdirSync(extFolderPath);
}

function checkIfAlreadyInSortedFolder(folderPath , content){
  //folderPath =  "/Downloads/Audio"
  //content =  cb.mp3
  let folderComponents = folderPath.split("/");
  let folderName = folderComponents[folderComponents.length-1];
  if(extensions.hasOwnProperty(folderName)){
    return true;
  }
  return false;
}

function sortFolder(folderPath) {
  // get content of folderPath
  let content = fs.readdirSync(folderPath);
  for (let i = 0; i < content.length; i++) {
    
    let isAlreadyInCheckedFolder = checkIfAlreadyInSortedFolder(folderPath);
    if(isAlreadyInCheckedFolder){
      console.log("Already In Sorted Folder !!");
      return;
    }

    // get extension of each file "./Downloads/Misc"
    let isDirectory = fs.lstatSync(`${folderPath}/${content[i]}`).isDirectory();
    if(isDirectory){
      console.log("It is a folder");
      sortFolder(`${folderPath}/${content[i]}`); //"./Downloads/Audio"
    }
    else{
      let extensionName = path.extname(content[i]);
      console.log(extensionName);
      let extensionFolderExist = checkFolder(extensionName , folderPath);
      if (extensionFolderExist) {
        moveFile(content[i] , folderPath);
      } else {
        createFolder();
        moveFile(content[i] , folderPath);
      }
    }
  }
}

sortFolder(folderPath);

