// define UI variables

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


// load all event listeners
loadEventListeners();

function loadEventListeners()
{
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //clear task event
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//get tasks from local storage
function getTasks()
{
    
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task)
    {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new delete link element
        const link  = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        //add icon in the link
        link.innerHTML = '<i class = "material-icons">clear</i>';
        // append the link to li
        li.appendChild(link);

        //append the li to the ul
        taskList.appendChild(li);
    });
}

// add task
function  addTask(e)
{
    if(taskInput.value === '')
    {
        alert('Add a task');
        
    }
    else
    {
        
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create new delete link element
        const link  = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        //add icon in the link
        link.innerHTML = '<i class = "material-icons">clear</i>';
        // append the link to li
        li.appendChild(link);

        //append the li to the ul
        taskList.appendChild(li);

        // store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //clear input
        taskInput.value = '';
    }
    //console.log(li);
    
    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e)
{   
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?'))
        {
            e.target.parentElement.parentElement.remove(); //removes the li
            
            // remove from local storage
            removeTaskFromLocalStorage(
                e.target.parentElement.parentElement
            );

            // console.log(e.target.parentElement.parentElement);
        }

    }
    
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    //console.log(taskItem.firstChild.textContent);
    
    tasks.forEach(function(task, index){
        if(taskItem.firstChild.textContent === task)
        {
            tasks.splice(index, 1);
            //console.log(task);
        
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e)
{
    //taskList.innerHTML = '';

    //OR

    if(!taskList.firstChild)
    {
        alert('No tasks to clear. Please add a task!');
    }
    // faster
    else
    {
           if(confirm('Are you sure?'))
           {
            while(taskList.firstChild) //while first child exsits means while something is there in the list
            {
                taskList.removeChild(taskList.firstChild);
            }
           }

    }

    // clear from local storage
    clearTasksFromLocalStorage();
}

//clear from local storage
function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

//filter tasks

function filterTasks(e)
{
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const liItem = task.firstChild.textContent; //first Child means first li of ul
        if(liItem.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        }
        else
        {
            task.style.display = 'none'
        }
    });


}