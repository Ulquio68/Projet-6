import {mediaFactory} from "../factories/media.js";
import {photographerFactory} from "../factories/photographer.js";

let listeMedias;
let photographerName;
let currentIndexMedia;

async function init() {
    // Récupère les datas des photographes
    const listeDesPhotographes = await getPhotographers();
    const id = getId();
    const photographer = getPhotographerById(listeDesPhotographes, id);
    displayDataPhoto(photographer);
    photographerName = photographer.name; 
    const getThePhotographersMedia = await getPhotographersMedia();
    listeMedias = getMediasById(getThePhotographersMedia, id).sort((a, b) => a.likes - b.likes);
    displayDataMedias(listeMedias, photographerName);
    likeBottom(listeMedias, photographer);
    burgerMenu();
    nameForm(photographerName);
}
init();

async function getPhotographers() {
    let photographerJson;
    await fetch('../../data/photographers.json')
    .then (res => res.json())
    .then (data => photographerJson = data);
    // récupère les données des photographes dans le json
    return (photographerJson.photographers)
}

function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id'); 
    // retrouve l'ID de la page actuelle 
    return id;
}

function getPhotographerById(photographers, id) { 
    let photographerFind; 
    photographers.forEach(photographer => { 
        if (photographer.id == id) { 
            photographerFind = photographer;
        }
    });
    return photographerFind;
    // fait le rapprochement pour trouver le bon photographe actuel
}

async function displayDataPhoto(photographer) {
    const photographerModel = photographerFactory(photographer);
    photographerModel.headerFunc();
// appelle notre factory pour gérer le header
}






async function getPhotographersMedia() {

    let photographerJson;
    await fetch('../../data/photographers.json')
    .then (res => res.json())
    .then (data => photographerJson = data);
    // récupère les données des media dans le json
    return (photographerJson.media)
}

function getMediasById(medias, id) {
    let mediasFind = []; 
    medias.forEach(media => { 
        if (media.photographerId == id) { 
            mediasFind.push(media) 
        }
    }); 
    return mediasFind;
// récupérer les photo qui correspondent à l'id actuel selectionné
// au final on a toute les photos de l'id correspondant dans un tableau
}

async function displayDataMedias(medias, photographerName) {
    // affichage photos
    let NamePhotograph = photographerName.split(' ')[0].replace('-', ' ');
    const photographersSection = document.querySelector(".media_section");
    photographersSection.innerHTML = "";
    medias.forEach((media, index) => {
        mediaFactory(media, NamePhotograph, index); 
    });

    const conteneursMedia = [...document.querySelectorAll(".image-media, .divGlobale video")];
    const coeursLike = document.querySelectorAll(".sousTotal");

    conteneursMedia.forEach((conteneurMedia) =>  {
        conteneurMedia.addEventListener("click", openLightbox);
        conteneurMedia.addEventListener("keydown", keyCodeEnterMedia);
    });

    function keyCodeEnterMedia(e) { 
        if(e.keyCode === 13) {
            openLightbox(e);
        }
    }

    coeursLike.forEach((coeurLike) => {
        coeurLike.addEventListener("click", addLike);
        coeurLike.addEventListener("keydown", keyCodeEnterLike);

    })

    function keyCodeEnterLike(e) { 
        if(e.keyCode === 13) {
            addLike(e);
        }
    }
}

