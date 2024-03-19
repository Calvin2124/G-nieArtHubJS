// Récupérer la valeur associée à la clé spécifique du local storage
let local_storage = localStorage.getItem('panier');

// Convertir la chaîne JSON en un tableau JavaScript
let data = JSON.parse(local_storage);
console.log(data)

// Utilisation des données récupérées
data.forEach(item => {
    const article = document.querySelector("#test")
    article.insertAdjacentHTML('afterbegin', `
    <div class="article">
        <img class="image_article" src="${item.image}" alt="">
        <h2 class="title2">Éclat Éthéré : Bird</h2>
        <p class="para">Format ${item.format}</p>
        <p class="para">35.25€</p>
        <p class="para">Quantité : <input value="${item.quantity}" type="number"></p>
        <p class="para supprimer">Supprimer</p>
    </div>`)
});


