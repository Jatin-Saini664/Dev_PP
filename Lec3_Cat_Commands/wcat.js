#!/usr/bin/env node

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
    filesKaData += "\r\n";
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

if (flags.includes("-n") && flags.includes("-b")) {
    if (flags.indexOf("-n") < flags.indexOf("-b")) {
      // -n pehle aya tha
      if (flags.includes("-s")) {
        addLineNumberToAllLines(removedSpaces);
      } else {
        addLineNumberToAllLines(data);
      }
    } else {
      // -b pehle aya tha
      if (flags.includes("-s")) {
        addLineNumberToNonEmptyLines(removedSpaces);
      } else {
        addLineNumberToNonEmptyLines(data);
      }
    }
  } else if (flags.includes("-n")) {
    if (flags.includes("-s")) {
      addLineNumberToAllLines(removedSpaces);
    } else {
      addLineNumberToAllLines(data);
    }
  } else if (flags.includes("-b")) {
    if (flags.includes("-s")) {
      addLineNumberToNonEmptyLines(removedSpaces);
    } else {
      addLineNumberToNonEmptyLines(data);
    }
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
    let count=1;
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