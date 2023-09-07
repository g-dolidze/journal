const addDay = document.querySelector("#add_btn");
const rows = document.querySelectorAll(".tr");
const data = [];
const removeDay = document.querySelector("#remove_btn");

table();
function table() {
  rows.forEach((row) => {
    const name = row.querySelector(".name").textContent;
    const average = Number(row.querySelector(".average").textContent);
    const obj = { name, average };
    data.push(obj);
  });
}

// დღის დამატება

function addNewday() {
  const rows = document.querySelectorAll(".tr");
  rows.forEach((row) => {
    const date = document.createElement("td");
    date.textContent = "0";
    row.append(date);
    date.classList.add("day");
  });
}

function getData() {
  const startDay = new Date("2022-12-05");

  const endDay = new Date("2023-05-31");
  const corentDay = startDay;

  const dateArray = [];
  while (corentDay <= endDay) {
    let classday = corentDay.getDay();
    if (classday === 1 || classday === 3 || classday === 5) {
      dateArray.push(new Date(corentDay).toDateString());
    }
    corentDay.setDate(corentDay.getDate() + 1);
  }
  return dateArray;
}

function makedays() {
  const theadTr = document.querySelector(".th");
  const newth = document.createElement("th");
  newth.classList.add("classdays");
  theadTr.append(newth);
  return theadTr;
}

function getDataNames(newday, daysName) {
  const days = document.querySelectorAll(".classdays");
  days.forEach((day, index) => {
    day.innerHTML = daysName[index];
  });
}

function removeLastColumn() {
  const thead = document.querySelector(".th");
  const theadElements = thead.children;
  const tr = document.querySelectorAll(".tr");
  const trElements = tr.children;
  if (theadElements.length > 2) {
    thead.removeChild(thead.lastChild);
    tr.forEach((td) => {
      td.removeChild(td.lastChild);
    });
  }
}
//
//
//
function totalDays() {
  const days = document.querySelectorAll(".classdays");
  const totalDays = document.querySelector("#total__days");
  totalDays.innerHTML = days.length;
}
function missidLessons() {
  const marksBoxes = document.querySelectorAll(".day");
  const missidLessons = document.querySelector("#missed__lessons");
  let counter = 0;
  marksBoxes.forEach((boxes) => {
    if (boxes.innerHTML === "0") {
      counter++;
      missidLessons.innerHTML = counter;
    }
  });
}
function totalStudents() {
  const totalStudent = document.querySelector("#totatl__students");
  const studedntsNames = document.querySelectorAll(".name");
  let counter = 0;
  for (let i = 0; i <= studedntsNames.length; i++) {
    totalStudent.innerHTML = studedntsNames.length;
  }
}

function makeprompt() {
  function callPrompt() {
    let promp = prompt("Enter the mark");
    while (promp < 0 || promp > 5 || isNaN(promp)) {
      promp = prompt("Enter the mark again");
    }
    return promp;
  }
  const shefaseba = document.querySelectorAll(".day");
  shefaseba.forEach((text) => {
    text.addEventListener("click", () => {
      if (text.innerHTML === "0") {
        text.innerHTML = callPrompt();

        if (text.innerHTML !== "0") {
          text.style.backgroundColor = "green";
        }
      }
      missidLessons();
      calcAverage();
      calcMarkAvg();
    });
  });
}

function IsEmpty() {
  const input = document.querySelector("#fullname");
  if (input.value == "") {
    alert("Write student's fullname");
  } else {
    newStudentsDys();
  }
  return;
}
// adding new student in classroom
function addingstudent() {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  const td = document.createElement("td");
  const tbody = document.querySelector("tbody");
  const input = document.querySelector("#fullname");

  tbody.append(tr);
  tr.append(th, td);
  tr.classList.add("tr");
  td.classList.add("average");
  th.classList.add("name");
  th.innerText = input.value;
  td.innerText = "0";
  input.value = "";

  return tr;
}

totalStudents();
function newStudentsDys() {
  const newStudentContainer = addingstudent();
  const totalDays = document.querySelector("#total__days");
  for (let i = 0; i < parseInt(totalDays.innerHTML); i++) {
    const td = document.createElement("td");
    newStudentContainer.append(td);
    td.classList.add("day");
    td.innerHTML = "0";
  }
}

function calcAverage() {
  const trs = document.querySelectorAll(".tr");
  for (let i = 0; i < trs.length; i++) {
    let sum = 0;
    const days_html = trs[i].querySelectorAll("td.day");
    days_html.forEach((number) => {
      sum += parseInt(number.innerText);
    });
    const avg = sum / days_html.length;
    trs[i].querySelector("td.average").innerHTML = avg.toFixed(2);
  }
}
function calcMarkAvg() {
  const avgMark = document.querySelector("#average__mark");
  const avgs = document.querySelectorAll("td.average");
  let sum = 0;
  avgs.forEach((students) => {
    sum += Number(students.innerText);
    avgMark.innerText = (sum / avgs.length).toFixed(2);
  });
}

const addstudent = document.querySelector("#addnew_student");
addstudent.addEventListener("click", (e) => {
  e.preventDefault();
  totalStudents();
  calcMarkAvg();
  IsEmpty();
  makeprompt();
});

addDay.addEventListener("click", () => {
  addNewday();
  getDataNames(makedays(), getData());
  makeprompt();
  totalDays();
  missidLessons();
  table();
  calcAverage();
  calcMarkAvg();
});
removeDay.addEventListener("click", () => {
  removeLastColumn();
  totalDays();
  calcAverage();
  calcMarkAvg();
});
