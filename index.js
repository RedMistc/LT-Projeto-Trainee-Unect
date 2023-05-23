const addBtn = document.querySelector(".add-button")

const closeBtn = document.querySelector(".close-button")

const closeBtnFrase = document.querySelector(".close-button-frase")

const fraseDoDiaBtn = document.querySelector(".frase-do-dia-btn")

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

fraseDoDiaBtn.onclick = function(){
    document.querySelector(".frase-do-dia-background").style.display = "block"
}

closeBtnFrase.onclick = function(){
    document.querySelector(".frase-do-dia-background").style.display = "none"
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
        <div class="task-content" data-stats="to-do">
            <h4 class="task-title">
                ${task.titulo}
            </h4>

            
            <i class="material-icons more-vert" data-status="inactive" data-index="${i}">more_vert</i>
                <div class="delete-container"> 
                    <button class="delete-btn" data-index="${i}">
                            <i class="material-icons" id="delete-outline">delete_outline</i>
                            Excluir
                    </button>
                </div>

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
      
        tasks[index].dataset.stats = "doing"
        doingList.appendChild(tasks[index])
      
      
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
            expandDescription.style.color = "var(--text-color)"
            expandDescription.innerHTML = `Ler descrição <i class="material-icons" id="expand-more">expand_more</i>`
    
            tasks[index].querySelector(".description-body").style.display = "none"
        }
    }

    if(event.target.classList.contains('more-vert')){
        console.log("bom dia")
        const index = event.target.dataset.index
        if(event.target.dataset.status === "inactive"){
            const deleteBtn = tasks[index].querySelector(".delete-btn")
            event.target.style.color = "#226ED8"
            deleteBtn.style.display = "flex"
            event.target.dataset.status = "active"
        } else if (event.target.dataset.status === "active"){
            const deleteBtn = tasks[index].querySelector(".delete-btn")
            deleteBtn.style.display = "none"
            event.target.style.color = "black"
            event.target.dataset.status = "inactive"
        }
    }

    if(event.target.classList.contains("delete-btn")){
        const index = event.target.dataset.index
        toDoList.removeChild(tasks[index])
        delete tasks[index]
    } else if(event.target.parentElement.classList.contains("delete-btn")){
        const index = event.target.parentElement.dataset.index
        toDoList.removeChild(tasks[index])
        delete tasks[index]
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
        tasks[index].querySelector("h4").style.textDecoration = "line-through"
      
        tasks[index].dataset.stats = "done";
        doneList.appendChild(tasks[index]);
      
      
    }

    if (event.target.classList.contains('move-left')) {

        const index = event.target.dataset.index

        tasks[index].querySelector(".move-left").remove()
      
        tasks[index].dataset.stats = "to-do";
        toDoList.appendChild(tasks[index]);
      
      
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
            expandDescription.style.color = "var(--text-color)"
            expandDescription.innerHTML = `Ler descrição <i class="material-icons" id="expand-more">expand_more</i>`
    
            tasks[index].querySelector(".description-body").style.display = "none"
        }
    }

    if(event.target.classList.contains('more-vert')){
        console.log("bom dia")
        const index = event.target.dataset.index
        if(event.target.dataset.status === "inactive"){
            const deleteBtn = tasks[index].querySelector(".delete-btn")
            event.target.style.color = "#226ED8"
            deleteBtn.style.display = "flex"
            event.target.dataset.status = "active"
        } else if (event.target.dataset.status === "active"){
            const deleteBtn = tasks[index].querySelector(".delete-btn")
            deleteBtn.style.display = "none"
            event.target.style.color = "black"
            event.target.dataset.status = "inactive"
        }
    }

    if(event.target.classList.contains("delete-btn")){
        const index = event.target.dataset.index
        doingList.removeChild(tasks[index])
        delete tasks[index]
    } else if(event.target.parentElement.classList.contains("delete-btn")){
        const index = event.target.parentElement.dataset.index
        doingList.removeChild(tasks[index])
        delete tasks[index]
    }
  });
  
  doneList.addEventListener('click', (event) => {

    if (event.target.classList.contains('return')) {

        const index = event.target.dataset.index
        const button = tasks[index].querySelector(".return")

        button.classList.add("move-right")
        button.classList.remove("return")
        tasks[index].querySelector("h4").style.textDecoration = "none"
        tasks[index].querySelector(".move-left").remove()
    

        //button.querySelector("i").remove()
        button.textContent = ">"
      
      
        tasks[index].dataset.stats = "to-do";
        toDoList.appendChild(tasks[index]);
      
      
    } else if(event.target.parentElement.classList.contains('return')){

        const index = event.target.parentElement.dataset.index
        const button = tasks[index].querySelector(".return")

        button.classList.add("move-right")
        button.classList.remove("return")
        tasks[index].querySelector("h4").style.textDecoration = "none"
        tasks[index].querySelector(".move-left").remove()
    

        //button.querySelector("i").remove()
        button.textContent = ">"
      
      
        tasks[index].dataset.stats = "to-do";
        toDoList.appendChild(tasks[index]);
    }

    if (event.target.classList.contains('move-left')) {

        const index = event.target.dataset.index

        const button = tasks[index].querySelector(".return")

        button.classList.add("move-right")
        button.classList.remove("return")
        button.querySelector("i").remove()
        button.textContent = ">"
        
      
        tasks[index].dataset.stats = "doing";
        doingList.appendChild(tasks[index]);
      
      
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
            expandDescription.style.color = "var(--text-color)"
            expandDescription.innerHTML = `Ler descrição <i class="material-icons" id="expand-more">expand_more</i>`
    
            tasks[index].querySelector(".description-body").style.display = "none"
        }
    }

    if(event.target.classList.contains('more-vert')){
        console.log("bom dia")
        const index = event.target.dataset.index
        if(event.target.dataset.status === "inactive"){
            const deleteBtn = tasks[index].querySelector(".delete-btn")
            event.target.style.color = "#226ED8"
            deleteBtn.style.display = "flex"
            event.target.dataset.status = "active"
        } else if (event.target.dataset.status === "active"){
            const deleteBtn = tasks[index].querySelector(".delete-btn")
            deleteBtn.style.display = "none"
            event.target.style.color = "black"
            event.target.dataset.status = "inactive"
        }
    }

    if(event.target.classList.contains("delete-btn")){
        const index = event.target.dataset.index
        doneList.removeChild(tasks[index])
        delete tasks[index]
    } else if(event.target.parentElement.classList.contains("delete-btn")){
        const index = event.target.parentElement.dataset.index
        doneList.removeChild(tasks[index])
        delete tasks[index]
    }
  });



  //mobile caroussel

