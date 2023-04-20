const form = document.querySelector("#novoItem");
const list = document.querySelector("#list");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach((element) => {
    elementToTheList(element.name, element.quantity);
});

form.addEventListener("submit", (eventSubmit) => {
    eventSubmit.preventDefault();

    const nameElement = eventSubmit.target["nome"];
    const quantityElement = eventSubmit.target["quantidade"];

    storageNewListItem(nameElement.value, quantityElement.value);
    elementToTheList(nameElement.value, quantityElement.value);

    nameElement.value = "";
    quantityElement.value = 1;
});

function elementToTheList(name, quantity) {
    insertElement(createListItem(name, quantity));
}

function createListItem(name, quantity) {
    const itemQuantity = document.createElement("strong");
    itemQuantity.innerHTML = quantity;

    const listItem = document.createElement("li");
    listItem.appendChild(itemQuantity);
    listItem.innerHTML += name;
    listItem.classList.add("item");

    return listItem;
}

function storageNewListItem(name, quantity) {
    items.push({ name, quantity });

    localStorage.setItem("items", JSON.stringify(items));
}

function insertElement(element) {
    list.appendChild(element);
}
