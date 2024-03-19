let datas = []
async function charger_datas(){
    let reponse = await fetch("http://localhost:3000/api/products/")
    datas = await reponse.json()
    chargement_panier()
}
charger_datas()

function chargement_panier(){
    // Récupérer la valeur associée à la clé spécifique du local storage
    let local_storage = localStorage.getItem('panier');

    // Convertir la chaîne JSON en un tableau JavaScript
    let data_local = JSON.parse(local_storage);

    // Utilisation des données récupérées
    data_local.forEach(item => {
        // Chercher item.id dans datas
        let product = datas.find(product => product._id === item.id);
        console.log(product);
        // chercher item.data_index dans datas.declinaisons
        let format = product.declinaisons[item.data_index];
        console.log(format);
        //stocker le prix dans une variable
        let price = format.prix;
        console.log(price);
        const article = document.querySelector("#test");
        article.insertAdjacentHTML('beforeend', `
            <div class="article">
                <img class="image_article" src="${item.image}" alt="">
                <h2 class="title2">${item.title}</h2>
                <p class="para">Format ${item.format}</p>
                <p class="para">${price}</p>
                <p class="para">Quantité : <input value="${item.quantity}" type="number"></p>
                <p class="para-supprimer">Supprimer</p>
            </div>`);
    });
    delete_item()
}

function delete_item(){
    const supprimer = document.querySelectorAll(".para-supprimer");
    for (let i = 0; i < supprimer.length; i++){
        supprimer[i].addEventListener("click", () => {
            let local_storage = localStorage.getItem('panier');
            let data_local = JSON.parse(local_storage);
            data_local.splice(i, 1);
            localStorage.setItem('panier', JSON.stringify(data_local));
            window.location.reload();
        });
    }
}