const swipeRight = document.querySelector(".swipe-right")
const swipeLeft = document.querySelector(".swipe-left")
let activeIndex = 0

swipeRight.onclick = function(){

    console.log("oiiiii")
    const section = document.getElementsByClassName("section")
    const page = document.getElementsByClassName("page")
    console.log(section)
    console.log(page)
    
    if(activeIndex < 2){
        if(activeIndex === 0){
            Array.from(section).forEach(element => {
                element.style.translate = "-100%"
            })
            Array.from(section)[0].dataset.status = "inactive"
            Array.from(section)[1].dataset.status = "active"

            Array.from(page)[0].dataset.status = "inactive"
            Array.from(page)[1].dataset.status = "active"
            activeIndex++
        } else if (activeIndex === 1){
            Array.from(section).forEach(element => {
                element.style.translate = "-200%"
            })
            Array.from(section)[1].dataset.status = "inactive"
            Array.from(section)[2].dataset.status = "active"
            Array.from(page)[1].dataset.status = "inactive"
            Array.from(page)[2].dataset.status = "active"
            activeIndex++
        }
    }
}

swipeLeft.onclick = function(){
    
    const section = document.getElementsByClassName("section")
    const page = document.getElementsByClassName("page")
   
    if(activeIndex > 0){
        if(activeIndex === 1){
            Array.from(section).forEach(element => {
                element.style.translate = "0%"
            })
            Array.from(section)[1].dataset.status = "inactive"
            Array.from(section)[0].dataset.status = "active"

            Array.from(page)[1].dataset.status = "inactive"
            Array.from(page)[0].dataset.status = "active"
            activeIndex--
        } else if (activeIndex === 2){
            Array.from(section).forEach(element => {
                element.style.translate = "-100%"
            })
            Array.from(section)[2].dataset.status = "inactive"
            Array.from(section)[1].dataset.status = "active"

            Array.from(page)[2].dataset.status = "inactive"
            Array.from(page)[1].dataset.status = "active"
            activeIndex--
        }
    }
}

const modeSwitch = document.querySelector(".mode-switch")


modeSwitch.onclick = function(){
    document.body.classList.toggle("dark-mode");
    document.querySelector(".logo-header").src = "./imagens/[Imagem] Logo azul.png"
    document.querySelector(".lightmode-background").dataset.mode = "dark"
    modeSwitch.querySelector("i").innerText = "dark_mode"
    modeSwitch.querySelector("i").classList.remove("light-mode")
    modeSwitch.querySelector("i").classList.add("dark-mode-icon")

    if(document.body.classList.contains("dark-mode") === false){
        document.querySelector(".logo-header").src = "./imagens/[Imagem] Logo branca.svg"
        document.querySelector(".lightmode-background").dataset.mode = "light"
        modeSwitch.querySelector("i").innerText = "light_mode"
        modeSwitch.querySelector("i").classList.remove("dark-mode-icon")
        modeSwitch.querySelector("i").classList.add("light-mode")
    }
}