const form = document.querySelector("#novoItem");
const list = document.querySelector("#list");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach((element) => {
    elementToTheList(element);
});

form.addEventListener("submit", (eventSubmit) => {
    eventSubmit.preventDefault();

    const nameTarget = eventSubmit.target["nome"];
    const quantityTarget = eventSubmit.target["quantidade"];

    const element = {
        "name": nameTarget.value,
        "quantity": quantityTarget.value
    };

    const existElement = items.find(elementToFind => elementToFind.name === element.name);


    if (existElement) {
        element.id = existElement.id;

        editListItem(element);

        items[existElement.id] = element;
    } else {
        element.id = items.length

        items.push(element)
        elementToTheList(element);
    };

    localStorage.setItem("items", JSON.stringify(items))

    nameTarget.value = "";
    quantityTarget.value = 1;
});

function elementToTheList(element) {
    insertElement(createListItem(element));
}

function createListItem(element) {
    const itemQuantity = document.createElement("strong");
    itemQuantity.innerHTML = element.quantity;
    itemQuantity.dataset.id = element.id;

    const listItem = document.createElement("li");
    listItem.appendChild(itemQuantity);
    listItem.innerHTML += element.name;
    listItem.classList.add("item");

    return listItem;
}

function editListItem(element) {
    document.querySelector(`[data-id="${element.id}"]`).innerHTML = element.quantity
}

function insertElement(element) {
    list.appendChild(element);
}
