var ol = document.querySelector('ol');
var lineNumber = 0;
var line
var size = 0
var button = document.getElementById("myButton");

button.addEventListener("click", () => {
    addLine();
})

function addLine () {
    lineNumber++;
    ol.insertAdjacentHTML("beforeend", `<li id="line${lineNumber}"><input placeholder="écrire" class="ecrire"> 
        <input type="checkbox"> <button onclick="deleteLine(${lineNumber})">-</button></li>`);
    size++;
}

function deleteLine (currentli) {
    if (typeof ondeleteline != "undefined") {ondeleteline()};
    line = document.getElementById(`line${currentli}`);
    console.log(currentli);
    line.remove();
    size--;
}