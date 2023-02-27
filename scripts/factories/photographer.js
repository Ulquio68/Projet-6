export function photographerFactory(data) {
    const { name, portrait, city, country, tagline, id, price} = data;

    const picture = `FishEye_Photos/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const linkPhotograph = document.createElement ('a');
        linkPhotograph.setAttribute("href", `photographer.html?id=${id}`)
        linkPhotograph.classList.add("linkPhotographs");
        linkPhotograph.setAttribute("aria-label", data.name);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const ville = document.createElement( 'p' );
        ville.textContent = city + ", " + country;

        const tag = document.createElement ('p');
        tag.textContent = tagline;

        const priceContent = document.createElement ('p');
        priceContent.textContent = price + "€/jour";

        article.appendChild(linkPhotograph);
        linkPhotograph.appendChild(img);
        linkPhotograph.appendChild(h2);
        article.appendChild(ville);
        article.appendChild(tag);
        article.appendChild(priceContent);
        return (article);
    }

    function headerFunc() { 
    
        const header = document.getElementById("photograph-header");
        const photoPhotograph = document.createElement('img');
        photoPhotograph.setAttribute("src", picture);
        photoPhotograph.setAttribute("alt", "");

        const divProfil = document.createElement('div');
        divProfil.classList.add('divPhotograph');

        const namePhotograph = document.createElement('p');
        namePhotograph.textContent = name;

        const cityPhotograph = document.createElement('p');
        cityPhotograph.textContent = city + ", " + country;

        const tagLinePhotograph = document.createElement('p');
        tagLinePhotograph.textContent = tagline;

        header.prepend(divProfil);
        header.appendChild(photoPhotograph);
        divProfil.appendChild(namePhotograph);
        divProfil.appendChild(cityPhotograph);
        divProfil.appendChild(tagLinePhotograph);
        
    }


    return { getUserCardDOM, headerFunc}


}


