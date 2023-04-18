const form = document.querySelector("#novoItem");
const list = document.querySelector("#list");

form.addEventListener("submit", (eventSubmit) => {
    eventSubmit.preventDefault();

    insertElement(
        createListItem(
            eventSubmit.target["nome"].value, 
            eventSubmit.target["quantidade"].value
        )
    );
});

function createListItem(name, quantity) {
    const itemQuantity = document.createElement("strong");
    itemQuantity.innerHTML = quantity;

    const listItem = document.createElement("li")
    listItem.appendChild(itemQuantity);
    listItem.innerHTML += name;
    listItem.classList.add("item");

    return listItem;
}

function insertElement(element) {
    list.appendChild(element);
}