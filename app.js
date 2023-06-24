const deg = 6;
let alarmtime,
currenttime;
let alarmArray=[];




//analog clock element
const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");


//digital clock element
let hourdiv = document.querySelector("#hour");
let minutediv = document.querySelector("#minutes");
let seconddiv = document.querySelector("#second");
let ampmdiv = document.querySelector("#ampm");

//alarm setting element
const ul = document.querySelector(".myalarm ul");
const deletebtn = document.querySelector(".myalarm .butttn");
let AllLi;


setInterval(() => {

    //getting date
  let date = new Date();

  // for digital
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  hour = hour > 12 ? hour - 12 : hour;

  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  let am = date.getHours() >= 12 ? "PM" : "AM";

hourdiv.innerHTML = hour;
minutediv.innerHTML = minute;
seconddiv.innerHTML = second;
ampmdiv.innerHTML = am;

currenttime=`${hour}:${minute}:${am}`

//alarm goes off functionality
if(alarmtime ===currenttime){
    
    alert(`${alarmtime} goes off`)
   
    AllLi.forEach((li)=>{
        console.log(li)
console.log(li.dataset.time)
console.log(alarmtime)
        if(li.dataset.time===alarmtime){
          
            li.remove()
        }
    })
    alarmtime=""
    currenttime="";
}


 //for analog

  let hh = date.getHours() * 30;
  let mm = date.getMinutes() * deg;
  let ss = date.getSeconds() * deg;

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;
});




//alarm functionality begin here


let selectMenu = document.querySelectorAll("select");
let setAlarmBtn = document.querySelector("button");


//putting value in the dropdown list of hour minute and AM/PM
for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].insertAdjacentHTML("beforeend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].insertAdjacentHTML("beforeend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


//alarm setting functionalityy


function setAlarm() {
 let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
  let choosenhour = selectMenu[0].value;
  let choosenminute = selectMenu[1].value;
  let choosenampm = selectMenu[2].value;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }

alarmtime=time;

  let li = ` <li   data-time=${time} >
    <div class="timing">
   <div id="hour">${choosenhour}</div>
    <div id="minutes">${choosenminute}</div>
    <div id="second">00</div>
    <div id="ampm">${choosenampm}</div>
    </div>
    <div  onclick="deletediv(this)" class="butttn">delete</div>
    </li>`;

  ul.insertAdjacentHTML("beforeend", li);


  AllLi=document.querySelectorAll(".myalarm li")
  console.log(AllLi)


}


//delete setalarm functionality

function deletediv(div) {
  let li = div.parentElement;
  li.remove();
}


//adding eventlistner on setalarm button
setAlarmBtn.addEventListener("click", setAlarm);
