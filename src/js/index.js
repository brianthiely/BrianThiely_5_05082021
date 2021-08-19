// Fonction qui apelle toutes mes fonctions automatiquement
(async () => {
	const products = await getProducts();
	buildPage(products);
})();

// Fonction qui permet de recuperer les produits
function getProducts() {
	return fetch(`${apiUrl}/api/teddies`)
		.then((response) => response.json())
		.then((products) => products)
		.catch((error) => {
			alert('Oups... On dirait que les nounours ce sont fait la malle !');
		});
}

// Boucle pour appliquer le template sur chaque produit
function buildPage(products) {
	products.forEach((product) => {
		displayProduct(product);
	});
}

function displayProduct(product) {
	// Ou afficher le template
	const templateElt = document.getElementById('product');

	// Cloner le template
	const cloneElt = document.importNode(templateElt.content, true);

	// Info template
	cloneElt.getElementById('productImage').src = product.imageUrl;
	cloneElt.getElementById('productName').textContent = product.name;
	cloneElt.getElementById('productPrice').textContent = `${
		product.price / 100
	}.00 €`;
	cloneElt.getElementById('productDescription').textContent =
		product.description;
	cloneElt.getElementById(
		'productLink'
	).href = `pages/produit.html?id=${product._id}`;

	// Afficher template
	document.getElementById('productsList').appendChild(cloneElt);
}
