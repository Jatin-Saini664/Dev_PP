let usernameDiv = document.querySelector('.username-div');

socket.on("setRealtimeCell" , function(realtimeCellInfo){
    // console.log(realtimeCellInfo);
    let {username , rowId , colId, id} = realtimeCellInfo;
    if(document.querySelector(".realtime-cell.id"+id)){
        let realtimeCell = document.querySelector(".realtime-cell.id"+id);
        realtimeCell.classList.remove("realtime-cell");
        realtimeCell.classList.remove("id"+id);
        // usernameDiv bhi hatao
        // document.querySelector(".username-div").remove();
        document.querySelector(".username-div.id"+id).remove();
        // usernameDiv.textContent="";
        // usernameDiv.style.top=(0)+"px";
        // usernameDiv.style.left = (0)+"px";
    }

    // let usernameDiv = document.createElement("div");
    usernameDiv = document.createElement("div");
    usernameDiv.classList.add("username-div");
    usernameDiv.classList.add("id"+id);
    usernameDiv.textContent = username;
    usernameDiv.style.top=(12+20*(rowId+1))+"px";
    usernameDiv.style.left = (43+90*(colId+1))+"px";
    // usernameDiv.classList.add("username-div");

    let realtimeCell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
    realtimeCell.classList.add("realtime-cell");
    realtimeCell.classList.add("id"+id);
    cellsContentDiv.append(usernameDiv);
    // realtimeCell.append(usernameDiv);
})


socket.on("setCellValue" , function(cellobj){
    let {cellValue, rowId, colId} = cellobj;
    let realtimeCell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
    realtimeCell.innerHTML=cellValue;
    // let childNodes = realtimeCell.childNodes;
    // if(childNodes.length == 1){
        // let userNameDiv = childNodes[0];
        // realtimeCell.innerHTML = cellValue;
        // realtimeCell.append(userNameDiv);
    // }
    // else{
    //     let userNameDiv = childNodes[1];
    //     realtimeCell.innerHTML = cellValue;
    //     realtimeCell.append(userNameDiv);
    // }
})