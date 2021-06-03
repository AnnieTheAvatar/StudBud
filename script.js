
// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

var slider = document.getElementById("priorityInput");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

// array which stores every todos
let todos = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  let task = todoInput.value;
  let date = (new Date()).toLocaleDateString('en-US') //Convert to short date format
  let dD = dueDateInput.value;
  let prio = priorityInput.value + "%";
  let time = timeConvert(estimatedTimeInput.value)
  let note = notesInput.value;
  
  // Call the addTask() function using
  addTodo(task, date, dD, prio, time, note, false);
  
  //addTodo(todoInput.value); // call addTodo function with input box current value
});

// function to add todo
function addTodo(item, createdDate, dueDate, priorityRating, estimatedTime, notes, completionStatus) {
  
  // if item is not empty
  if (item !== '') {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: item,
      due: dueDate,
      weight: priorityRating,
      time: estimatedTime,
      note: notes,
      completed: false
    };

    // then add it to todos array
    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage

    // finally clear the input box value
    todoInput.value = '';
  }
}

// function to render given todos to screen
function renderTodos(todos) {
  // clear everything inside <ul> with class=todo-items
  todoItemsList.innerHTML = '';

  // run through each item inside todos
  todos.forEach(function(item) {
    // check if the item is completed
    const checked = item.completed ? 'checked': null;

    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = "<input type='checkbox' class='checkbox' ${checked}><button class='delete-button'>X</button><p class='items'><strong>" + item.name + "</strong></br>Due: " + item.due + "</br>Weight: " + item.weight + "</br>Notes: " + item.note + "</p>";
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });

}

// function to add todos to local storage
function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string;
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  //console.log(id);
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
  
  // update the localStorage
  addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'))
    //console.log(event.target.parentElement.nodeName);
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
    //console.log(event.target.parentElement.nodeName)
  }
});


/*
//TASK LIST
// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button"); // Complex CSS query
const tasklist = document.getElementById("tasklist");
const taskInput = document.getElementById("taskInput");

var slider = document.getElementById("priorityInput");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

// Event listener for Button click

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  let task = taskInput.value;
  let date = (new Date()).toLocaleDateString('en-US') //Convert to short date format
  let dD = dueDateInput.value;
  let prio = priorityInput.value + "%";
  let time = timeConvert(estimatedTimeInput.value)
  let note = notesInput.value;
  
  // Call the addTask() function using
  addTask(task, date, dD, prio, time, note, false);

  // Log out the newly populated taskList everytime the button has been pressed
})

// Create an empty array to store our tasks
var taskList = [];

function addTask(taskDescription, createdDate, dueDate, priorityRating, estimatedTime, notes, completionStatus) {
  let task = {
    taskDescription,
    createdDate,
    dueDate,
    priorityRating,
    estimatedTime,
    notes,
    completionStatus
  };

  let key = (localStorage.length + 1).toString();
  var value = taskDescription;
  localStorage.setItem(key,value);
  console.log(key,value);
  // Add the task to our array of tasks
  taskList.push(task);
  // Separate the DOM manipulation from the object creation logic
  renderTask(task);
  renderCovey(taskDescription, dueDate, priorityInput.value);
}

// Function to display the item on the page
function renderTask(task) {
  let item = document.createElement("li");
  item.innerHTML = "<p>" + task.taskDescription + "</br>Due: " + task.dueDate + "</br>Weight: " + task.priorityRating + "</br>Notes: " +task.notes + "</p>" ;

  tasklist.appendChild(item);

  // Setup delete button DOM elements
  let delButton = document.createElement("button");
  delButton.className = "delete-button";
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton); // Adds a delete button to every task

  // Listen for when the 
  delButton.addEventListener("click", function(event){
    item.remove();
    localStorage.removeItem();
     // Remove the task item from the page & local storage when button clicked
    // Because we used 'let' to define the item, this will always delete the right element
  })

  // Setup completed button DOM elements
  let doneButton = document.createElement("button");
  doneButton.className = "done-button";
  let doneButtonText = document.createTextNode("Completed!");
  doneButton.appendChild(doneButtonText);
  item.appendChild(doneButton); // Adds a delete button to every task

  doneButton.addEventListener("click", function(event){
    item.innerHTML = "<p>" + task.taskDescription + "</p";
    item.appendChild(delButton);
    item.setAttribute('class','checked'); // strike through the completed task
    // Because we used 'let' to define the item, this will always delete the right element
  })
  
}
*/

