let fs = require('fs');
let request = require("request");
let cheerio = require("cheerio");
const getAllMatches = require('./allMatches');

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", cb);

function cb(error, response, body){
    parseData(body);
}


function parseData(html){
    let ch = cheerio.load(html);
    let viewResults = ch('[data-hover="View All Results"]').attr("href");
    // console.log("https://www.espncricinfo.com"+viewResults);
    getAllMatches("https://www.espncricinfo.com"+viewResults);
}
