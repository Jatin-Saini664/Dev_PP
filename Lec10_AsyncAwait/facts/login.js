const puppeteer = require("puppeteer");
const id = "dijoc23473@kindbest.com";
const password = "1234567"
let tab;

(async function(){
    const browser = await puppeteer.launch({headless:false, defaultViewport:null, args:["--start-maximized"]});
    const allPages = await browser.pages();
    tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type('#input-1', id);
    await tab.type("#input-2", password);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
})();