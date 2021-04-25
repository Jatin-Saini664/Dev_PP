let filterCodes = {
    "red":"#e74c3c",
    "blue":"#3498db",
    "green":"#2ecc71",
    "black":"#34495e"
}

let color="red";
let count=0;

let allFilters = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
let openModal = document.querySelector(".open-modal");
let deleteButton = document.querySelector(".close-ticket");


deleteButton.addEventListener("click", deleteTickets);
// [ <div></div> ,<div></div> ,<div></div> ,<div></div>  ];
function deleteTickets(e){
    count++;
    console.log("delete button clicked");
    if(count%2!=0){
      e.target.classList.add("close-ticket-active");
      let deleteTicketButton = document.querySelectorAll(".info .fas");
      for(let i=0;i<deleteTicketButton.length;i++){
        deleteTicketButton[i].addEventListener("click", deleteTicket);
    }
    }else{
      e.target.classList.remove("close-ticket-active");
    }
}


function deleteTicket(e){
    if(count%2==0)
      return;
    let iconParent = e.target.parentNode;
    let id = iconParent.children[0].innerText.split('#')[1];
    iconParent.parentNode.remove();
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let filteredTickets = allTickets.filter((filterObject)=>{
      return filterObject.ticketId!=id;
    })
    allTickets=filteredTickets;
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
}

function getTickets(){
  if(localStorage.getItem("allTickets")){
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    ticketContainer.innerHTML="";
    for(let i=0;i<allTickets.length;i++){
      let {ticketId, ticketFilter, content} = allTickets[i];

      let tkt = document.createElement("div");
      tkt.classList.add("ticket");
      tkt.innerHTML=`<div class="ticket-filter ${ticketFilter}"></div>
      <div class="info">
          <div class="ticket-id">
              #${ticketId}
          </div>
          <i class="fas fa-trash"></i>
      </div>
      <div class="ticket-content" contenteditable="false">
          ${content}
      </div>`;
      tkt.querySelector(".ticket-filter").addEventListener("click", changeTicketColor);
      ticketContainer.append(tkt);
    }
  }
}
getTickets();

// let tickets=document.querySelectorAll(".tickets-container .ticket-filter");

// for(let i=0;i<tickets.length;i++)
//   tickets[i].addEventListener("click", changeTicketColor);
function changeTicketColor(e){
  let ticketId = e.target.nextElementSibling.children[0].innerText.split('#')[1];
  console.log(ticketId);
  let allColors = ["red", "blue", "green", "black"];
  let idx;
  let allTickets = JSON.parse(localStorage.getItem("allTickets"));
  for(let i=0;i<allTickets.length;i++){
    let ticketObject = allTickets[i];
    if(ticketObject.ticketId==ticketId){
      let ticketColor = ticketObject.ticketFilter;
      idx=allColors.indexOf(ticketColor);
      e.target.classList.remove(allColors[idx]);
      idx++;
      idx=idx%allColors.length;
      allTickets[i].ticketFilter=allColors[idx];
      // getTickets();
      break;
    }
  }
  e.target.classList.add(allColors[idx]);
  localStorage.setItem("allTickets", JSON.stringify(allTickets));
}

openModal.addEventListener('click', handleModal);

function handleModal(e){
  if(document.querySelector(".modal")){
    return;
  };
  let modal = document.createElement("div");
  modal.classList.add('modal');
  modal.innerHTML=`<div class="modal-textbox" contenteditable="true">
        Enter your text here
    </div>
    <div class="modal-filter-options">
      <div class="modal-filter red"></div>
      <div class="modal-filter blue"></div>
      <div class="modal-filter green"></div>
      <div class="modal-filter black"></div>
    </div>
    <div class="delete-modal">
      <i class="fas fa-times-circle"></i>
    </div>`;
    modal.querySelector('.modal-textbox').addEventListener("click", emptyTextBox);
    modal.querySelector('.modal-textbox').addEventListener("keypress", addticket);
    modal.querySelector(".delete-modal").addEventListener("click", closeModal);
    let modalfilters = modal.querySelectorAll(".modal-filter");

    for(let i=0;i<modalfilters.length;i++){
      modalfilters[i].addEventListener("click", chooseModalFilter);
    }
  ticketContainer.append(modal);
}

function closeModal(e){
  console.log(e);
  e.path[2].remove();
}

function chooseModalFilter(e){
  if(e.target.classList[1]==color)
    return;
  
  let siblings = e.target.parentNode.children;
  for(let i=0;i<siblings.length;i++){
    if(siblings[i].classList.length==3){
      siblings[i].classList.remove("active-filter");
    }
  }
  e.target.classList.add("active-filter");
  color=e.target.classList[1];
}

function addticket(e){
  if(e.key=="Enter"){
    let text = e.target.textContent;
    let tkt = document.createElement("div");
    tkt.classList.add("ticket");
    let ticketId = uid();
    // let a = Math.floor(Math.random()*(100000-1))+900000;
    tkt.innerHTML=`<div class="ticket-filter ${color}"></div>
    <div class="info">
        <div class="ticket-id">
            #${ticketId}
        </div>
        <i class="fas fa-trash"></i>
    </div>
    <div class="ticket-content" contenteditable="false">
        ${text}
    </div>`;
    ticketContainer.append(tkt);

    if(!localStorage.getItem("allTickets")){
      let allTickets = [];

      let ticketObject = {};
      ticketObject.ticketId=ticketId;
      ticketObject.ticketFilter = color;
      ticketObject.content=text;
      allTickets.push(ticketObject);
      localStorage.setItem("allTickets", JSON.stringify(allTickets));
    }else{
      let allTickets = JSON.parse(localStorage.getItem("allTickets"));
      let ticketObject = {};
      ticketObject.ticketId=ticketId;
      ticketObject.ticketFilter = color;
      ticketObject.content=text;
      allTickets.push(ticketObject);
      localStorage.setItem("allTickets", JSON.stringify(allTickets));
    }
    e.target.parentNode.remove();
  }
}

function emptyTextBox(e){
  if(e.target.getAttribute("data-typed")=="true")
    return;
  e.target.innerHTML="";
  e.target.setAttribute('data-typed', "true");
}

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e) {
  if(e.target.classList.contains("active-filter")){
    e.target.classList.remove("active-filter");
    getTickets();
    return;
  }

  if(document.querySelector(".filter.active-filter")){
    document.querySelector(".filter.active-filter").classList.remove("active-filter");
  }

  e.target.classList.add("active-filter");
  loadSelectedTickets(e.target.classList[1]);
}

function loadSelectedTickets(ticketFilter){
  if(localStorage.getItem("allTickets")){
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let filteredTickets = allTickets.filter((filterObject)=>{
      return filterObject.ticketFilter==ticketFilter;
    });

    ticketContainer.innerHTML="";
    for(let i=0;i<filteredTickets.length;i++){
      let {ticketId, ticketFilter, content} = filteredTickets[i];

      let tkt = document.createElement("div");
      tkt.classList.add("ticket");
      tkt.innerHTML=`<div class="ticket-filter ${ticketFilter}"></div>
      <div class="info">
          <div class="ticket-id">
              #${ticketId}
          </div>
          <i class="fas fa-trash"></i>
      </div>
      <div class="ticket-content" contenteditable="false">
          ${content}
      </div>`;
      tkt.querySelector(".ticket-filter").addEventListener("click", changeTicketColor);
      ticketContainer.append(tkt);
    }
  }
}