let datas = []
async function charger_datas(){
    let reponse = await fetch("http://localhost:3000/api/products/")
    datas = await reponse.json()
    chargement_panier()
    delete_item()
    calcul_total()
    changement_input()
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
        // chercher item.data_index dans datas.declinaisons
        let format = product.declinaisons[item.data_index];
        //stocker le prix dans une variable
        let price = format.prix;
        const article = document.querySelector("#test");
        article.insertAdjacentHTML('beforeend', `
            <div class="article">
                <img class="image_article" src="${item.image}" alt="">
                <h2 class="title2">${item.title}</h2>
                <p class="para">Format ${item.format}</p>
                <p class="para test_prix">${price}</p>
                <p class="para">Quantité : <input value="${item.quantity}" type="number"></p>
                <p class="para-supprimer">Supprimer</p>
            </div>`);
    });
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
function calcul_total(){
    const div = document.querySelectorAll(".article");
    const input = document.querySelectorAll("input");
    let total_input = 0
    let total_prix = 0
    for (let i = 0; i < div.length; i++){
        // récupère la quantité de chaque article
        let valeur_input = input[i].value;
        //récupère le prix de chaque article
        let prix = div[i].querySelector(".test_prix").innerText;
        let total = valeur_input * prix;
        total_prix += total
        // récupération de la quantité 
        total_input += parseInt(valeur_input)
    }
    const para_total = document.querySelector(".para_total");
    if (total_input === 0){
        para_total.textContent = `Total : 0.00 € pour 0 article`;
        return
    } else if (total_input === 1){
        para_total.textContent = `Total : ${total_prix.toFixed(2)} € pour ${total_input} article`;
        return
    } else if (total_input > 1){
        para_total.textContent = `Total : ${total_prix.toFixed(2)} € pour ${total_input} articles`;
    }
}

function changement_input(){
    const para_input = document.querySelectorAll(".para input");
    for (let i = 0; i < para_input.length; i++) {
        para_input[i].addEventListener("input", () => { // Remove the 'index' parameter from the arrow function
            let local_storage = localStorage.getItem('panier');
            let data_local = JSON.parse(local_storage);
            data_local[i].quantity = para_input[i].value; // Access 'i' directly instead of using 'index'
            localStorage.setItem('panier', JSON.stringify(data_local));
            if (para_input[i].value < 0){
                para_input[i].value = 1
            } else if (para_input[i].value > 100){
                para_input[i].value = 100
            }
            calcul_total();
            
        });
    }
}