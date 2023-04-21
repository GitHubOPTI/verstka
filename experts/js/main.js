function showgallery(id){
    console.log(id);
    let gallery = document.getElementById("gallery");
    gallery.style.display = "block";
    let img = document.getElementById("gallery-"+id);
    img.style.display = "block";
}

function closegallery(){
    let images = document.getElementsByClassName("gallery-image");
    for(var i = 0; i < images.length; i++){
        images[i].style.display = "none";
    }
    let gallery = document.getElementById("gallery");
    gallery.style.display = "none";
}