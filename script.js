const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//!Local store some methods (setItem(), getItem(), removeItem())

//? setItem()
// localStorage.setItem("Name", "M Subhan Khan");
//? getItem()
// const result = localStorage.getItem("Name");
//? removeItem()
// localStorage.removeItem("Name");

//Delete Tasks
const removeTasks = id => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks = tasks.filter(task => {
    return task.id !== +id;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
};

//Get Tasks
const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);
  //render in DOM
  let output;
  let allTasks = tasks.map(task => {
    return `<li id="item">
<span>${task.title}</span>
<button onclick="removeTasks('${task.id}')" id="delete">X</button>
</li>`;
  });
  output = allTasks.join("");
  // console.log(output);
  outputEl.innerHTML = output;
};
getTasks();

//Add task in the into local storage
const addTask = e => {
  e.preventDefault();
  console.log(inputEl.value);
  if (inputEl.value === "") {
    alert("Please Enter some value in the input Field");
  }
  //get the item
  const task = inputEl.value;
  if (task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
      console.log(tasks);
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(tasks);
    }
    tasks.unshift({
      id: Date.now(),
      title: task,
    });
    //save to storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  inputEl.value = "";
  getTasks();
};

//add event listener
form.addEventListener("submit", addTask);
