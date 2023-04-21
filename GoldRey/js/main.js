window.onload = function(){
    let lidform = document.querySelectorAll(".radio-control, .radio-control-color");
lidform.forEach(elem => {
        elem.addEventListener("mouseover", openBorder);
        elem.addEventListener("mouseout", closeBorder);
    });

    let linkPoint = document.getElementById("link--cleaning");
    let tool = document.getElementById("tooltip__cleaning");

    linkPoint.addEventListener("mouseover", openToolTip);
    tool.addEventListener("mouseleave", closeToolTip);
}

function showBorder1(inputId){
    let label1 = document.getElementById("radio-control_1");
    let label2 = document.getElementById("radio-control_2");
    let label3 = document.getElementById("radio-control_3");

    label1.style.border = "none";
    label2.style.border = "none";
    label3.style.border = "none";




    let arr = inputId.split("-");
    let blockId = arr[2];

    let btns = document.querySelectorAll(".radio-control");
    btns.forEach(btn => {
        btn.classList.remove('active');
  });

    let labelId = "radio-control_"+blockId;
    let labelBlock = document.getElementById(labelId);
    labelBlock.classList.add("active");
    labelBlock.style.border = "3px solid #008ED6";
    labelBlock.style.borderRadius = "10px";
}
function showBorder2(inputId){
    let label1 = document.getElementById("radio-control-color_1");
    let label2 = document.getElementById("radio-control-color_2");
    let label3 = document.getElementById("radio-control-color_3");
    let label4 = document.getElementById("radio-control-color_4");

    label1.style.border = "none";
    label2.style.border = "none";
    label3.style.border = "none";
    label4.style.border = "none";


    let btns = document.querySelectorAll(".radio-control-color");
    btns.forEach(btn => {
        btn.classList.remove('active');
  });

    let arr = inputId.split("-");
    let blockId = arr[2];

    let labelId = "radio-control-color_"+blockId;
    let labelBlock = document.getElementById(labelId);


    
    labelBlock.classList.add("active");
    labelBlock.style.border = "3px solid #008ED6";
    labelBlock.style.borderRadius = "10px";
}

function openBorder(elem){
    let elemId = elem.toElement.id;
    let element = document.getElementById(elemId);
    element.style.border = "3px solid #008ED6";
    element.style.borderRadius = "10px";

    element.addEventListener("mouseout", closeBorder);
}
function closeBorder(element){
    let elId = element.fromElement.id;
    let elem = document.getElementById(elId);

    let elClass = element.fromElement;
    if(!elClass.classList.contains("active")){
        elem.style.border="none";
    }
}

function playVideo(butId){
    let arr = butId.split("-");
    let buttId = "playButton-" + arr[1];
    let butPlay = document.getElementById(buttId);
    butPlay.style.visibility = "hidden";

    let posterId = "video__img-" + arr[1];
    let poster = document.getElementById(posterId);
    poster.style.visibility ="hidden";

    let polId = "img__play-" + arr[1];
    let pol = document.getElementById(polId);
    pol.style.visibility = "hidden";

    let videoId = "titleVideo-" + arr[1];
    let video = document.getElementById(videoId);
    video.style.display = "block";
    video.play();
}

function pauseVideo(vId){
    let arr = vId.split("-");
    let video = document.getElementById(vId);
    video.pause();

    let butId = "playButton-" + arr[1];
    let butPlay = document.getElementById(butId);
    butPlay.style.visibility = "visible";
    let polId = "img__play-" + arr[1];
    let pol = document.getElementById(polId);
    pol.style.visibility = "visible";

}

function openToolTip(){
    let toolTip = document.getElementById("tooltip__cleaning");
    toolTip.style.display = "flex";
}

function closeToolTip(){
    let toolTip = document.getElementById("tooltip__cleaning");
    toolTip.style.display= "none";
}

function chooseCategory(elem){
    if (elem.checked){
        let inputId = elem.id;
        let catId = "detail-" + inputId;
        let category = document.getElementById(catId);

        category.style.display = "block";
    }
    if (!elem.checked){
        let inputId = elem.id;
        let catId = "detail-" + inputId;
        let category = document.getElementById(catId);

        category.style.display = "none";
    }
    console.log(elem);
}