const request = require("request");
const cheerio = require("cheerio");
const getMatch = require("./match.js");

function getAllMatches(linkArray, linkPathArray, c){
    request( linkArray[c]  , function cb(error , response , data){
        let html =data;
        let ch = cheerio.load(html);
        let allATags = ch('.tabnav.px-3.mb-0 a');
        let completeLinkArray=[];
        for(let i=0 ; i<allATags.length; i++){
            let aTag = allATags[i+""];
            let obj = ch(aTag).attr("href");
            // console.log(obj);
            if(obj.includes("/issues")){
                let completeLink = "https://github.com"+obj;
                // console.log(completeLink);
                if(completeLinkArray.length<10)
                    completeLinkArray.push(completeLink);
            }    
        }
        console.log(completeLinkArray);
        getMatch(completeLinkArray, linkPathArray[c],0, function(error, res){
            console.log(res);
            
            if(c<2){
                getAllMatches(linkArray, linkPathArray, c+1);
            }
        });
    });
}


module.exports = getAllMatches;
