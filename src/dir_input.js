const enterbutton = document.getElementById("enterbutton");
let uo_dir = document.getElementById("uodir");
const succes_text = document.getElementById("succestext");
let varfile = require("./var.json");

succes_text.innerText = "";

function setdirectory(){
    var ultima_dir = localStorage.getItem("ultimaDir");  
    localStorage.setItem("ultimaDir", uo_dir.value);  
    succes_text.innerText = "Changed Directory!";
    console.log("Done");
}





enterbutton.onclick = setdirectory;