//converting minutes to hours:mins
function timeConvert(n) {
var num = n;
var hours = (num / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
return rhours + "hr : " + rminutes + "min";
}

//openning and closing the form
function openForm() {
  document.getElementById("taskform").style.display = "block";
}

function closeForm() {
  document.getElementById("taskform").style.display = "none";
}

//COVEY QUADRANTS

function renderCovey(){
  todos.forEach(function(item) {
    var today = new Date();
    let date1 = new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
    let date2 = new Date(item.due);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var timeRemaining = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    var weight = (item.weight).slice(0, -1);

    if (timeRemaining <= 14 && weight >= 30) {
      let cov = document.createElement("li");
      cov.innerHTML = "<p>" + item.name + "</p>";
      urgimp.appendChild(cov);
    }
    else if (timeRemaining <= 14 && weight < 30) {
      let cov = document.createElement("li");
      cov.innerHTML = "<p>" + item.name + "</p>";
      urgnot.appendChild(cov);
    }
    else if (timeRemaining > 14 && weight >= 30) {
      let cov = document.createElement("li");
      cov.innerHTML = "<p>" + item.name + "</p>";
      notimp.appendChild(cov);
    }
    else if (timeRemaining > 14 && weight < 30) {
      let cov = document.createElement("li");
      cov.innerHTML = "<p>" + item.name + "</p>";
      notnot.appendChild(cov);
  }})
};

//STOPWATCH
const timer = document.getElementById('stopwatch');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}


//POMODORO TIMER

// Select Pomodoro display to edit timer content
const pomodoroDisplay = document.querySelector(".timer-display");

// Select start, pause & stop buttons
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const pauseButton = document.querySelector(".pause");

// Select fields to increment total work & break sessions
const workSession = document.querySelector(".work-sessions");
const breakSession = document.querySelector(".break-sessions");

// Select div to display session type
const sessionType = document.querySelector(".session-type");
const buttonGroup = document.querySelector(".button-group");
// display initial timer state at the start
const progressBar = new ProgressBar.Circle(pomodoroDisplay, {
  strokeWidth: 2,
  text: {
    value: "25:00"
  },
  trailColor: "rgba(255, 255, 255, 0.308)",
  color: "#f3f3f3",
  svgStyle: {
    // Important: make sure that your container has same
    // aspect ratio as the SVG canvas. See SVG canvas sizes above.
    width: "85%"
  }
});

// Set a flag to check if pomodoro was paused
let timerRunning = true;

// Set a flag to check if timer was stopped
let timerStopped = false;

// set pomodoro interval time
let timerSeconds = 1500;
let currentSessionTime = 1500;

// set break interval time
let breakSeconds = 300;

//Set a variable to calculate time spent in current session
let timeSpent = 0;

// Declare  variable for setInterval
let timerInterval = null;

// Declare a variable to define type of session
let type = "work";

// set variables for counting total work & break sessions
let totalWorkSessions = 0;
let totalBreakSessions = 0;

// set function to initialize buttons at start of application
function initializeButtons() {
  startButton.style.display = "block";
  stopButton.style.display = "none";
  pauseButton.style.display = "none";
}

// set a function to toggle session type
const toggleSession = function() {
  if (type === "work") {
    type = "break";
    currentSessionTime = breakSeconds;
  } else {
    type = "work";
    currentSessionTime = timerSeconds;
  }
};

