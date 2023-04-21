/*всплывающее меню*/
let popUp = document.getElementsByClassName("popUpMenu");
let burger = document.getElementsByClassName('burger_button');

function myFunction() {
    burger[0].classList.toggle("change");
    popUp[0].classList.toggle('hidden');
}

/*всплывающие ответы*/
function list1(elem) {
    let idButton = elem.id;
    let idText = idButton + 'text'
    let Text = document.getElementById(idText);
    let button = document.getElementById(idButton);
    
    Text.classList.toggle("pushIn");
    button.classList.toggle("plusRoll")
}

/*кнопочный слайдер*/
let cout = 0;
let elem = document.getElementsByClassName('sliderCont1');

function tapRight() {
    console.log(cout);
    elem[cout].classList.add("hidden")
    cout++;
    if(cout>=elem.length){
        cout=0;
    }
    elem[cout].classList.remove('hidden');
}
function tapLeft() {
    console.log(cout);
    elem[cout].classList.add("hidden")
    cout--;
    if(cout<0){
        cout = elem.length-1;
    }
    elem[cout].classList.remove('hidden');
}