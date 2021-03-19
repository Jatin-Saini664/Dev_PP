const request = require("request");
const fs = require("fs");

const path = "./Github";
let topicpath="";

fs.readdir(path, function(error, data){
    
    for(let i=0;i<data.length;i++){
        topicpath = path+'/'+data[i];
        fs.readdir(topicpath, function(error, data){
            // console.log(data);
            for(let i=0;i<data.length;i++){
                fs.readFile(topicpath+'/'+data[i], function(error, data){
                    console.log(data+"");
                })
            }
        })
    }
})