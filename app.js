let receive = document.querySelector(".input");
let going = document.querySelectorAll(".add");
let form = document.forms;
let container = document.querySelector(".tasks");
window.onload = function aw() {
    receive.focus();
};

var mo = "rgba(209, 156, 200, 0.5)";

function addItemsToDiv() {
    if (localStorage.tasks) {
        container.style.backgroundColor = mo;
        JSON.parse(localStorage.tasks).forEach((ele) => {
            let sections = document.createElement(`div`);
            let inputing = document.createElement("input");
            let editing = document.createElement("button");
            let deleteing = document.createElement("button");
            sections.className = "min-con";
            inputing.setAttribute("readonly", true);
            inputing.setAttribute("value", `${ele.title}`);
            inputing.className = "output";
            deleteing.className = "delete";
            deleteing.textContent = "delete";
            editing.className = "editing";
            editing.textContent = "edit";
            sections.id = ele.id;
            sections.title = receive.value;
            sections.append(inputing);
            sections.append(editing);
            sections.append(deleteing);
            container.appendChild(sections);
        });
    }
}

addItemsToDiv();

form[0].onsubmit = function(e) {
    e.preventDefault();
    container.style.backgroundColor = mo;
    let sections = document.createElement(`div`);
    let inputing = document.createElement("input");
    let editing = document.createElement("button");
    let deleteing = document.createElement("button");
    sections.className = "min-con";
    inputing.setAttribute("readonly", true);
    inputing.setAttribute("value", `${receive.value}`);
    inputing.className = "output";
    deleteing.className = "delete";
    deleteing.textContent = "delete";
    editing.className = "editing";
    editing.textContent = "edit";
    sections.id = Date.now();
    inputing.title = inputing.value;
    sections.append(inputing);
    sections.append(editing);
    sections.append(deleteing);
    container.appendChild(sections);
    if (inputing.value) {
        updatelocalTasks();
    }
    receive.value = "";
};

function updatelocalTasks() {
    let results = [];
    [...container.children].forEach((element) => {
        let result = {
            id: element.id,
            title: element.firstElementChild.value,
        };
        results.push(result);
    });
    window.localStorage.setItem("tasks", JSON.stringify(results));
}

container.addEventListener("click", (ele) => {
    if (ele.target.matches(".delete")) {
        ele.target.parentElement.remove();
    }
    if (ele.target.matches(".editing")) {
        ele.target.parentElement.firstElementChild.removeAttribute("readonly");
        ele.target.parentElement.firstElementChild.setAttribute(
            "onfocus",
            " let value = this.value; this.value = null; this.value=value"
        );
        ele.target.parentElement.firstElementChild.focus();
        ele.target.parentElement.firstElementChild.onblur = function() {
            ele.target.parentElement.firstElementChild.setAttribute(
                "readonly",
                true
            );
        };
    }
    updatelocalTasks();
    if (JSON.parse(localStorage.tasks).length == 0) {
        window.localStorage.removeItem("tasks");
    }
});