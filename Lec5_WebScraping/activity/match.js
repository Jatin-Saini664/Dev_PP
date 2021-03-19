let fs = require("fs");
let request = require("request");
let cheerio= require("cheerio");
// const getMatch = require("../../../Lec5_WebScraping/activity/match");

function getMatch(link){
    request(link, cb);
}

function cb(error, response, body){
    parseData(body);
}

function parseData(html){
    let playerName="";
    let runs;
    let ballsPlayed;
    let fours;
    let sixes;
    let teamName="";
    let strikeRate;
    let ch = cheerio.load(html);
    let matchContent = ch(".Collapsible");
    for(let i=0;i<matchContent.length;i++){
        teamName = ch(matchContent[`${i}`]).find("h5").text().split("INNINGS")[0].trim();
        let allTrs = ch(matchContent[`${i}`]).find(".table.batsman tbody tr");
        for(let j=0;j<allTrs.length-1;j++){
            let allTds = ch(allTrs[`${j}`]).find("td");
            if(allTds.length>1){
                playerName = ch(allTds['0']).text().trim();
                runs = ch(allTds['2']).text().trim();
                ballsPlayed = ch(allTds['3']).text().trim();
                fours = ch(allTds['5']).text().trim();
                sixes = ch(allTds['6']).text().trim();
                strikeRate=ch(allTds['7']).text().trim();
                console.log(`name: ${playerName}, runsScored: ${runs}, ballsPlayed: ${ballsPlayed}, fours: ${fours}, sixes: ${sixes}, strikeRate: ${strikeRate}`);
                processData(teamName, playerName, runs, ballsPlayed, fours, sixes, strikeRate);
            }
        }
    }
}

function checkTeamFolder(teamName){
    return fs.existsSync(`./IPL/${teamName}`);
}

function checkBatsmanFile(teamName, playerName){
    return fs.existsSync(`./IPL/${teamName}/${playerName}.json`);
}

function updateBatsmanFile(teamName, playerName, runs, balls, fours, sixes, strikeRate){
    let batsmanPath = `./IPL/${teamName}/${playerName}.json`;
    let stringifiedData = fs.readFileSync(batsmanPath);
    let batsmanFile=JSON.parse(stringifiedData);
    let innings = {
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
        StrikeRate: strikeRate
    }
    batsmanFile.push(innings);
    fs.writeFileSync(batsmanPath, JSON.stringify(batsmanFile));
}

function createBatsmanFile(teamName, playerName, runs, balls, fours, sixes, strikeRate){
    let batsmanPath = `./IPL/${teamName}/${playerName}.json`;

    let batsmanFile = [];
    let innings = {
        Runs: runs,
        Balls: balls,
        Fours: fours, 
        Sixes: sixes,
        StrikeRate: strikeRate
    }
    batsmanFile.push(innings);
    let stringifiedData = JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath, stringifiedData);
}

function createTeamFolder(teamName){
    fs.mkdirSync(`./IPL/${teamName}`);
}

function processData(teamName, playerName, runs, balls, fours, sixes, strikeRate){
    let chkFolder = checkTeamFolder(teamName);
    if(chkFolder){
        let chkBatsmanFile=checkBatsmanFile(teamName, playerName);
        if(chkBatsmanFile){
            updateBatsmanFile(teamName, playerName, runs, balls, fours, sixes, strikeRate);
        }else{
            createBatsmanFile(teamName, playerName, runs, balls, fours, sixes, strikeRate);
        }
    }else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName, playerName, runs, balls, fours, sixes, strikeRate);
    }
}

// getMatch("fghjkjhg");

module.exports = getMatch;