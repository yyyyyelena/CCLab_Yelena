// select the element on page
let headline =  document.getElementById ("myHeadline")
let theButton =  document.getElementById ("myButton")
let theRange = document.


// attach a event lister to button
theButton.addEventListener("click",changeHeadline)

function changeHeadline(){
    // manipulate the selected element
    headline.textContent = "hello, hello, hello"
}


