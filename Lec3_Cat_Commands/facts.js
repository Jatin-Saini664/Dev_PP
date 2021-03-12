let fs = require('fs');

let f1KaData = fs.readFileSync("f1.txt")+"";

let content = f1KaData.split("\r\n");

let ans="";

console.log(content);
for(let i=0;i<content.length;i++){
    if(content[i]){
        ans+=content[i]+"\n\n";
    }
}

let ans1=ans.substring(0, ans.length-4);

console.log(ans);

// console.log(content);