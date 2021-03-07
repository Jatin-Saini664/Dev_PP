
let fs = require('fs');

let content = process.argv.slice(2);

let flags = [];
let files = [];

for(let i=0; i<content.length;i++){
    if(content[i].startsWith('-')){
        flags.push(content[i]);
    }else
        files.push(content[i]);
}

// for appending files

let filesKaData="";

for(let i=0;i<files.length;i++){
    filesKaData+=fs.readFileSync(files[i]);
}

console.log(filesKaData);