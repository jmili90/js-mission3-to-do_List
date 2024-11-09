const taskInput = document.getElementById("input_box");
const addTask = document.getElementById("addbutton");
const tasksList = document.getElementById("ul_tasks");
//Add new task to the list
function addOneTask(){
    let liItem = document.createElement('li');
    liItem.innerHTML = taskInput.value;
    tasksList.appendChild(liItem);
    let spanx = document.createElement('span');
    spanx.innerHTML = "x";
    spanx.setAttribute("id","spanx");
    liItem.appendChild(spanx);
    }
//Move all created tasks to the localstorage
function addToLS(){
    if(tasksList.getElementsByTagName("li") != null){
            tasksArr = [];
            let tempTasksArr = [];
            //I created a temporary array to deal with the HTML list elements as an array   
            tempTasksArr = document.getElementById("ul_tasks").getElementsByTagName('li');
            for( let i=0 ; i< tempTasksArr.length ; i++){
                element1 = tempTasksArr[i].innerText.slice(0,-2);
                element2 = tempTasksArr[i].classList.contains("checked");
            let obj = {
            title : element1,
            status : element2
            }
            //Now i move the objects from the temp. array to a new one 
            tasksArr.push(obj);
            }
            localStorage.setItem('toDoList', JSON.stringify(tasksArr))
    }}
function addAll(){
    if(taskInput.value != ""){
        addOneTask();
    } else {
        alert("Type something!")
    }
    addToLS();
    taskInput.value = ""
}
//When clicking on "Add"  button
addTask.addEventListener("click", function(a){
    addAll()
})
//When pressing "Enter"
taskInput.addEventListener("keypress", function(a){
    if (a.key === "Enter"){
            addAll()
    }
})
//To check a task
tasksList.addEventListener("click", function(a){
    a.target.classList.toggle("checked")
    addToLS()
})
//To remove a task
tasksList.addEventListener("click", function(a){
    if(a.target.tagName === "SPAN"){
        a.target.parentElement.remove();
    }
    addToLS()
})
//Load all the tasks from localstorage afer we refresh the page or reopen it
function LoadFromLS(){
    let LSArray = JSON.parse(localStorage.getItem("toDoList"))
    LSArray.forEach(Loadfunction)
    function Loadfunction(item){
        let liItem = document.createElement('li');
        liItem.innerHTML = item.title;
        tasksList.appendChild(liItem);
        let spanx = document.createElement('span');
        spanx.innerHTML = "x";
        spanx.setAttribute("id","spanx");
        liItem.appendChild(spanx);
        let status = item.status;
        if(status){
            liItem.setAttribute("class","checked")
        }
    }
}
LoadFromLS()