
let fs = require('fs');

let content = process.argv.slice(2);

let flags = [];
let files = [];

console.log(content);

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

let removedSpaces = [];
let emptyPushed = false;

let data = filesKaData.split("\r\n");

if(flags.includes('-s')){
    removeLargeSpaces(data);
    let joinedString = removedSpaces.join("\n");
    console.log(joinedString);
}

let count=1;

if(flags.includes('-b')){
    
    if(removedSpaces.length!=0)
        addLineNumberToNonEmptyLines(removedSpaces);
    else
        addLineNumberToNonEmptyLines(data);
}else if(flags.includes('-n')){
    if(removedSpaces.length!=0)
        addLineNumberToAllLines(removedSpaces);
    else
        addLineNumberToAllLines(data);
}

// -n flag

function addLineNumberToAllLines(data){
    for(let i=1;i<data.length+1;i++){
        data[i-1]=`${i}. ${data[i-1]}`;
    }
    let addedLineNumber = data.join("\n");
    console.log(addedLineNumber);
}

// -b flag

function addLineNumberToNonEmptyLines(data){
    for(let i=0;i<data.length;i++){
        if(data[i]!=''){
            data[i]=`${count}. ${data[i]}`;
            count++;
        }
    }
    let addedLineNumber = data.join("\n");
    console.log(addedLineNumber);
}

// -s flag

function removeLargeSpaces(data){
    for(let i=0;i<data.length;i++){
        if(data[i]==''&&!emptyPushed){
            removedSpaces.push(data[i]);
            emptyPushed=true;
        }
        else if(data[i]!=''){
            removedSpaces.push(data[i]);
        }
    }
}