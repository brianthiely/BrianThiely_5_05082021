// Fonction qui apelle toutes mes fonctions automatiquement
(async function(){
  const productId = getProductId()
  const product = await getProduct(productId)
  colorOptions(product)
  hydrateProduct(product)
})()

// Permet de récuperer l'ID de notre produit
function getProductId(){
  return new URL (location.href).searchParams.get("id")
}

// Fonction qui permet de recuperer un produit
function getProduct(productId) {
  return fetch(`${apiUrl}/api/teddies/${productId}`)
  .then((httpBodyResponse) => httpBodyResponse.json())
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
  const productColor = document.getElementById("productColor")
  productColors.forEach(color => {
      const colorOption = document.createElement("option")
      colorOption.setAttribute("value", color)
      colorOption.innerHTML = color
      productColor.appendChild(colorOption)
  })
}


// Injecte les infos dans le HTML
function hydrateProduct(product) {
  document.getElementById('productImage').src = product.imageUrl
  document.getElementById('productName').textContent = product.name
  document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  document.getElementById('productDescription').textContent = product.description
}