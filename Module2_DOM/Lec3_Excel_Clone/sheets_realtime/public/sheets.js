let addSheetBtn = document.querySelector(".add-sheet");
let sheetsList = document.querySelector(".sheets-list");
let sheetId = 0;

addSheetBtn.addEventListener("click", function (e) {
  sheetId++;
  // it will remove activesheet class from current active sheet
  document.querySelector(".active-sheet").classList.remove("active-sheet");

  let sheetDiv = document.createElement("div");
  sheetDiv.classList.add("sheet");
  sheetDiv.classList.add("active-sheet");
  sheetDiv.setAttribute("sheetid", sheetId);
  sheetDiv.innerHTML = `Sheet ${sheetId + 1}`;

  // <div class="sheet" sheetid="1">Sheet 2</div>
  sheetsList.append(sheetDiv);

  //UI should be new
  initUI();

  // new sheet db 
  // sheetsdb.push(new sheet db)
  // db = new sheet db
  initDB();
});

sheetsList.addEventListener("click", function (e) {
  let selectedSheet = e.target;
  // active-sheet
  if (selectedSheet.classList.contains("active-sheet")) {
    return;
  }
  // non active-sheet
  // it will remove activesheet class from current active sheet
  document.querySelector(".active-sheet").classList.remove("active-sheet");
  selectedSheet.classList.add("active-sheet");

  initUI();

  //set current db to active sheet db;
  let sheetId = selectedSheet.getAttribute("sheetid");
  
  // set db and visited cells
  db = sheetsDB[sheetId].db;
  visitedCells = sheetsDB[sheetId].visitedCells;

  // set UI according to that db
  setUI();
});

function setUI(){
    // for(let i=0 ; i<100 ; i++){
    //     for(let j=0 ; j<26 ; j++){
    //         let cellObject = db[i][j];
    //         document.querySelector(`div[rowid="${i}"][colid="${j}"]`).textContent = cellObject.value; 
    //     }
    // }
    for(let i=0 ; i<visitedCells.length ; i++){
      let {rowId , colId} = visitedCells[i];
      let cellObject = db[rowId][colId];
      let selectedCell= document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
      selectedCell.innerHTML = cellObject.value;
      let allFontStyles = cellObject.fontStyle;
      for(let fs in allFontStyles){
        if(allFontStyles[fs]){
          if(fs=="bold")
            setOldFontStyle("bold", selectedCell);
          else if(fs=="italic")
            setOldFontStyle("italic", selectedCell);
          else if(fs=="underline")
            setOldFontStyle("underline", selectedCell);
        }
      }
      let textAlign = cellObject.textAlign;
      if(textAlign=="center"){
        selectedCell.style.textAlign="center";
      }else if(textAlign=="right"){
        selectedCell.style.textAlign="right";
      }
    }
}

function setOldFontStyle(styleName, selectedCell){
    if (styleName == "bold") {
      selectedCell.style.fontWeight = "bold";
    } else if (styleName == "italic") {
      selectedCell.style.fontStyle = "italic";
    } else {
      selectedCell.style.textDecoration = "underline";
    }
}

function initUI(){
    // for(let i=0 ; i<100 ; i++){
    //     for(let j=0 ; j<26 ; j++){
    //         document.querySelector(`div[rowid="${i}"][colid="${j}"]`).innerHTML = "";
    //     }
    // }
    for(let i=0 ; i<visitedCells.length ; i++){
      let {rowId , colId} = visitedCells[i];
      let cell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
      cell.innerHTML = "";
      cell.style = "";
      let allactiveStyles = document.querySelectorAll('.active-font-style');
      for(let i=0;i<allactiveStyles.length;++i){
        allactiveStyles[i].classList.remove('active-font-style');
      }
      left.classList.add("active-font-style");
    }
}