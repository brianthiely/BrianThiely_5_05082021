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

// Tout les prix des produits sont mis dans un tableau pour être calculer avec reducer
let getPrice = [];
for (let p = 0; p < productCartStorage.length; p++) {
	productCartStorage[p].price;
	getPrice.push(productCartStorage[p].price);
}

// additionner tout les prix du tableau
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = getPrice.reduce(reducer, 0);

// Afficher prix total dans le HTML
const displayTotalPrice = `<div class="font-weight-bold"> Le prix total est de : ${totalPrice}€</div>`;
containerPanier.insertAdjacentHTML('beforeend', displayTotalPrice);

// ---------FORMULAIRE

function displayForm() {
	const positionForm = document.querySelector('#containerPanier');

	const hydrateForm = `<div id="formOrder">
	<h2>Remplissez le formulaire pour valider la commande</h2>

	<form>
		<label for="firstName">Prénom :</label>
		<input type="text" name="firstName" id="firstName" placeholder="Jean" required>

		<label for="lastName">Nom :</label>
		<input type="text" name="lastName" id="lastName" placeholder="Dupont" required>

		<label for="address">Adresse :</label>
		<input name="address" id="address" placeholder="66 Avenue des Champs Elysée" required>

		<label for="city">Ville :</label>
		<input type="text" name="city" id="city" placeholder="Paris(8)" required>

		<label for="email">E-mail :</label>
		<input type="email" name="email" id="email" placeholder="jean.dupont@gmail.com" required>

		<button id="formPost" type="submit" name="formPost">Confirmer la commande</button>
	</form>
</div>`;
	positionForm.insertAdjacentHTML('afterend, hydrateForm');
}

// Appelle fonction pour affichage form
displayForm();