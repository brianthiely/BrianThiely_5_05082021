// Main function, auto called at load time
;(async () => {
  const products = await getProducts()
  hydratePage(products)
})()

async function getProducts() {
  return fetch(`${apiUrl}/api/teddies`)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => products)
    .catch((error) => {
      alert(
        "Oups... On dirait que les nounours ce sont fait la malle !"
      )
    })
}

function hydratePage(products) {
  // Remove loading boxes
  document.getElementById('productsList').innerHTML = ''

  // Loop over all products and displays them
  products.forEach((product) => {
    displayProduct(product)
  })
}

function displayProduct(product) {
  // Get template
  const templateElt = document.getElementById('product')

  // Clone template
  const cloneElt = document.importNode(templateElt.content, true)

  // Info template
  cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  cloneElt.getElementById('productDescription').textContent = product.description
  cloneElt.getElementById('productLink').href = `pages/produit.html?id=${product._id}`

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}