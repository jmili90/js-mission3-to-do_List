const taskInput = document.getElementById("input_box");
const addTask = document.getElementById("addbutton");
const tasksList = document.getElementById("ul_tasks");

// create an object
const taskObject = {
    id: 0,
    title: taskInput.value,
    status: false      
}

function addOneTask(taskObject) {
if(taskObject.title != '') {
    let liItem = document.createElement("li");
    let textnode = document.createTextNode(taskObject.title);

    let span11 = document.createElement("span");
    span11.innerHTML="x"    
    

    liItem.appendChild(textnode);
    liItem.appendChild(span11);
    
    if(taskObject.status) {
        liItem.classList.toggle("checked");
    }

    span11.setAttribute("id","spanx");
            
    tasksList.appendChild(liItem);


    let listId = taskObject.id;
    liItem.setAttribute("id",listId); 

    // remove a task
    span11.addEventListener("click", function(){
        tasksList.removeChild(liItem);
        localStorage.removeItem(taskObject.id);
    })    
}
}

function add_Task() {
    // set different id value to each object
    let x = 0;
    for (let i=0; i<localStorage.length; i++) {
        if(parseInt(localStorage.key(i)) >= x){
            x = parseInt(localStorage.key(i)) + 1;
        }
    }

    let taskObject = {
        id: x,
        title: taskInput.value,
        status: false
        }
    addOneTask(taskObject);

    console.log(JSON.stringify(taskObject))
    
    if(taskObject.title != "") {
        saveOnetask(taskObject) 
    }

    taskInput.value = "";
}

// when clicking the button
addTask.addEventListener("click", function(a){
    add_Task()
    }) 
// when pressing "Enter"
taskInput.addEventListener("keypress", function(a){
    if(a.key === "Enter"){
        addTask.click();
    }    
    })
// turn a task as completed
tasksList.addEventListener("click", function(a) {    
    if(a.target.tagName == "LI"){
            a.target.classList.toggle("checked");

            let id = a.target.getAttribute("id");

            let title = a.target.innerHTML;
            title = title.replace('<span id="spanx">x</span>',"");
            
            let x2 = a.target.classList.contains("checked");
            
            const taskObject = {
                id : id,
                title : title,
                status: x2
            }
            saveOnetask(taskObject)

    }
    });

// save to localStorage
function saveOnetask(taskObject){
      localStorage.setItem(taskObject.id, JSON.stringify(taskObject));
    
}

// load from localStorage
function loadAllTasks(){
    for(let i=0;i<localStorage.length;i++){
        let id = localStorage.key(i);
        let taskObject = JSON.parse(localStorage.getItem(id));
        addOneTask(taskObject)
    }
}

loadAllTasks()
