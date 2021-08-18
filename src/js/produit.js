// Fonction qui apelle toutes mes fonctions automatiquement
(async function(){
  const productId = getProductId()
  const product = await getProduct(productId)
  colorOptions(product)
  hydrateProduct(product)
})()

// Permet de récuperer l'ID de notre produit dans l'url
function getProductId(){
  return new URL (location.href).searchParams.get("id")
}

// Fonction qui permet de recuperer le produit choisie
function getProduct(productId) {
  return fetch(`${apiUrl}/api/teddies/${productId}`)
  .then((res) => res.json())
  .then((products) => products)
  .catch((error) => {
    alert(
      "SOLD OUT !"
    )
  })
}

// Ajoute le choix du coloris
function colorOptions(product){
  const productColors = product.colors
  const productOption = document.getElementById("productOption")
  productColors.forEach(color => {
      const optionColor = document.createElement("option")
      optionColor.setAttribute("value", color)
      optionColor.innerHTML = color
      productOption.appendChild(optionColor)
  })
}


// Injecte les infos dans le HTML
function hydrateProduct(product) {
  document.getElementById('productImage').src = product.imageUrl
  document.getElementById('productName').textContent = product.name
  document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  document.getElementById('productDescription').textContent = product.description 



        // Récupération données séléctionner pour panier et envoie du panier

// Récupération de l'id du formulaire
const idForm = document.querySelector("#productOption");


// Sélection bouton ajout au panier
const addToCart = document.querySelector("#add-to-cart");

// Ecoute bouton addToCart
addToCart.addEventListener("click", (e) => {
e.preventDefault();

// Choix option dans une variable
const optionChoice = idForm.value;



// Récuperation valeurs panier
let productCart = {
  noms: product.name,
  couleur: optionChoice,
  prix: product.price / 100
}
console.log(productCart);

});   
}





