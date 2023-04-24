/*всплывающие ответы*/
function list1(elem) {
    let idButton = elem.id;
    let idText = idButton + 'text'
    let Text = document.getElementById(idText);
    let button = document.getElementById(idButton);
    
    Text.classList.toggle("pushIn");
    button.classList.toggle("plusRoll")
}

items.forEach(item => item.addEventListener('click', toggleAccordion));