// Calculate session progress for progressbar
const calculateSessionProgress = () => {
  // calculate the completion rate of this session
  let sessionTotalTime = type === "work" ? timerSeconds : breakSeconds;
  return timeSpent / sessionTotalTime;
};

// set a display timer function to format time-
const displayTimer = function(timeInput) {
  // convert seconds into minutes
  var minutes = Math.floor(timeInput / 60);
  var remainingSeconds = timeInput - minutes * 60;
  // format time for single digit prepend by 0
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  // return display time
  progressBar.text.innerText = `${minutes}:${remainingSeconds}`;
  workSession.textContent = totalWorkSessions;
  breakSession.textContent = totalBreakSessions;
  sessionType.textContent = type;
};

// Reset timer Seconds
const resetTimerSeconds = function() {
  currentSessionTime = 1500;
};

// Set a time function to run pomodoro intervals
const timerStart = function() {
  if (timerRunning) {
    timerInterval = setInterval(function() {
      timeSpent++;
      currentSessionTime--;
      displayTimer(currentSessionTime);
      progressBar.set(calculateSessionProgress());
      if (currentSessionTime < 0) {
        if (type === "work") {
          totalWorkSessions++;
        } else {
          totalBreakSessions++;
        }
        timeSpent = 0;
        timerRunning = false;
        clearInterval(timerInterval);
        toggleSession();
        initializeButtons();
        displayTimer(currentSessionTime);
        progressBar.set(calculateSessionProgress());
      }
    }, 1000);
  }
};

// Set a function to pause timer
const pauseTimer = function() {
  if (!timerRunning) {
    clearInterval(timerInterval);
  }
};

// set a function to stop timer
const stopTimerP = function() {
  if (timerStopped) {
    timeSpent = 0;
    clearInterval(timerInterval);
    resetTimerSeconds();
    displayTimer(currentSessionTime);
    progressBar.set(calculateSessionProgress());
    timerStopped = false;
  }
};

// Listen for clicks on the document
document.addEventListener("click", function(event) {
  // Start pomodoro on click on start button
  if (event.target.classList.contains("start")) {
    timerRunning = true;
    timerStart();
    startButton.style.display = "none";
    pauseButton.style.display = "block";
    stopButton.style.display = "block";
  }

  if (event.target.classList.contains("pause")) {
    timerRunning = false;
    pauseTimer();
    pauseButton.style.display = "none";
    startButton.style.display = "block";
  }

  if (event.target.classList.contains("stop")) {
    timerStopped = true;
    stopTimerP();
    initializeButtons();
  }
});

// display buttons at the start of timer
initializeButtons();

//READING LIST
//openning and closing the form
function openReading() {
  document.getElementById("readingform").style.display = "block";
}

