const fs = require("fs");

let f1Promise= fs.promises.readFile("./f1.txt")

f1Promise.then((data)=>{
    console.log(data+"");
    let f2Promise= fs.promises.readFile("./f2.txt")
    return f2Promise;
}).then((data)=>{
    console.log(data+"");
    let f3Promise= fs.promises.readFile("./f3.txt")
    return f3Promise;
}).then((data)=>{
    console.log(data+"");
})