const puppeteer = require("puppeteer");
const id = "dijoc23473@kindbest.com";
const password = "1234567";

let challenges = require("./challenges.js");

(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const allPages = await browser.pages();
  let tab = allPages[0];
  await tab.goto("https://www.hackerrank.com/auth/login");
  await tab.type("#input-1", id);
  await tab.type("#input-2", password);
  await tab.click(
    ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
  );
  await tab.waitForTimeout(5500);
  await waitAndClick('div[data-analytics="NavBarProfileDropDown"]', tab);
  await waitAndClick(
    'a[data-analytics="NavBarProfileDropDownAdministration"]',
    tab
  );
  await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav a", {
    visible: true,
  });
  const allATags = await tab.$$(".nav-tabs.nav.admin-tabbed-nav a");
  await allATags[1].click();

  await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
  const createChallengeBtn = await tab.$(".btn.btn-green.backbone.pull-right");
  let link = await tab.evaluate((elem) => {
    return elem.getAttribute("href");
  }, createChallengeBtn);
  let completeLink = "https://www.hackerrank.com" + link;

  //$ adding challenges of one by one
  //$ for(let i=0;i<challenges.length;i++)
  //$     await addChallenge(completeLink, browser, challenges[i]);

  //& adding challenges simultaneously
  //& for(let i=0;i<challenges.length;i++){
  //&     addChallenge(completeLink, browser, challenges[i]);
  //& }
  await tab.waitForTimeout(3000);

  await addAllModerator(browser, tab);
})();

async function addAllModerator(browser, tab) {
  await tab.waitForTimeout(1000);
  let allchallenge = await tab.$$(".backbone.block-center");
  let allChallengeLinks = [];

  //$ adding moderator simultaneously
  for (let i = 0; i < allchallenge.length; i++) {
    let challengeLink = await tab.evaluate((elem) => {
      return elem.getAttribute("href");
    }, allchallenge[i]);
    allChallengeLinks.push("https://hackerrank.com" + challengeLink);
  }

  let allModAddPromise = [];
  for (let i = 0; i < allChallengeLinks.length; i++) {
    let moderatorAddPromise = addModerator(allChallengeLinks[i], browser);
    allModAddPromise.push(moderatorAddPromise);
  }

  await Promise.all(allModAddPromise);

  await tab.waitForTimeout(1000);

  const allLis = await tab.$$(".pagination li");
  const secondLastLi = allLis[allLis.length - 2];
  let isDisabled = await tab.evaluate(function (elem) {
    return elem.classList.contains("disabled");
  }, secondLastLi);
  if (isDisabled) {
    return;
  } else {
    await secondLastLi.click();
    await addAllModerator(browser, tab);
  }
}

async function addModerator(challengeLink, browser) {
  const newPage = await browser.newPage();
  await newPage.goto(challengeLink);
  await newPage.waitForTimeout(1000);
  await newPage.waitForSelector('li[data-tab="moderators"]');
  await newPage.click('li[data-tab="moderators"]');
  await newPage.waitForSelector("#moderator");
  await newPage.type("#moderator", "Jack_Hammer");
  await newPage.click(".btn.moderator-save");
  await newPage.waitForTimeout(2000);
  await newPage.click(".save-challenge.btn.btn-green");
  await newPage.close();
}

async function addChallenge(completeLink, browser, challenge) {
  const newPage = await browser.newPage();
  await newPage.goto(completeLink);

  await newPage.waitForSelector("#name");
  await newPage.type("#name", challenge["Challenge Name"]);
  await newPage.type("#preview", challenge["Description"]);
  const allCodeMirror = await newPage.$$(
    ".CodeMirror.cm-s-default.CodeMirror-wrap"
  );

  await allCodeMirror[0].click();
  await allCodeMirror[0].type(challenge["Problem Statement"]);
  await allCodeMirror[1].click();
  await allCodeMirror[1].type(challenge["Input Format"]);
  await allCodeMirror[2].click();
  await allCodeMirror[2].type(challenge["Constraints"]);
  await allCodeMirror[3].click();
  await allCodeMirror[3].type(challenge["Output Format"]);
  await newPage.waitForTimeout(1000);
  await newPage.type("#tags_tag", challenge["Tags"]);
  await newPage.keyboard.press("Enter");
  await newPage.click(".save-challenge.btn.btn-green");
  await newPage.close();
}

function waitAndClick(selector, tab) {
  return new Promise((resolve, reject) => {
    tab
      .waitForSelector(selector, { visible: true })
      .then((data) => {
        resolve(tab.click(selector));
      })
      .catch((error) => {
        reject(error);
      });
  });
}
