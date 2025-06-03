const button = document.getElementById("myButton");
const rightCol = document.getElementById('content');
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const recoverButton = document.getElementById("recoverButton");

let lineNumber = 0;
let lineQuantity = 0;
let precedingText = 0;

button.addEventListener("click", () => {
    lineNumber++;

    addLine(lineNumber);
    addTextarea(lineNumber);

    const input = document.getElementById(`customtask${lineNumber}`);

    input.addEventListener("input", () => {
        let currentli = input.id.match(/(\d+)/);
        const title = document.getElementById(`title${currentli[0]}`);
        title.textContent = input.value
        console.log(title.textContent)
    })
})

saveButton.addEventListener("click", () => {
    localStorage.setItem('lineQuantity', lineQuantity)
    localStorage.setItem('lineNumber', lineNumber)
    localStorage.setItem('precedingText', precedingText)

    const ol = document.querySelector('ol');
    localStorage.setItem('ol', ol.innerHTML)

    localStorage.setItem('rightCol', rightCol.innerHTML)

    const tasks = document.querySelectorAll(".ecrire")
    const textareas = document.querySelectorAll(".area")

    if (lineQuantity>0) {
        for (i=0 ; i<lineQuantity ; i++) {
            localStorage.setItem(tasks[i].id, tasks[i].value)
            localStorage.setItem(textareas[i].id, textareas[i].value)
        }
    }
})

clearButton.addEventListener("click", () => {
    localStorage.clear()
})

recoverButton.addEventListener("click", () => {
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

        for (i=0 ; i<lineQuantity ; i++) {
            tasks[i].value = localStorage.getItem(tasks[i].id)
            textareas[i].value = localStorage.getItem(textareas[i].id)
        }
    }
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
            <input type="checkbox"> 
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