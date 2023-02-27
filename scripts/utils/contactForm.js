const modal = document.getElementById("contact_modal");
const formulaire = document.getElementById("formulaire");
const closeForm = document.getElementById("closeCrossForm");
const contactB = document.getElementsByClassName("contact_button");

contactB[0].addEventListener("click", displayModal)
closeForm.addEventListener("click", closeModal)

function displayModal() {
	modal.style.display = "block";
}


function closeModal() {
    modal.style.display = "none";
}

formulaire.addEventListener("submit", function(e) {
    let valeurs = document.querySelectorAll("input");
    e.preventDefault();

    let arrayValeur = [...valeurs];
    console.log(arrayValeur);
    valeurs.forEach(valeur => {
        valeur.value ="";
    })

    arrayValeur.forEach((arrayValeurUnit) => {
        console.log(arrayValeurUnit.value);

    })

})

document.addEventListener("keydown", function(e) {
    if(e.keyCode === 27) {
        modal.style.display = "none";
    }
})

closeForm.addEventListener("keydown", function(e) {
    if(e.keyCode === 13) {
        modal.style.display = "none";
    }
});

