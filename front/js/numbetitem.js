/*
Récupérer le product dans le local storage 
S'il y a des éléments enregistrés dans le panier 
On récupère la quatité et on l'affiche dans un span qu'on devra insérer sur #carticon
*/
const span = "<span>0</span>";
const cart_icon = document.querySelector("#carticon");
cart_icon.insertAdjacentHTML('beforeend', span);

function number_item() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    // Vérifier la quatité de données dans le panier 
    if (panier.length > 0) {
        //Si c'est supérieur à 0, cela signifie qu'on a des éléments dans le panier 
        //                            (accumulateur, valeurActuelle) => accumulateur + valeurActuelle, valeur initiale 
        const quantity = panier.reduce((acc, el) => acc + parseInt(el.quantity), 0)
        document.querySelector("#carticon span").textContent = quantity;
        document.querySelector("#carticon span").style.display = "flex";
        return
    }
    document.querySelector("#carticon span").style.display = "none";
}
number_item();