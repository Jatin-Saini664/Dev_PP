let extentions = {
    "Image":[".jpg", ".jpeg", ".png", ".gif"],
    "Video":[".mkv"],
    "Audio":[".mp3"],
    "Compressed":[".zip"],
    "Documents":[".doc", ".pdf", ".txt"]
};

function createF(newFolderName, extention){
    extentions[newFolderName]=extention;
}

let subExtentions = {
    "PDF Files":".pdf",
    "Doc Files":".doc",
    "Text Files":".txt",
    "JPG Image Files":".jpg",
    "JPEG Image Files":".jpeg",
    "PNG Image Files":".png",
    "GIF Image Files":".gif"
}

function createF1(newFolderName, ext){
    subExtentions[newFolderName]=ext;
}

module.exports.extentions = extentions;
module.exports.subExtentions = subExtentions;
module.exports.createF = createF;
module.exports.createF1 = createF1;

// module.exports=extensions;
