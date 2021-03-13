let fs = require('fs');
const request = require("request");
const cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

let url1 = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

// request(url, (error, response, body)=>{
//     let ch = cheerio.load(body);
//     let pTag = ch('.match-comment-long-text[itemprop="articleBody"]');
//     console.log(ch(pTag['0']).text());
// })

request(url1, (error, response, body)=>{
    let ch = cheerio.load(body);
    let trTag = ch('.table.bowler>tbody>tr');
    // console.log(trTag.length);

    let mxWkt=0;
    let playerName="";
    for(let i=0;i<trTag.length;i++){
        let wktTag=ch(trTag[`${i}`]);
        let tdTag=ch(wktTag[`${0}`].children[`${4}`]).text();
        // console.log(tdTag+"\n");
        if(tdTag>mxWkt){
            playerName=ch(wktTag[`${0}`].children[`${0}`]).text();
            mxWkt=tdTag;
        }
    }
    // console.log(playerName);
    for(let i=0;i<trTag.length;i++){
        let wktTag=ch(trTag[`${i}`]);

        let playerTag = ch(wktTag[`${0}`].children[`${0}`]).text();
        if(playerTag==playerName){
            let playerData=ch(wktTag[`${0}`].children);
            console.log(playerTag);
            for(let j=1;j<playerData.length;j++){
                console.log(ch(playerData[`${j}`]).text());
            }
            break;
        }
    }
})