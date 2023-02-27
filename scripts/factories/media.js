/* {
    "id": 342550,
    "photographerId": 82,
    "title": "Fashion Yellow Beach",
    "image": "Fashion_Yellow_Beach.jpg",
    "likes": 62,
    "date": "2011-12-08",
    "price": 55
}, */


  export function mediaFactory(data, NamePhotograph, indexArray) {

    const photographersSection = document.querySelector(".media_section");
    const mediaUrl = `FishEye_Photos/Sample Photos/${NamePhotograph}/`;

    const divGlobale = document.createElement("div");
    divGlobale.setAttribute("class", "divGlobale");
    photographersSection.appendChild(divGlobale);

    const divMineur = document.createElement("div");
    divMineur.setAttribute("class", "divMineur");
    
    if (Object.prototype.hasOwnProperty.call(data, "image")) {
    // affiche l'image
    const image = document.createElement("img");
    image.setAttribute("src", mediaUrl + data.image);
    image.setAttribute("class", "image-media");
    image.setAttribute("data-index", indexArray);
    image.setAttribute("tabIndex", "0");
    image.setAttribute("alt", data.title + ", closeup view");
    
    divGlobale.appendChild(image);
    }
    else {
    //affiche video
    const video = document.createElement("video");
    video.setAttribute("src", mediaUrl + data.video);
    video.setAttribute("data-index", indexArray);

    divGlobale.appendChild(video);

    /* video.controls = true; */

    }
    

    const sentence = document.createElement('p');
    sentence.textContent = data.title;
    sentence.setAttribute("class", "titleSentence");


    const sousTotal = document.createElement("div");
    sousTotal.setAttribute("class", "sousTotal");
    sousTotal.setAttribute("tabIndex", "0");

    const counter = document.createElement("p");
    counter.setAttribute("class", "counter");
    counter.textContent = data.likes;

    const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const heartPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path');

    heart.setAttribute('viewBox', '0 0 24 24');
    heartPath.setAttribute(
      'd',
      'M12 5.881C12.981 4.729 14.484 4 16.05 4C18.822 4 21 6.178 21 8.95C21 12.3492 17.945 15.1195 13.3164 19.3167L13.305 19.327L12 20.515L10.695 19.336L10.6595 19.3037C6.04437 15.1098 3 12.3433 3 8.95C3 6.178 5.178 4 7.95 4C9.516 4 11.019 4.729 12 5.881Z'
    );
    heart.setAttribute("class", "coeur");

    heart.appendChild(heartPath);
    heart.setAttribute("aria-label", "likes");
 



    divMineur.appendChild(sentence);
    sousTotal.appendChild(counter);
    sousTotal.appendChild(heart);
    divMineur.appendChild(sousTotal);
    divGlobale.appendChild(divMineur);
    
}
