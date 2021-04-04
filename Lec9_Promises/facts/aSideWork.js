const fs = require("fs");

function myPromise(filePath){
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, (error, data)=>{
            if(error)
                reject(error);
            else{
                // resolve("Javascript is cool");
                resolve(data);
            }
        })
    })
}

let pendingPromise = myPromise("./f1.txt");

pendingPromise.then((data)=>{
    console.log(data+"");
}).catch((error)=>{
    console.log(error);
})