async function openLightbox(event) {
    
    const lightbox = document.getElementById("lightbox");
    const header = document.getElementById("header");
    const main = document.getElementById("main");

    lightbox.style.display = "flex";
    header.style.display = "none";
    main.style.display = "none";

    const eventActual = event.currentTarget;
    let indexMedia = parseInt(eventActual.getAttribute("data-index"));
    createMediaLightbox(eventActual.tagName, indexMedia, listeMedias);
    

    const left = document.getElementById("arrowlightLeft");
    const right = document.getElementById("arrowlightRight");
    currentIndexMedia = indexMedia;

    left.addEventListener("click", previous);
    right.addEventListener("click", next);
    document.addEventListener("keydown", arrowSwitch);
    displayArrows();
    
    function previous() {
        currentIndexMedia = currentIndexMedia - 1;

        if (Object.prototype.hasOwnProperty.call(listeMedias[currentIndexMedia], "image")) {
            createMediaLightbox("IMG", currentIndexMedia, listeMedias);
        } else {
            createMediaLightbox("VIDEO", currentIndexMedia, listeMedias);
        }
        displayArrows();
    }

    function next() {
        currentIndexMedia = currentIndexMedia + 1;
        
        if (Object.prototype.hasOwnProperty.call(listeMedias[currentIndexMedia], "image")) {
            createMediaLightbox("IMG", currentIndexMedia, listeMedias);
        } else {
            createMediaLightbox("VIDEO", currentIndexMedia, listeMedias);
        }
        displayArrows();
    }

    function displayArrows () {
        if(currentIndexMedia === 0){
            left.style.display = "none";
            right.style.display = "block";
        }
        else if(currentIndexMedia === listeMedias.length - 1) {
            right.style.display = "none";
            left.style.display = "block";
        }
        else {
            left.style.display = "block";
            right.style.display = "block";
        }
    }


    function arrowSwitch(e) {
        if(e.keyCode === 37) {
            currentIndexMedia = currentIndexMedia - 1;

            if (Object.prototype.hasOwnProperty.call(listeMedias[currentIndexMedia], "image")) {
                createMediaLightbox("IMG", currentIndexMedia, listeMedias);
            } else {
                createMediaLightbox("VIDEO", currentIndexMedia, listeMedias);
            }
            displayArrows();
        }
        else if(e.keyCode === 39) {
            currentIndexMedia = currentIndexMedia + 1;

            if (Object.prototype.hasOwnProperty.call(listeMedias[currentIndexMedia], "image")) {
                createMediaLightbox("IMG", currentIndexMedia, listeMedias);
            } else {
                createMediaLightbox("VIDEO", currentIndexMedia, listeMedias);
            }
            displayArrows();
        }
    }

    // close lightbox event
    const fermerBtn = document.getElementById("crosslight");
    const header_ = document.getElementById("header");
    const main_ = document.getElementById("main");

    fermerBtn.addEventListener("click", lightboxEnd);
    fermerBtn.addEventListener("keydown", lightboxEndEnter);
    left.addEventListener("keydown", previousEnter);
    right.addEventListener("keydown", nextEnter);

    function lightboxEnd() {
        lightbox.style.display = "none";
        header_.style.display = "block";
        main_.style.display = "block";
    }

    function lightboxEndEnter(e) {
        if(e.keyCode === 13) {
            console.log("slt");
            lightbox.style.display = "none";
            header_.style.display = "block";
            main_.style.display = "block";
        }
    }

    document.addEventListener("keydown", function(e) {
        if(e.keyCode === 27) {
            lightbox.style.display = "none";
            header_.style.display = "block";
            main_.style.display = "block";
        }
    })

    function previousEnter(e) {
        currentIndexMedia = currentIndexMedia - 1;

        if(e.keyCode === 13) {
            if (Object.prototype.hasOwnProperty.call(listeMedias[currentIndexMedia], "image")) {
                createMediaLightbox("IMG", currentIndexMedia, listeMedias);
            } else {
                createMediaLightbox("VIDEO", currentIndexMedia, listeMedias);
            }
            displayArrows();
        }
    }

    function nextEnter(e) {
        currentIndexMedia = currentIndexMedia + 1;

        if(e.keyCode === 13) {
            if (Object.prototype.hasOwnProperty.call(listeMedias[currentIndexMedia], "image")) {
                createMediaLightbox("IMG", currentIndexMedia, listeMedias);
            } else {
                createMediaLightbox("VIDEO", currentIndexMedia, listeMedias);
            }
            displayArrows();
        }
    }
}

