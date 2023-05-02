let boolean1 = false

let show_Painting1 = document.getElementById("The_Two_Fridas");

show_Painting1.addEventListener("click",boolean1 == true)


function showText1(){
    if(boolean1 == true){
        show_Painting1.style.display = "block";
    } else{
        show_Painting1.style.display = "none";
    }
}