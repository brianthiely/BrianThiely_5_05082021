// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
let productCartStorage = JSON.parse(localStorage.getItem('product'));
console.log(productCartStorage);

// Selection de la classe ou le code HTML sera injecter
const containerPanier = document.querySelector('#containerPanier');
let basketProducts = [];

// Si le panier est vide
if (productCartStorage === null || productCartStorage == 0) {
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
		<div class="w-25 text-left">${productCartStorage[i].name} / ${productCartStorage[i].color}</div>	
		<div class="">${productCartStorage[i].price}€ </div>
	</div>
	`;
	}
	if (i === productCartStorage.length) {
		// injection HTML
		containerPanier.innerHTML = basketProducts;
	}
}

// Montant total panier

let getPrice = [];

for (let p = 0; p < productCartStorage.length; p++) {
	productCartStorage[p].price;

	getPrice.push(productCartStorage[p].price);
}

// add

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = getPrice.reduce(reducer, 0);

console.log(totalPrice);

// Afficher prix total dans le HTML

const displayTotalPrice = `<div class="font-weight-bold"> Le prix total est de : ${totalPrice}€</div>`;
containerPanier.insertAdjacentHTML("beforeend", displayTotalPrice);