// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
let productCartStorage = JSON.parse(localStorage.getItem('product'));
console.log(productCartStorage);

// Selection de la classe ou le code HTML sera injecter
const containerPanier = document.querySelector('#containerPanier');
let basketProducts = [];

// Si le panier est vide
if (productCartStorage === null) {
	const emptyBasket = `<div class = "container-emptyBasket font-weight-bold">
							<div> Le panier est vide </div>
						</div>`;
	containerPanier.innerHTML = emptyBasket;
}
// Combien d'article dans le local ?
else {
	for (i = 0; i < productCartStorage.length; i++) {
		basketProducts =
			basketProducts +
			`
	<div class="recapPanier d-flex justify-content-around mb-4">
		<div>${productCartStorage[i].name} / ${productCartStorage[i].color}</div>	
		<div>${productCartStorage[i].price}€ - supprimer article</div>
	</div>
	`;
	}
	if (i === productCartStorage.length) {
		// injection HTML
		containerPanier.innerHTML = basketProducts;
	}
}
