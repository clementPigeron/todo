const button = document.getElementById("myButton");
const rightCol = document.getElementById('content');

let lineNumber = 0;
let lineQuantity = 0;
let precedingText = 0;

recoverAll()

button.addEventListener("click", () => {
    lineNumber++;

    addLine(lineNumber);
    addTextarea(lineNumber);

    const input = document.getElementById(`customtask${lineNumber}`);
    const inputarea = document.getElementById(`text${lineNumber}`);
    const checkbox = document.getElementById(`done${lineNumber}`);

    input.addEventListener("input", () => {
        let currentli = input.id.match(/(\d+)/);
        const title = document.getElementById(`title${currentli[0]}`);
        title.textContent = input.value
        saveAll()
    })

    checkbox.addEventListener("change", () => {
        saveAll()
    })

    inputarea.addEventListener("input", () => {
        saveAll()
    })

    saveAll()
})

function addLine(currentli) {

    if (lineQuantity===0) {
        const list = document.getElementById("list");
        list.insertAdjacentHTML("beforeend","<ol></ol>")
    }

    const ol = document.querySelector('ol');

    ol.insertAdjacentHTML("beforeend",
        `<li id="line${currentli}">
            <input placeholder="écrire" class="ecrire" id="customtask${currentli}"> 
            <input type="checkbox" class="checkbox" id="done${currentli}"> 
            <button onclick="deleteLine(${currentli});deleteTextarea(${currentli})"> 🗑️​ </button> 
            <button onclick="displayTextarea(${currentli})"> > </button>
        </li>`
    );

    lineQuantity++;
}

function deleteLine(currentli) {
    if (typeof ondeleteline != "undefined") { 
        ondeleteline() 
    };

    let line = document.getElementById(`line${currentli}`);
    line.remove();
    lineQuantity--;

    if (lineQuantity===0) {
        const ol = document.querySelector('ol');
        ol.remove()
    }

    saveAll()
}

function addTextarea(currentli) {
    rightCol.insertAdjacentHTML("beforeend", 
        `<div id="text${currentli}" style="display:none;" class="bloccol">
            <span id="title${currentli}" class="title"></span>
            <br> 
            <textarea id="textarea${currentli}" class="area"></textarea>
        </div>`
    );
}

function deleteTextarea(currentli) {
    let area = document.getElementById(`text${currentli}`);
    area.remove();
    precedingText = 0;
    saveAll()
}

function displayTextarea(currentli) {
    if (!!document.getElementById(`text${precedingText}`)) {
        const area1 = document.getElementById(`text${precedingText}`);
        area1.style.display = "none";
    }

    const area2 = document.getElementById(`text${currentli}`);
    area2.style.display = "block";

    if (!!document.getElementById(`line${precedingText}`)) {
        const li1 = document.getElementById(`line${precedingText}`);
        li1.style.backgroundColor ="";
    }

    const li2 = document.getElementById(`line${currentli}`);
    li2.style.backgroundColor ="#dba186";

    precedingText = currentli;
}

function saveAll() {
    localStorage.setItem('lineQuantity', lineQuantity)
    localStorage.setItem('lineNumber', lineNumber)
    localStorage.setItem('precedingText', precedingText)

    const ol = document.querySelector('ol');
    localStorage.setItem('ol', ol.innerHTML)

    localStorage.setItem('rightCol', rightCol.innerHTML)

    const tasks = document.querySelectorAll(".ecrire")
    const textareas = document.querySelectorAll(".area")
    const checkboxes = document.querySelectorAll(".checkbox")

    if (lineQuantity>0) {
        for (i=0 ; i<lineQuantity ; i++) {
            localStorage.setItem(tasks[i].id, tasks[i].value)
            localStorage.setItem(textareas[i].id, textareas[i].value)
            localStorage.setItem(checkboxes[i].id, checkboxes[i].checked)
        }
    }
}

function recoverAll() {
    if (localStorage.getItem("lineQuantity")===null) {
        return
    }

    lineQuantity = localStorage.getItem("lineQuantity")
    lineNumber = localStorage.getItem("lineNumber")
    precedingText = localStorage.getItem("precedingText")

    if (lineQuantity>0) {
        const list = document.getElementById("list");
        list.insertAdjacentHTML("beforeend","<ol></ol>")

        const ol = document.querySelector('ol');
        ol.insertAdjacentHTML("beforeend", localStorage.getItem('ol'))

        rightCol.insertAdjacentHTML("beforeend", localStorage.getItem('rightCol'))

        const tasks = document.querySelectorAll(".ecrire")
        const textareas = document.querySelectorAll(".area")
        const checkboxes = document.querySelectorAll(".checkbox")

        for (i=0 ; i<lineQuantity ; i++) {
            tasks[i].value = localStorage.getItem(tasks[i].id)
            textareas[i].value = localStorage.getItem(textareas[i].id)
            checkboxes[i].checked = localStorage.getItem(checkboxes[i].id) === "true"
            console.log(localStorage.getItem(checkboxes[i].id))

            const thisTask = tasks[i]

            thisTask.addEventListener("input", () => {
                let currentli = thisTask.id.match(/(\d+)/);
                const title = document.getElementById(`title${currentli[0]}`);
                title.textContent = thisTask.value
                saveAll()
            })

            checkboxes[i].addEventListener("change", () => {
                saveAll()
            })

            textareas[i].addEventListener("input", () => {
                saveAll()
            })
        }
    }
}