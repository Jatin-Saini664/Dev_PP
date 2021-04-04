const puppeteer = require("puppeteer");
const id = "dijoc23473@kindbest.com";
const password = "1234567";
let tab;

const browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

browserOpenPromise
  .then((browser) => {
    console.log("Browser opened!!");
    const allPages = browser.pages();
    return allPages;
  })
  .then((pages) => {
    tab = pages[0];
    const pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
  })
  .then(() => {
    const id1 = tab.type("#input-1", id);
    return id1;
  })
  .then(() => {
    const id2 = tab.type("#input-2", password);
    return id2;
  })
  .then(() => {
    const btn = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return btn;
  })
  .then(() => {
    const interview = waitAndClick("#base-card-1-link");
    return interview;
  })
  .then(() => {
    const waitandclickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitandclickPromise;
  })
  .then(() => {
    const waitforquestionsATags = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitforquestionsATags;
  })
  .then(() => {
    const allATags = tab.$$(".js-track-click.challenge-list-item");
    return allATags;
  })
  .then((allATags) => {
    let allLinksPromises = [];
    for (let i = 0; i < allATags.length; i++) {
      const linkPromise = tab.evaluate((elem) => {
        return elem.getAttribute("href");
      }, allATags[i]);
      allLinksPromises.push(linkPromise);
    }
    return Promise.all(allLinksPromises);
  })
  .then((allLinksData) => {
    let newAllLinks = allLinksData.map((link) => {
      return "https://www.hackerrank.com" + link;
    });

    //$ All Questions can also be solved like this. Based on chaining
    // let oneQuesSolvePromise = solveQuestion(completeLinks[0]);
    // // 2k
    // for(let i=1; i<completeLinks.length ; i++){
    //   oneQuesSolvePromise = oneQuesSolvePromise.then( function(){
    //     let nextQuesSolvePromise = solveQuestion(completeLinks[i]);
    //     return nextQuesSolvePromise;
    //   })
    // }
    // // 10k
    // return oneQuesSolvePromise;

    //$ Based on Recursion
    const allQuestionsSolvePromise = solveQuestions(newAllLinks, 1);
    return allQuestionsSolvePromise;
  })
  .then(() => {
    console.log("All Code Submitted");
  })
  .catch((error) => {
    console.log(error);
  });

