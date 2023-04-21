const form = document.querySelector("#novoItem");
const list = document.querySelector("#list");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach((element) => {
    insertElement(createListItem(element));
});

form.addEventListener("submit", (eventSubmit) => {
    eventSubmit.preventDefault();

    const nameTarget = eventSubmit.target["nome"];
    const quantityTarget = eventSubmit.target["quantidade"];

    const element = {
        name: nameTarget.value,
        quantity: quantityTarget.value,
    };

    const existElement = items.find(
        (elementToFind) => elementToFind.name === element.name
    );

    if (nameTarget.value != "") {
        if (existElement) {
            element.id = existElement.id;

            editListItem(element);

            items[existElement.id] = element;
        } else {
            element.id = generateID();

            items.push(element);
            insertElement(createListItem(element));
        }

        saveLocalStorage("items", JSON.stringify(items));
    }

    nameTarget.value = "";
    quantityTarget.value = 1;
});

function generateID() {
    console.log(items.length);
    if (items.length != 0) {
        return items[items.length - 1].id + 1;
    } else {
        return 0;
    }
}

function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function createListItem(element) {
    const itemQuantity = document.createElement("strong");
    itemQuantity.innerHTML = element.quantity;
    itemQuantity.dataset.id = element.id;

    const listItem = document.createElement("li");
    listItem.appendChild(itemQuantity);
    listItem.innerHTML += element.name;
    listItem.classList.add("item");
    listItem.appendChild(createDeleteButton(element.id));

    return listItem;
}

function editListItem(element) {
    document.querySelector(`[data-id="${element.id}"]`).innerHTML =
        element.quantity;
}

function insertElement(element) {
    list.appendChild(element);
}

function createDeleteButton(id) {
    const button = document.createElement("button");
    button.innerText = "X";

    button.addEventListener("click", function () {
        deleteElement(this.parentNode, id);
    });

    return button;
}

function deleteElement(tag, id) {
    tag.remove();

    items.splice(
        items.findIndex((element) => element.id === id),
        1
    );

    saveLocalStorage("items", JSON.stringify(items));
}
