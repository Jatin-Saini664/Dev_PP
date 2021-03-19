const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function getMatch(linkArray, linkPath, c, callback){
    request(linkArray[c] , function(error , response , data){
      let html = data;
      
        // it is html of a single match !!!!
        let ch = cheerio.load(html);
        let repoName = ch(`strong[itemprop="name"]>a`).text();
        console.log(repoName);
    
        let allIssueATag = ch(`div[aria-label="Issues"] a[id]`);
    
        console.log(allIssueATag.length);
        for(let i=0;i<Math.min(allIssueATag.length, 10);i++){
          let issueText = ch(allIssueATag[i]).text();
          let issueLink = ch(allIssueATag[i]).attr("href");
          issueLink="https://github.com"+issueLink;
          parseIssue(linkPath, repoName, issueText, issueLink);
        }
        if(c<linkArray.length-1){
          getMatch(linkArray, linkPath, c+1,  function(error, res){
              return callback("yes");
          });
        }
        if(c==linkArray.length-1)
          return callback("yes");
    
  });
}


function checkTopicExists(mp){
  return fs.existsSync(mp);
}

function checkRepoFolder(repoFolder){
  return fs.existsSync(repoFolder);
}

function updateIssue(repoFolder, issueText, issueLink){
  let issuePath = `${repoFolder}/issue.json`;
  let issueFile = JSON.parse(fs.readFileSync(issuePath));
  issueFile.push({
    Issue:issueText,
    IssueLink:issueLink
  });
  fs.writeFileSync(issuePath, JSON.stringify(issueFile));
}

function makeRepoFolder(repoFolder){
  fs.mkdirSync(repoFolder);
}

function makeIssueFile(repoFolder, issueText, issueLink){
  let issuePath = `${repoFolder}/issue.json`;
  fs.writeFileSync(issuePath, JSON.stringify([]));
  let issueFile = JSON.parse(fs.readFileSync(issuePath));
  issueFile.push({
    Issue:issueText,
    IssueLink:issueLink
  });
  fs.writeFileSync(issuePath, JSON.stringify(issueFile));
}

function makeTopicFolder(mp){
  fs.mkdirSync(mp);
}

function parseIssue(mainPath, repoName, issueText, issueLink){
  let chkTopic = checkTopicExists(mainPath);
  if(chkTopic){
    let chkrepo = checkRepoFolder(mainPath+"/"+repoName);
    if(chkrepo){
      updateIssue(mainPath+"/"+repoName, issueText, issueLink);
    }else{
      makeRepoFolder(mainPath+"/"+repoName);
      makeIssueFile(mainPath+"/"+repoName, issueText, issueLink);
    }
  }else{
    makeTopicFolder(mainPath);
    makeRepoFolder(mainPath+"/"+repoName);
    makeIssueFile(mainPath+"/"+repoName, issueText, issueLink);
  }
}

module.exports = getMatch;