function solveQuestions(allLinks, idx) {
  return new Promise((resolve, reject) => {
    if (idx == allLinks.length) {
      resolve("All Questions Completed Successfully");
    }
    const solvequestionPromise = solve(allLinks[idx]);
    solvequestionPromise
      .then(() => {
        resolve(solveQuestions(allLinks, idx + 1));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function waitAndClick(selector) {
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

//$ getTag was used to get editorial lock icon
// function getTag() {
//   return new Promise((resolve, reject) => {
//     const elementPresentPromise = tab.waitForSelector(
//       'div[data-attr2="Editorial"]',
//       { visible: true }
//     );
//     elementPresentPromise
//       .then(() => {
//         const isTagPresentPromise = tab.evaluate(() => {
//           return document.querySelector(
//             'div[data-attr2="Editorial"] .ui-icon-lock'
//           );
//         });
//         return isTagPresentPromise;
//       })
//       .then((isTagPresent) => {
//         if (isTagPresent === null) {
//           resolve(false);
//         }
//         const getTagname = tab.evaluate(() => {
//           return (
//             document.querySelector('div[data-attr2="Editorial"] .ui-icon-lock')
//               .className === "ui-icon-lock"
//           );
//         });
//         return getTagname;
//       })
//       .then((isPresent) => {
//         resolve(isPresent);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

//$ getPermission was used to click editorial unlock button
// function getPermission() {
//   return new Promise((resolve, reject) => {
//     const waitforLockedEditorial = tab.waitForSelector(
//       ".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled",
//       { visible: true }
//     );
//     waitforLockedEditorial
//       .then(() => {
//         let lockBtnPromise = tab.$(
//           ".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled"
//         );
//         return lockBtnPromise;
//       })
//       .then((lockBtn) => {
//         console.log("lock Button Received");
//         console.log(lockBtn);
//         const editorialPermission = lockBtn.click();
//         return editorialPermission;
//       })
//       .then(() => {
//         console.log("yes");
//         const getCodePromise = getCode();
//         return getCodePromise;
//       })
//       .then((Code) => {
//         resolve(Code);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

function getCode() {
  return new Promise((resolve, reject) => {
    const waitforEditorialContent = tab.waitForSelector(".hackdown-content>h3");
    waitforEditorialContent
      .then(() => {
        const allH3 = tab.$$(".hackdown-content>h3");
        return allH3;
      })
      .then((allH3) => {
        let allH3Text = [];
        for (let i = 0; i < allH3.length; i++) {
          const textPromise = tab.evaluate((elem) => {
            return elem.textContent;
          }, allH3[i]);
          allH3Text.push(textPromise);
        }
        return Promise.all(allH3Text);
      })
      .then((allH3Text) => {
        let idx;
        for (let i = 0; i < allH3Text.length; i++) {
          if (allH3Text[i] == "C++") {
            idx = i;
            break;
          }
        }
        const allLangCodes = tab.$$(".hackdown-content>.highlight");
        return Promise.all([allLangCodes, idx]);
      })
      .then((codeAndIndex) => {
        let allCodesPromise = [codeAndIndex[1]];
        for (let i = 0; i < codeAndIndex[0].length; i++) {
          const codesPromise = tab.evaluate((elem) => {
            return elem.textContent;
          }, codeAndIndex[0][i]);
          allCodesPromise.push(codesPromise);
        }
        return Promise.all(allCodesPromise);
      })
      .then((allCodesWithIdx) => {
        resolve(allCodesWithIdx[allCodesWithIdx[0] + 1]);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function pasteCode(code) {
  return new Promise((resolve, reject) => {
    const problemPagePromise = tab.click('div[data-attr2="Problem"]');
    problemPagePromise
      .then(() => {
        const clickCheckboxPromise = waitAndClick(".custom-input-checkbox");
        return clickCheckboxPromise;
      })
      .then(() => {
        const waitForTextAreaPromise = tab.waitForSelector(".custominput");
        return waitForTextAreaPromise;
      })
      .then(() => {
        const typeCodeinCheckboxPromise = tab.type(".custominput", code);
        return typeCodeinCheckboxPromise;
      })
      .then(() => {
        const controlKeyPromise = tab.keyboard.down("Control");
        return controlKeyPromise;
      })
      .then(() => {
        const pressAKeyPromise = tab.keyboard.press("A");
        return pressAKeyPromise;
      })
      .then(() => {
        const pressXKeyPromise = tab.keyboard.press("X");
        return pressXKeyPromise;
      })
      .then(() => {
        const clickOnEditorPromise = tab.click(
          ".monaco-editor.no-user-select.vs"
        );
        return clickOnEditorPromise;
      })
      .then(() => {
        const pressAKeyPromise = tab.keyboard.press("A");
        return pressAKeyPromise;
      })
      .then(() => {
        const pasteCodePromise = tab.keyboard.press("V");
        return pasteCodePromise;
      })
      .then(function () {
        let controlKeyUpPromise = tab.keyboard.up("Control");
        resolve(controlKeyUpPromise);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function handleLockBtn() {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(
      ".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled",
      { visible: true, timeout: 1000 }
    );
    waitPromise
      .then(function () {
        let lockBtnPromise = tab.$(
          ".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled"
        );
        return lockBtnPromise;
      })
      .then(function (lockBtn) {
        console.log(lockBtn);
        let lockBtnClickPromise = lockBtn.click();
        return lockBtnClickPromise;
      })
      .then(function () {
        // clicked on lock btn
        // lock btn found
        console.log("lock btn found !!!");
        resolve();
      })
      .catch(function (error) {
        // lock btn not found
        console.log("lock btn not found !!!");
        resolve();
      });
  });
}

function solve(link) {
  return new Promise((resolve, reject) => {
    const question = tab.goto(link);
    question
      .then(() => {
        const waitandclickPromise = waitAndClick('div[data-attr2="Editorial"]');
        return waitandclickPromise;
      })
      .then(() => {
        const lockBtnPromise = handleLockBtn();
        return lockBtnPromise;
      })
      .then(() => {
        let getCodePromise = getCode();
        return getCodePromise;
      })
      .then((code) => {
        console.log("code Picked from editorial");
        const pasteCodePromise = pasteCode(code);
        return pasteCodePromise;
      })
      .then(() => {
        const pressSubmitPromise = tab.click(
          ".pull-right.btn.btn-primary.hr-monaco-submit"
        );
        resolve(pressSubmitPromise);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