function createMediaLightbox (typeMedia, indexMedia, mediasArray) {
    let mediaLightboxElement;
    let formatePhotographerName = photographerName.split(' ')[0].replace('-', ' ');
    const mediaUrl = `FishEye_Photos/Sample Photos/${formatePhotographerName}/`;
    const title = mediasArray[indexMedia].title;
    
    if (typeMedia === "IMG") {
        mediaLightboxElement = document.createElement("img");
        mediaLightboxElement.setAttribute("src", mediaUrl + mediasArray[indexMedia].image);
        mediaLightboxElement.setAttribute("alt", title);
    }
    else {
        mediaLightboxElement = document.createElement("video");
        mediaLightboxElement.setAttribute("src", mediaUrl + mediasArray[indexMedia].video);
        mediaLightboxElement.setAttribute("alt", title);
        mediaLightboxElement.controls = true;
    }


    const textLine = document.createElement("p");
    textLine.textContent = title;

    let conteneurMedia = document.getElementsByClassName("conteneurMedia");
    conteneurMedia[0].innerHTML = "";
    conteneurMedia[0].appendChild(mediaLightboxElement);
    conteneurMedia[0].appendChild(textLine);
}

function likeBottom(listeMedia, photographers) {
    const encadrementBot = document.getElementsByClassName("encadré");
    const petiteDivBottom = document.createElement("div");
    petiteDivBottom.setAttribute("class", "divLikes");

    let count = 0;
    let likesTotal = document.createElement("p");
    likesTotal.setAttribute("id", "likesTotal");

    listeMedia.forEach(listeMediaUnit => {
        let resultat = listeMediaUnit.likes;
        count += resultat;
    })

    likesTotal.textContent = count;


    const heart = document.createElement("img");
    heart.setAttribute("src", "/assets/icons/heart.svg");
    heart.setAttribute("class", "coeurLikeBottom")
    

    let pricePhotograph = document.createElement("p");
    pricePhotograph.textContent = photographers.price + "€ / jour";
    

    petiteDivBottom.appendChild(likesTotal);
    petiteDivBottom.appendChild(heart);
    encadrementBot[0].appendChild(petiteDivBottom);
    encadrementBot[0].appendChild(pricePhotograph);
}

function addLike(event) {
    let coeurCible = event.currentTarget.querySelector("svg");
    let compteur = coeurCible.previousSibling;
    let result = Number(compteur.textContent);


    if(coeurCible.classList.contains("clicked")) {
        coeurCible.classList.remove("clicked");
        result -= 1;
        updateGlobalCount("minus");
    } else {
        coeurCible.classList.add("clicked");
        result += 1;
        updateGlobalCount("plus");
    }

    compteur.textContent = result;

}

function updateGlobalCount(calcul) {
    let compteurBot = document.getElementById("likesTotal");
    let result = Number(compteurBot.textContent);
    calcul == "plus" ? result += 1 : result -= 1;

    compteurBot.textContent = result;
}

function burgerMenu () {
    let burgerNav = document.getElementById("burgerMenuNav");

    burgerNav.addEventListener("click", svgRotate);
    burgerNav.addEventListener("change", tri);
}

function svgRotate() {

    let svg = document.getElementById("svgBurgerImg");

    if(svg.style.transform == "rotate(0turn)") {
    svg.style.transform = "rotate(0.25turn)";

    } else {
        svg.style.transform = "rotate(0turn)";
    }
}

function tri(event) {
    switch (event.currentTarget.value) {

        case 'Popularité':
            listeMedias.sort((a, b) => a.likes - b.likes);
            break;
        case 'Date':
            listeMedias.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)})
            break;
        case 'Titre':
            listeMedias.sort((a, b) => a.title.localeCompare(b.title));
            break;

    }
    displayDataMedias(listeMedias, photographerName);

}

function nameForm(photographerName) {
    let contactName = document.getElementById("contactForm");
    contactName.innerHTML = contactName.textContent + "<br/>" + photographerName;
}

