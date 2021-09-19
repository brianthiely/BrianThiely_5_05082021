// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
let productCartStorage = JSON.parse(localStorage.getItem('products'));
console.log('productCartStorage');
console.log(productCartStorage);

// Selection de la classe ou le code HTML sera injecter
const containerPanier = document.querySelector('#containerPanier');

// Création de tableau
let basketProducts = [];
let products = [];

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

		products.push(`${productCartStorage[i].id}`);
		console.log('arrayproducts');
		console.log(products);
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

// Selection bouton envoie formulaire
const submitForm = document.querySelector('#formPost');

// Faire une fonction
function sendOrder() {
	submitForm.addEventListener('submit', (e) => {
		e.preventDefault();
		// Récupération des valeurs du form
		const formValue = {
			firstName: document.querySelector('#firstName').value,
			lastName: document.querySelector('#lastName').value,
			address: document.querySelector('#address').value,
			city: document.querySelector('#city').value,
			email: document.querySelector('#email').value,
		};

		// --------Validation formulaire
		function firstNameControle() {
			const firstName = formValue.firstName;
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
			const lastName = formValue.lastName;
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
			const address = formValue.address;
			if (/^[A-Za-z0-100\s]{5,50}$/.test(address)) {
				return true;
			} else {
				alert('Les symboles ne sont pas autorisé.');
				return false;
			}
		}

		function cityControle() {
			const city = formValue.city;
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
			const email = formValue.email;
			if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
				return true;
			} else {
				alert("L'email n'est pas valide");
				return false;
			}
		}

		// Données à envoyer vers le serveur
		const order = {
			contact: formValue,
			products: products,
		};
		console.log('order');
		console.log(order);

		// controle validité formulaire avant envoie danz le local storage
		if (
			firstNameControle() &&
			lastNameControle() &&
			addressControle() &&
			cityControle() &&
			emailControle()
		) {
			// Envoie de l'objet order au serveur
			const requestServer = fetch(`${apiUrl}/api/teddies/order`, {
				method: 'POST',
				body: JSON.stringify(order),
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			});

			// Voir le resultat serveur dans la console
			requestServer.then(async (response) => {
				try {
					const data = await response.json();
					localStorage.removeItem(basketProducts)
					window.location.href = `./confirmation.html?orderId=${data.orderId}`;
				} catch (e) {
					alert ("Oups un probleme est survenu")
				}
			});
		}
	});
}
sendOrder();
