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
    // add task event
    form.addEventListener('submit', addTask);
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
        // add clas
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create new delete link element (icon)
        const link  = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class = "material-icons">clear</i>';
        // append the link to li
        li.appendChild(link);

        //append the li to the ul
        taskList.appendChild(li);

        //clkear input
        taskInput.value = '';
    }


    //console.log(li);
    
    e.preventDefault();
}