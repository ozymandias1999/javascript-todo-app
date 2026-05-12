
//Se revisa en la memoria local con la llave "tasks"

const savedTasks = localStorage.getItem("tasks")

//Se obtienen los elementos HTML previamente creados


const input = document.getElementById("tareaInput")
const buttonAgregar = document.getElementById("agregar")
let lista = document.getElementById("lista")


//Array que servirá para guardar todas las tareas creadas
let tasks = []



//Recuperar tareas guardadas
if (savedTasks) {
    tasks = JSON.parse(savedTasks)
}


//Reconstruir Intergfaz
renderTasks(tasks)

//Esuchar click

buttonAgregar.addEventListener("click", agregarTarea)



function saveTasks () {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}



//Funcion para agregar tarea

function agregarTarea () {

    //Validación de input (Si es vacío o no)
    if (input.value === "") {
        return
    }

   //Guardar texto
    const taskText = input.value
    //Creacion de objeto
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }


    //Actualizar estado
    tasks.push(newTask)
    //Guardar en el localStorage
    saveTasks()

    //Renderizar visualmente
    renderTasks(tasks)
    //Limpiar el input
    input.value = ""
    
}


//Funcion para crear la interfaz

function renderTask (task) {
    
    const li = document.createElement("li")
    const borrar = document.createElement("button")
    const text = document.createElement("span");

    text.textContent = task.text

    if(task.completed) {
        li.classList.add("done")
    }

    borrar.textContent = "X"

    borrar.addEventListener("click",(event)=> {

        event.stopPropagation()

        tasks = tasks.filter ((currentTask) => {
            return currentTask.id !== task.id
        })

        saveTasks()

        renderTasks(tasks)
    })
    //Toggle done
    li.addEventListener("click",()=> {

    task.completed = !task.completed
     
    saveTasks()
    
    renderTasks(tasks)
    })

    //Estructura del LI
    li.appendChild(text)
    li.appendChild(borrar)

    lista.appendChild(li);

}


input.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {agregarTarea()}
})


function renderTasks(taskArray) {
    lista.innerHTML = ""

    taskArray.forEach((task) => {
    renderTask(task)

})
}
