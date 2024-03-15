let datas = []
async function charger_data(){
    let reponse = await fetch("http://localhost:3000/api/products/")
    datas = await reponse.json()
    for (let element of datas){
        console.log(element)
        section.insertAdjacentHTML("beforeend", `
        <article>
            <img src="${element.image}" alt="${element.titre}">
            <a href="product.html?id=${element._id}">Buy ${element.shorttitle}</a>
        </article>`)
    }
}
const section = document.querySelector(".products")
charger_data()

