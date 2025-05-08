const ol = document.querySelector('ol');
var lineNumber = 0;
var size = 0
const button = document.getElementById("myButton");
const rightCol = document.getElementById('content')

button.addEventListener("click", () => {
    addLine();
    addTextarea();
})

function addLine() {
    lineNumber++;
    ol.insertAdjacentHTML("beforeend",
        `<li id="line${lineNumber}">
            <input placeholder="écrire" class="ecrire"> 
            <input type="checkbox"> 
            <button onclick="deleteLine(${lineNumber});deleteTextarea(${lineNumber})"> - </button> 
            <button onclick="displayTextarea(${lineNumber})"> > </button>
        </li>`
    );
    size++;
}

function deleteLine(currentli) {
    if (typeof ondeleteline != "undefined") { ondeleteline() };
    let line = document.getElementById(`line${currentli}`);
    console.log(currentli);
    line.remove();
    size--;
}

function addTextarea() {
    rightCol.insertAdjacentHTML("beforeend", `<textarea id="text${lineNumber}" style="display:none;"></textarea>`);
}

function deleteTextarea(currentli) {
    let area = document.getElementById(`text${currentli}`);
    area.remove();
}

function displayTextarea(currentli) {

}