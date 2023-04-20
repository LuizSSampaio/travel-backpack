const form = document.querySelector("#novoItem");
const list = document.querySelector("#list");
const items =
    localStorage.getItem("items") != undefined
        ? /*localStorage.getItem("items")*/ []
        : [];

console.log(localStorage.getItem("items"));

form.addEventListener("submit", (eventSubmit) => {
    eventSubmit.preventDefault();

    const nameElement = eventSubmit.target["nome"];
    const quantityElement = eventSubmit.target["quantidade"];

    insertElement(createListItem(nameElement.value, quantityElement.value));

    nameElement.value = "";
    quantityElement.value = 1;
});

function createListItem(name, quantity) {
    const itemQuantity = document.createElement("strong");
    itemQuantity.innerHTML = quantity;

    const listItem = document.createElement("li");
    listItem.appendChild(itemQuantity);
    listItem.innerHTML += name;
    listItem.classList.add("item");

    items.push(JSON.stringify({ name, quantity }));

    localStorage.setItem("items", items);

    return listItem;
}

function insertElement(element) {
    list.appendChild(element);
}
