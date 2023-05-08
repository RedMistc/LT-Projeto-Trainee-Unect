const addBtn = document.querySelector(".add-button")

const closeBtn = document.querySelector(".close-button")

const createTask = document.querySelector(".create-task-btn")

const toDoList = document.getElementById("to-do")
const doingList = document.getElementById("doing")
const doneList = document.getElementById("done")

//const expandDescription = document.querySelector(".description-show")

let moveRight;


addBtn.onclick = function(){
    document.querySelector(".add-task-container").style.display = "block"
}

closeBtn.onclick = function(){
    document.querySelector(".add-task-container").style.display = "none"
}

let tasks = [];

let task = {
    titulo: "",
    descricao: "",
    stats: "to-do"
}

var i = 0;

createTask.onclick = function(){

    task.titulo = document.querySelector(".title-input").value
    task.descricao = document.querySelector(".description-input").value

    taskStructure = `
        <div class="task-content" stats="to-do">
            <h4 class="task-title">
                ${task.titulo}
            </h4>

            <i class="material-icons" id="more-vert">more_vert</i>

            <div class="move-btns">
                <button class="move-right" data-index="${i}">></button>
            </div>

            <div class="description">
                <p class="description-show" data-status="inactive" data-index="${i}">
                    Ler descrição <i class="material-icons" id="expand-more">expand_more</i>
                 </p>

                <p class="description-body">
                    ${task.descricao}
                </p>
            </div>
        </div>
    `

    taskDOM = document.createElement("div")
    taskDOM.classList.add("task-container")
    taskDOM.innerHTML = taskStructure

    tasks.push(taskDOM);

    toDoList.appendChild(tasks[i])

    document.querySelector(".add-task-container").style.display = "none"
    document.querySelector(".title-input").value = ""
    document.querySelector(".description-input").value = ""

    moveRight = document.querySelectorAll(".move-right")

    i++
}

toDoList.addEventListener('click', (event) => {

    if (event.target.classList.contains('move-right')) {

        const index = event.target.dataset.index
        
        const moveLeft = document.createElement("button")
        moveLeft.innerText = "<"
        moveLeft.dataset.index = index
        moveLeft.classList.add('move-left')

        tasks[index].querySelector(".move-btns").append(moveLeft)
      
        doingList.appendChild(tasks[index])
      
        tasks[index].dataset.stats = "doing"
      
    }
    if (event.target.classList.contains('description-show')){

        const index = event.target.dataset.index
    
        const expandDescription = tasks[index].querySelector(".description-show")
    
        if(expandDescription.dataset.status === "inactive"){
            expandDescription.dataset.status = "active"
            expandDescription.style.color = "#002D6C"
            expandDescription.innerHTML = `Esconder descrição <i class="material-icons" id="expand-less">expand_less</i>`
    
            tasks[index].querySelector(".description-body").style.display = "block"
    
        } else if(expandDescription.dataset.status === "active"){

            expandDescription.dataset.status = "inactive"
            expandDescription.style.color = "#141414"
            expandDescription.innerHTML = `Ler descrição <i class="material-icons" id="expand-more">expand_more</i>`
    
            tasks[index].querySelector(".description-body").style.display = "none"
        }
    }
  });

  doingList.addEventListener('click', (event) => {

    if (event.target.classList.contains('move-right')) {

        const index = event.target.dataset.index
        const icon = document.createElement("i")
        icon.classList.add("material-icons")
        const button = tasks[index].querySelector(".move-right")

        button.classList.add("return")
        button.classList.remove("move-right")
        button.textContent = ""
        button.appendChild(icon)
        button.querySelector("i").textContent = "replay"
      
        doneList.appendChild(tasks[index]);
      
        tasks[index].dataset.stats = "done";
      
    }

    if (event.target.classList.contains('move-left')) {

        const index = event.target.dataset.index

        tasks[index].querySelector(".move-left").remove()
      
        toDoList.appendChild(tasks[index]);
      
        tasks[index].dataset.stats = "to-do";
      
    }

    if (event.target.classList.contains('description-show')){

        const index = event.target.dataset.index
    
        const expandDescription = tasks[index].querySelector(".description-show")
    
        if(expandDescription.dataset.status === "inactive"){
            expandDescription.dataset.status = "active"
            expandDescription.style.color = "#002D6C"
            expandDescription.innerHTML = `Esconder descrição <i class="material-icons" id="expand-less">expand_less</i>`
    
            tasks[index].querySelector(".description-body").style.display = "block"
    
        } else if(expandDescription.dataset.status === "active"){

            expandDescription.dataset.status = "inactive"
            expandDescription.style.color = "#141414"
            expandDescription.innerHTML = `Ler descrição <i class="material-icons" id="expand-more">expand_more</i>`
    
            tasks[index].querySelector(".description-body").style.display = "none"
        }
    }
  });
  
  doneList.addEventListener('click', (event) => {

    if (event.target.classList.contains('return')) {

        const index = event.target.dataset.index

        tasks[index].querySelector(".move-left").remove()
    
        const button = tasks[index].querySelector(".return")

        button.classList.add("move-right")
        button.classList.remove("return")
        button.querySelector("i").remove()
        button.textContent = ">"
      
      
        toDoList.appendChild(tasks[index]);
      
        tasks[index].dataset.stats = "to-do";
      
    }

    if (event.target.classList.contains('move-left')) {

        const index = event.target.dataset.index

        const button = tasks[index].querySelector(".return")

        button.classList.add("move-right")
        button.classList.remove("return")
        button.querySelector("i").remove()
        button.textContent = ">"
        
      
        doingList.appendChild(tasks[index]);
      
        tasks[index].dataset.stats = "doing";
      
    }

    if (event.target.classList.contains('description-show')){

        const index = event.target.dataset.index
    
        const expandDescription = tasks[index].querySelector(".description-show")
    
        if(expandDescription.dataset.status === "inactive"){
            expandDescription.dataset.status = "active"
            expandDescription.style.color = "#002D6C"
            expandDescription.innerHTML = `Esconder descrição <i class="material-icons" id="expand-less">expand_less</i>`
    
            tasks[index].querySelector(".description-body").style.display = "block"
    
        } else if(expandDescription.dataset.status === "active"){

            expandDescription.dataset.status = "inactive"
            expandDescription.style.color = "#141414"
            expandDescription.innerHTML = `Ler descrição <i class="material-icons" id="expand-more">expand_more</i>`
    
            tasks[index].querySelector(".description-body").style.display = "none"
        }
    }
  });


//     if (event.target.classList.contains('move-left')){

//     const index = event.target.dataset.index

//     const expandDescription = tasks[index].querySelector(".description-show")

//     if(expandDescription.dataset.status === "inactive"){
//         expandDescription.dataset.status = "active"

//         expandDescription.innerHTML = `Esconder descrição <i class="material-icons" id="expand-less">expand_less</i>`

//         document.querySelector(".description-body").style.display = "block"

//     } else if(expandDescription.dataset.status === "active"){
//         expandDescription.dataset.status = "inactive"

//         expandDescription.innerHTML = `Ler descrição <i class="material-icons" id="expand-more">expand_more</i>`

//         document.querySelector(".description-body").style.display = "none"
//     }
// }