let fs =require("fs");
let request = require("request");
let cheerio = require("cheerio");
const getMatch = require("./match")

function getAllMatches(link){
    request(link, cb);
}

function cb(error, response, body){
    parseData(body);
}

function parseData(html){
    let ch = cheerio.load(html);
    let scoreCardLink = ch('[data-hover="Scorecard"]');
    for(let i=0;i<scoreCardLink.length;i++){
        // console.log("https://www.espncricinfo.com"+ch(scoreCardLink[`${i}`]).attr("href"));
        getMatch("https://www.espncricinfo.com"+ch(scoreCardLink[`${i}`]).attr("href"));
    }

}

module.exports = getAllMatches;