const task_list_container = document.getElementById('task_list');
const add_task = document.querySelector('#add_task');
const form = document.querySelector('.form');
const completedTask = document.querySelector('.completed_task');
const ongoingTask = document.querySelector('.ongoing_task');
const hamburger = document.querySelector('#hamburger');
const navBar = document.querySelector('#nav_bar');

const tasks = [
    {name:'Learn HTML', status:'completed', description:'Learn HTML for front end web development', id:'mqta1lx4-7', img:'academicproj-images/html-pinterest-image.jpg'}, 
    {name:'Learn CSS', status:'completed', description:'learn CSS for to style webpages', id:'mqta0ble-5', img:'academicproj-images/CSS-pinterest-image-jun-25-26 .jpg'},
    {name:'Learn JS', status:'ongoing', description:'learn JS for DOM manipulation', id:'mqta1z2u-h', img:'academicproj-images/JS-pinteest-image-icon-jun-25-26-3pm .jpg'}, 
    {name:'Learn Python', status:'ongoing', description:'learn python to have a main language for eventual AI field, or robotics field', id:'mqta2uc4-l', img:'academicproj-images/python-pinterest-image-icon-jun-25-26-3.01pm.jpg'}, 
    {name:'Learn Madarin', status:'paused', description:'learn madarin for more opportunities like negotiator, chinese workspace, etc', id:'mqta397w-f', img:'academicproj-images/mandarin-pinterest-image-jun-25-26-3.03pm .jpg'},
    {name:'Learn Davinci Resolve', status:'ongoing', description:'Learn video editing as a side skill to have in todays visual world', id:'mqta3mpf-q', img:'academicproj-images/Blackmagic-Design-Releases-New-DaVinci-Resolve-16_2.jpg'}
];

const imgSrcArray = [];

/*object to hold default class names, useful for css edits */
let default_class_names = {
    task_container: 'task_container',
    task_status_p: 'status_div',
    button: 'task_button',
    describe: 'task_description',
    name: 'task_name',
    task_img: 'task_image',
    button_holder: 'button_holder'
};

/* function to iterate over an iterable, create element to contain and display */
function displayTasks(tasks, filterStatus='', classes={}){
    if (!tasks) {
        console.log('tasks are undefined')
    }
    let toDisplay = [];
    if (filterStatus === ''){
        toDisplay = tasks;
    }
    else if (filterStatus === 'completed'){
        toDisplay = tasks.filter(task => task.status === 'completed');
    }
    else if(filterStatus === 'ongoing'){
        toDisplay = tasks.filter(task => task.status === 'ongoing');
    }
    else{
        console.log(`unknown filterstatus ${filterStatus}`)
    }

    const class_name = {...default_class_names, ...classes};
    const frag = document.createDocumentFragment()

    toDisplay.forEach((task)=>{
        const task_container = document.createElement('div');
        task_container.classList.add(class_name.task_container)

        const button_holder = document.createElement('div')
        button_holder.classList.add(class_name.button_holder);

        const status_p = document.createElement('p');
        status_p.classList.add(class_name.task_status_p);
        status_p.textContent=`status: ${task.status}`;

        const task_describe = document.createElement('p');
        task_describe.classList.add(class_name.describe);
        task_describe.textContent= task.description

        const task_name = document.createElement('h2');
        task_name.classList.add(class_name.name);
        task_name.textContent= task.name

        const task_image = document.createElement('img');
        task_image.classList.add(class_name.task_img);
        task_image.alt='an image';
        task_image.src=task.img;
        
        const start_button = document.createElement('button');
        start_button.type= 'button';
        start_button.dataset.uniqueId = task.id;
        start_button.classList.add(class_name.button)
        start_button.classList.add('start_button');
        start_button.textContent= 'Start'

        const del_button = document.createElement('button');
        del_button.type= 'button';
        del_button.dataset.uniqueId = task.id;
        del_button.classList.add('delete_button');
        del_button.textContent= 'Delete';
        del_button.classList.add(class_name.button);

        const complete_button = document.createElement('button');
        complete_button.type = 'button';
        complete_button.dataset.uniqueId = task.id;
        complete_button.textContent = 'mark complete';
        complete_button.classList.add('complete_button');
        complete_button.classList.add(class_name.button);
        if(complete_button.classList.contains('completed_button') && complete_button.classList.contains('complete_button')){
            complete_button.id= 'task_completed_button';
        }
        complete_button.disabled = task.status === 'completed';

        button_holder.append(del_button, start_button, complete_button);
        task_describe.appendChild(status_p);
        task_container.append(task_name, task_image, task_describe, button_holder)

        frag.appendChild(task_container)
    })

    return frag;
}
function mainDisplay(){
    task_list_container.innerHTML= '';
    task_list_container.appendChild(displayTasks(tasks));
}

mainDisplay()

function completeDisplay(){
    completedTask.innerHTML= '';
    completedTask.appendChild(displayTasks(tasks, 'completed', {
    task_container: 'completed_task_container',
    task_status_p: 'completed_task_status',
    button: 'completed_button',
    describe: 'completed_task_desc',
    name: 'completed_task_name',
    task_img: 'completed_task_img',
    button_holder: 'completed_button_holder'
}));
}
completeDisplay();

function ongoingDisplay(){
    ongoingTask.innerHTML= '';
    ongoingTask.appendChild(displayTasks(tasks, 'ongoing', {
        task_container: 'ongoing_task_container',
        task_status_p: 'ongoing_task_status',
        describe: 'ongoing_task_desc',
        name: 'ongoing_task_name',
        task_img: 'ongoing_task_img',
        button_holder: 'ongoing_button_holder'
    }));
}
ongoingDisplay();

function refreshDisplay(){
    mainDisplay();
    completeDisplay();
    ongoingDisplay();
}


/* Id generator */
function get_unique_id(){
    const id = Date.now().toString(36);
    const suffix_id = Math.floor(Math.random() * 100000).toString(36);
    return `${id}-${suffix_id}`;
}

class addTask{
    constructor(task_name, task_description, task_status, id){
        this.name= task_name;
        this.status= task_status;
        this.description= task_description;
        this.id= id;
        /*dont forget to add img src link using imgarray containing img src */
        this.img= '';
    }

}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    let task_name = document.querySelector('#task_name').value.toString().trim();
    let task_describe = document.querySelector('#task_describe').value.toString().trim();
    const uniqueId = get_unique_id();

    const new_task = new addTask(task_name, task_describe, 'idle', uniqueId);
    tasks.push(new_task);
    refreshDisplay();
    form.reset();
});

document.addEventListener('click', (e)=>{
    if (e.target.classList.contains('complete_button')){
        let id = e.target.dataset.uniqueId;
        e.target.disabled = true;
        taskCompleted(id);
    }
    if (e.target.classList.contains('delete_button')){
        let id = e.target.dataset.uniqueId;
        deleteTask(id);
    }
    if(e.target.closest('#hamburger')){
        navBar.classList.toggle('open_nav_bar');
    }
    if(e.target.closest('#add_task')){
        form.classList.toggle('form_open')
    }
})


function taskCompleted(targetid){
    const completed_task = tasks.find(task=> task.id === targetid);
    if (completed_task){
    completed_task.status = 'completed';
    refreshDisplay();
    }
}

function deleteTask(targetid){
    const index = tasks.findIndex(task => task.id === targetid)
    if (index !== -1){
        tasks.splice(index, 1)
        refreshDisplay()
    } 
}

