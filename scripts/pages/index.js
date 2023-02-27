import {photographerFactory} from "../factories/photographer.js";

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    let photographerJson;
    await fetch('../../data/photographers.json')
    .then (res => res.json())
    .then (data => photographerJson = data);

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: photographerJson.photographers})
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}


    