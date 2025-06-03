const ol = document.querySelector('ol');
const button = document.getElementById("myButton");
const rightCol = document.getElementById('content');

let lineNumber = 0;
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

function addLine(currentli) {
    ol.insertAdjacentHTML("beforeend",
        `<li id="line${currentli}">
            <input placeholder="écrire" class="ecrire" id="customtask${currentli}"> 
            <input type="checkbox"> 
            <button onclick="deleteLine(${currentli});deleteTextarea(${currentli})"> 🗑️​ </button> 
            <button onclick="displayTextarea(${currentli})"> > </button>
        </li>`
    );
}

function deleteLine(currentli) {
    if (typeof ondeleteline != "undefined") { ondeleteline() };
    let line = document.getElementById(`line${currentli}`);
    line.remove();
}

function addTextarea(currentli) {
    rightCol.insertAdjacentHTML("beforeend", 
        `<div id="text${currentli}" style="display:none;" class="bloccol">
            <span id="title${currentli}" class="title"></span>
            <br> 
            <textarea id="textarea${currentli}"></textarea>
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