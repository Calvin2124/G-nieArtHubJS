const url = window.location.href;
const str = new URL(url)
const id = str.searchParams.get("id")
let datas = []

async function charger_datas(){
    let reponse = await fetch(`http://localhost:3000/api/products/${id}`)
    datas = await reponse.json()
    data_page()
    format()
    setDefaultPrice()
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
    document.querySelector("title").innerHTML = datas.titre + " -GénieArtHub"
    console.log(datas)
}

function format(){
    const select = document.querySelector("#format")
    for (let i = 0; i < datas.declinaisons.length; i++){
        const data = datas.declinaisons[i]; 
        const option = `<option data-index="${i}" value="${data.taille}">${data.taille}</option>`
        select.insertAdjacentHTML("beforeend", option)
        // data-index pour récupérer l'index
        
    }
    // Ajouter un écouteur d'événements "change" à l'élément <select>
    select.addEventListener("change", () => {
        // Obtenez l'index de l'option sélectionnée
        let selectedIndex = select.selectedIndex;
        // Obtenez le prix correspondant dans le tableau "declinaisons"
        const selectedPrice = datas.declinaisons[selectedIndex].prix;
        // Mettez à jour le texte de l'élément <span> avec le prix sélectionné
        price.textContent = selectedPrice + " €";
        // Vérifiez si l'option sélectionnée est la première (index 0)
        input_quantity.value = 1
        if (select.selectedIndex === 0) {
            // Si c'est le cas, définissez le prix par défaut sur celui de la première option
            setDefaultPrice();
        }
    });
    input_quantity.addEventListener("input", () => {
        let value = input_quantity.value.trim(); // Supprime les espaces blancs avant et après la saisie
        value = value.replace(/[^\d]/g, ''); // Supprime tous les caractères qui ne sont pas des chiffres
        value = parseInt(value);
    
        if (isNaN(value) || value < 1) {
            input_quantity.value = 1;
        } else if (value > 100) {
            input_quantity.value = 100;
        } else {
            input_quantity.value = value;
        }
        // sum_tab(value)
    });
}
function setDefaultPrice() {
    const price = document.querySelector(".showprice");
    // Obtenez le prix correspondant dans le tableau "declinaisons" pour la première option
    let defaultPrice = datas.declinaisons[0].prix;
    // Mettez à jour le texte de l'élément <span> avec le prix par défaut
    price.textContent = defaultPrice + " €";
}

function sum_tab(quantity) {
    // Sélectionnez l'élément select
    const select = document.querySelector("#format");
    // Obtenez l'index de l'option sélectionnée
    const selectedIndex = select.selectedIndex;
    // Obtenez la valeur de l'option sélectionnée
    const selectedValue = select.options[selectedIndex].value;
    
    // Calculez le total en multipliant la quantité par la valeur de l'option sélectionnée
    const total = quantity * parseFloat(selectedValue);
    
    // Mettez à jour le texte du prix avec le total
    price.textContent = total.toFixed(2) + " €";
}
const price = document.querySelector(".showprice");
const input_quantity = document.querySelector("#quantity")

charger_datas()

const buy_button = document.querySelector(".button-buy")
/*
Au clique sur le bouton buy_button, on récupère la quantité, l'image et l'id dans l'url pour les envoyer dans le local storage.
pour chaque format mettre une limite de 100, si le produit est deja dans le panier on ajoute la quantité quand l'utilisateur dépasse 100 mettre un message d'erreur
*/
buy_button.addEventListener("click", (e) => {
    e.preventDefault()
    let quantity = input_quantity.value
    let image = datas.image
    let title = datas.titre
    let id = datas._id
    let data_index = document.querySelector("#format").selectedIndex
    let format = document.querySelector("#format").value
    let product = {
        id,
        data_index,
        title,
        image,
        quantity,
        format
    }
    let panier = JSON.parse(localStorage.getItem("panier"))
    if (panier === null){
        panier = []
    }
    let index = panier.findIndex((element) => element.id === id && element.format === format)
    if (index === -1){
        panier.push(product)
    } else {
        let new_quantity = parseInt(panier[index].quantity) + parseInt(quantity)
        if (new_quantity > 100){
            alert("Vous ne pouvez pas acheter plus de 100 exemplaires d'une même oeuvre")
            return
        }
        panier[index].quantity = new_quantity
    }
    localStorage.setItem("panier", JSON.stringify(panier))
    let price = document.querySelector(".price")
    // Créer un paragraphe pour afficher "Produit ajouté au panier" qui reste 5 secondes
    const paragraph = document.createElement("p");
    paragraph.textContent = "Produit ajouté au panier";
    paragraph.style.color = "green";    
    price.insertAdjacentElement("afterend", paragraph);
    setTimeout(() => {
        paragraph.remove();
    }, 3000);
})

