const fs = require('fs');

const files = ['./f1.txt', './f2.txt', './f3.txt'];

let f1KaData = fs.promises.readFile(files[0]);

for(let i=1;i<files.length;i++){
    f1KaData = f1KaData.then((data)=>{
        console.log(data+"");
        const nextFileContent = fs.promises.readFile(files[i]);
        return nextFileContent;
    })
}

f1KaData.then((data)=>{
    console.log(data+"");
})

