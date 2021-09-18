// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
let products = JSON.parse(localStorage.getItem('products'));
console.log(products);

// Selection de la classe ou le code HTML sera injecter
const containerPanier = document.querySelector('#containerPanier');
let basketProducts = [];

// Si le panier est vide
if (products === null || products == 0) {
	const emptyBasket = `<div class = "container-emptyBasket font-weight-bold">
							<div> Le panier est vide </div>
						</div>`;
	containerPanier.innerHTML = emptyBasket;
}
// Combien d'article dans le local ?
else {
	for (i = 0; i < products.length; i++) {
		basketProducts =
			basketProducts +
			`
	<div class="recapPanier d-flex justify-content-around mb-4">
		<div class="w-25 text-left">${products[i].name} / ${products[i].color}</div>	
		<div class="">${products[i].price}€ </div>
	</div>
	`;
	}
	if (i === products.length) {
		// injection HTML
		containerPanier.innerHTML = basketProducts;
	}
}

// Tout les prix des produits sont mis dans un tableau pour être calculer avec reducer
let getPrice = [];
for (let p = 0; p < products.length; p++) {
	products[p].price;
	getPrice.push(products[p].price);
}

// additionner tout les prix du tableau
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = getPrice.reduce(reducer, 0);

// Afficher prix total dans le HTML
const displayTotalPrice = `<div class="font-weight-bold"> Le prix total est de : ${totalPrice}€</div>`;
containerPanier.insertAdjacentHTML('beforeend', displayTotalPrice);

// Selection bouton envoie formulaire
const submitForm = document.querySelector('#formPost');

submitForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// Récupération des valeurs du form
	const contact = {
		firstName: document.querySelector('#firstName').value,
		lastName: document.querySelector('#lastName').value,
		address: document.querySelector('#address').value,
		city: document.querySelector('#city').value,
		email: document.querySelector('#email').value,
	};

	// --------Validation formulaire
	function firstNameControle() {
		const firstName = contact.firstName;
		if (/^[A-Za-z]{3,20}$/.test(firstName)) {
			return true;
		} else {
			alert(
				'Chiffre et symbole ne sont pas autorisé \n Ne pas dépasser 20 caractères, minimum 3 caractères.'
			);
			return false;
		}
	}

	function lastNameControle() {
		const lastName = contact.lastName;
		if (/^[A-Za-z]{3,20}$/.test(lastName)) {
			return true;
		} else {
			alert(
				'Chiffre et symbole ne sont pas autorisé \n Ne pas dépasser 20 caractères, minimum 3 caractères.'
			);
			return false;
		}
	}

	function addressControle() {
		const address = contact.address;
		if (/^[A-Za-z0-100\s]{5,50}$/.test(address)) {
			return true;
		} else {
			alert('Les symboles ne sont pas autorisé.');
			return false;
		}
	}

	function cityControle() {
		const city = contact.city;
		if (/^[A-Za-z\s]{3,45}$/.test(city)) {
			return true;
		} else {
			alert(
				'Chiffre et symbole ne sont pas autorisé \n Ne pas dépasser 45 caractères, minimum 3 caractères.'
			);
			return false;
		}
	}

	function emailControle() {
		const email = contact.email;
		if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			return true;
		} else {
			alert("L'email n'est pas valide");
			return false;
		}
	}

	// controle validité formulaire avant envoie danz le local storage
	if (
		firstNameControle() &&
		lastNameControle() &&
		addressControle() &&
		cityControle() &&
		emailControle()
	) {
		// Mettre l'objet "contact" dans le localStorage
		localStorage.setItem('contact', JSON.stringify(contact));
	} else {
		alert('Veuillez remplir le formulaire');
	}

	// Le tableau des produits et l'objet formulaire sont mis dans un objet à envoyer au serveur
	// const order = {
	// 	products,
	// 	contact,
	// };
	// console.log('order');
	// console.log(order);

	const promise01 = fetch(`${apiUrl}/api/teddies/order`, {
		method: 'POST',
		body: JSON.stringify(products, contact),
		headers: {
			'Content-Type': 'application/json charset; charset=utf-8',
		},
	});

	promise01.then(async (response) => {
		try {
			console.log("response");
			console.log(response);

			const contenu = await response.json();
			console.log("contenu");
			console.log(contenu);
		} catch (e) {
			console.log(e);
		}
	});
});
