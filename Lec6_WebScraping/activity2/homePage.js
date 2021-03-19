
const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches.js");
const fs = require("fs");

// require();


// 5 min
request("https://github.com/topics" , cb);

function cb(error , response , data){
    parseData(data);
}


function parseData(html){
    // cheerio highly jquery
    let ch = cheerio.load(html);
    let aTag = ch('.topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-secondary.rounded.color-bg-primary.p-5>a');
    let completeLinkArray = [];
    let linkPathArray = [];
    for(let i=0;i<aTag.length;i++){
        let link = ch(aTag[i]).attr("href");
        let completeLink = "https://github.com"+link;
        let folderName = link.split("/topics/")[1];
        completeLinkArray.push(completeLink);
        let linkPath = `./github/${folderName}`;
        linkPathArray.push(linkPath);
    }
    getAllMatches(completeLinkArray, linkPathArray, 0);
    
}