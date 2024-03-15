const url = window.location.href;
const str = new URL(url)
const id = str.searchParams.get("id")
let datas = []

async function charger_datas(){
    let reponse = await fetch(`http://localhost:3000/api/products/${id}`)
    datas = await reponse.json()
    data_page()
}

function data_page(){
    document.querySelector("h1").innerText = datas.titre
    const chemin_img = datas.image
    document.querySelector("figure img").src = chemin_img
    document.querySelector(".button-buy").innerText = `Buy ${datas.shorttitle}`
    const aside = document.querySelector("aside h2")
    aside.innerText = `Description de l'oeuvre : ${datas.titre}`
    const para = document.createElement("p")
    para.innerText = datas.description
    aside.insertAdjacentElement("afterend", para)
    const texteComplet = datas.description;
    const paragraphes = texteComplet.split("\n\n");
    const premierParagraphe = paragraphes[0];
    document.querySelector("#description").innerText = premierParagraphe
    const select = document.querySelector("#format")
}
charger_datas()