function closeReadForm() {
  document.getElementById("readingform").style.display = "none";
}
/*
// Setting up variables for our HTML elements using DOM selection
const readform = document.getElementById("readingform");
const readbutton = document.querySelector("#readingform > button"); // Complex CSS query
const readinglist = document.getElementById("readinglist");
const refInput = document.getElementById("refInput");

// Event listener for Button click

function submitList(){
  event.preventDefault(); 

  let ref = refInput.value;
  let link = linkInput.value;
  let notes = readnotesInput.value;
  
  // Call the addRef() function using
  addRef(ref, link, notes);

  // Log out the newly populated taskList everytime the button has been pressed
}

// Create an empty array to store our tasks
var readingList = [];

function addRef(refName, link, notes) {
  let ref = {
    refName,
    link,
    notes
  };

  // Add the task to our array of tasks
  readingList.push(ref);
  
  // Separate the DOM manipulation from the object creation logic
  renderList(ref);
}

// Function to display the item on the page
function renderList(ref) {
  let item = document.createElement("li");
  item.innerHTML = "<p>" + ref.refName + "</p>";
  readinglist.appendChild(item);

  let openButton = document.createElement("button");
  openButton.className = "openbutton";
  let openButtonText = document.createTextNode("Open");
  openButton.appendChild(openButtonText);
  item.appendChild(openButton); // Adds a delete button to every task

    // Listen for when the delete button is pressed
  openButton.addEventListener("click", function(event){
    window.open(ref.link);
    
    })

  // Setup delete button DOM elements
  let delButton = document.createElement("button");
  delButton.className = "delete-button";
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton); // Adds a delete button to every task

    // Listen for when the delete button is pressed
  delButton.addEventListener("click", function(event){
    item.remove(); }) // Remove the task item from the page when button clicked
    // Because we used 'let' to define the item, this will always delete the right element

  //edit button
  let edButton = document.createElement("button");
  edButton.className = "edit-button";
  let edButtonText = document.createTextNode("Edit");
  edButton.appendChild(edButtonText);
  item.appendChild(edButton);

    // Listen for when the edit button is pressed
  edButton.addEventListener("click", function(event){
    }// edit the task 
    // Because we used 'let' to define the item, this will always delete the right element
    )
  
  // Clear the value of the input once the task has been added to the page
  //form.reset();
  }

*/
//READING LIST 2
const readForm = document.querySelector('.read-form');
// select the input box
const readInput = document.querySelector('.read-input');
// select the <ul> with class="todo-items"
const readItemsList = document.querySelector('.read-items');


// array which stores every todos
let readingList = [];

// add an eventListener on form, and listen for submit event
readForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault(); 

  let ref = refInput.value;
  let link = linkInput.value;
  let notes = readnotesInput.value;
  let tag = groupInput.value;
  
  // Call the addTask() function using
  addRef(ref, link, notes, tag);
  
  //addTodo(todoInput.value); // call addTodo function with input box current value
});

// function to add todo
function addRef(refName, link, notes, tag) {
  
  // if item is not empty
  if (refName !== '') {
    // make a todo object, which has id, name, and completed properties
    const ref = {
      id: Date.now(),
      name: refName,
      links: link,
      note: notes,
      group: tag
    };

    // then add it to todos array
    readingList.push(ref);
    addToLocalStorage(readingList); // then store it in localStorage

    // finally clear the input box value
    refInput.value = '';
  }
}

// function to render given todos to screen
function renderRefs(readingList) {
  // clear everything inside <ul> with class=todo-items
  readItemsList.innerHTML = '';

  // run through each item inside todos
  readingList.forEach(function(item) {
    // check if the item is completed
    //const checked = item.completed ? 'checked': null;

    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    //if (item.completed === true) {
      //li.classList.add('checked');
    //}

    li.innerHTML = "<button class='open-button'>Open</button><button class='delete-button'>X</button><p class='items'><strong>" + item.name + "</strong></br>Notes: " + item.note + "</br>Group: " + item.tag + "</p>";
    // finally add the <li> to the <ul>
    readItemsList.append(li);
  });

}

// function to add todos to local storage
function addToLocalStorage(readingList) {
  // conver the array to string then store it.
  localStorage.setItem('readingList', JSON.stringify(readingList));
  // render them to screen
  renderRefs(readingList);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('readingList');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    readingList = JSON.parse(reference);
    renderRefs(readingList);
  }
}

// toggle the value to completed and not completed
function open(id) {
  readingList.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string;
    if (item.id == id) {
      // toggle the value
      window.open(item.link);
      console.log(item.id)
    }
  });

  addToLocalStorage(readingList);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteRef(id) {
  // filters out the <li> with the id and updates the todos array
  //console.log(id);
  readingList = readingList.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
  
  // update the localStorage
  addToLocalStorage(readingList);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
readItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.classList.contains('open-button')) {
    // toggle the state
    open(event.target.parentElement.getAttribute('data-key'))
    //console.log(event.target.parentElement.nodeName);
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteRef(event.target.parentElement.getAttribute('data-key'));
    //console.log(event.target.parentElement.nodeName)
  }
});