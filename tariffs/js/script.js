$(document).ready(function() {
    $("#tariff_mode").on("change", function () {
        tariffModePreview(this);
    })
});

function tariffModePreview(ele) {
    if($(ele).prop("checked") === true){
        $('.selectors').addClass('right-preview').removeClass('left-preview');
        $('.variant-box-buttons').addClass('show-variant').removeClass('hide-variant');
        $('.variant-cloud-buttons').addClass('hide-variant').removeClass('show-variant');
    }
    else if($(ele).prop("checked") === false){
        $('.selectors').addClass('left-preview').removeClass('right-preview');
        $('.variant-cloud-buttons').addClass('show-variant').removeClass('hide-variant');
        $('.variant-box-buttons').addClass('hide-variant').removeClass('show-variant');
    }
}

function setValueToSpanFromRange(spanID, rangeID, variants=['','',''])
{
    const value = document.querySelector(`#${spanID}`);
    const input = document.querySelector(`#${rangeID}`);
    if (value.id === "month-span")
    {
        let new_value;
        switch (input.value)
        {
            case "1":
                new_value = 1;
                break;
            case "9.3":
                new_value = 3;
                break;
            case "17.6":
                new_value = 6;
                break;
            case "25.9":
                new_value = 12;
                break;
            default:
                break;
        }
        value.textContent = new_value + ' ' + getNoun(new_value, variants[0], variants[1], variants[2]);
    }
    else
    {
        value.textContent = input.value + ' ' + getNoun(input.value, variants[0], variants[1], variants[2]);
    }
    const setProgress = progress => {
        let value;
        value = `${(progress/input.getAttribute('max'))*100}%`;
        // console.log(value);
        input.style.setProperty('--progress', value);
    };
    setProgress(input.value);
    input.addEventListener("input", (event) => {
        if (value.id === "month-span")
        {
            let new_value;
            switch (event.target.value)
            {
                case "1":
                    new_value = 1;
                    break;
                case "9.3":
                    new_value = 3;
                    break;
                case "17.6":
                    new_value = 6;
                    break;
                case "25.9":
                    new_value = 12;
                    break;
                default:
                    break;
            }
            value.textContent = new_value + ' ' + getNoun(new_value, variants[0], variants[1], variants[2]);
        }
        else
        {
            value.textContent = event.target.value + ' ' + getNoun(event.target.value, variants[0], variants[1], variants[2]);
        }
        setProgress(event.target.value);
    });
}

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}
setValueToSpanFromRange('people-span', 'people-range', ['человек', 'человека', 'человек']);
setValueToSpanFromRange('apps-span', 'apps-range', ['приложение', 'приложения', 'приложений']);
setValueToSpanFromRange('month-span', 'month-range', ['месяц', 'месяца', 'месяцев']);

// select custom code
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML === this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt === y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);