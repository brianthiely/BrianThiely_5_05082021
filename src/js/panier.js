// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
const productCartStorage = JSON.parse(localStorage.getItem('products'));
// Selection de la classe ou le code HTML sera injecter
let containerPanier = document.querySelector('#containerPanier');
// Selection bouton envoie formulaire
const submitForm = document.querySelector('#formPost');
// Si panier vide
const cartIsEmpty =
	productCartStorage === null || productCartStorage.length === 0;

(async () => {
	hydrateCart();
	totalPrice();
	await onSubmitOrderForm();
})();

// Fonction qui recupere les produits dans le localStorage pour alimenter la page panier
function hydrateCart() {
	let htmlValue = '';

	if (cartIsEmpty) {
		htmlValue = `<div class = "container-emptyBasket font-weight-bold"><div> Le panier est vide </div></div>`;
	}

	if (!cartIsEmpty) {
		for (i = 0; i < productCartStorage.length; i++) {
			htmlValue =
				htmlValue +
				`
        <div class="recapPanier d-flex justify-content-around mb-4">
            <div class="w-25 text-left">${productCartStorage[i].name} / ${productCartStorage[i].color}</div>    
            <div class="">${productCartStorage[i].price}€ </div>
        </div>
        `;
		}
	}
	containerPanier.innerHTML = htmlValue;
}

// Fonction qui ajoute tout les prix des produits sélectionné dans un tableau et calcul le prix total avec reducer
function totalPrice() {
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
}
// Fonction qui vérifie si les données du formulaire sont valide
function formValidationAndSubmitForm(e) {
	const formAttributesWithValidation = [
		{
			label: 'firstName',
			value: e.target.firstName.value,
			error_message: 'Veuillez entrez votre firstname',
			regex: /^[A-Za-z]{3,20}$/,
		},
		{
			label: 'lastName',
			value: e.target.lastName.value,
			error_message: 'Veuillez entrez votre lastName',
			regex: /^[A-Za-z]{3,20}$/,
		},
		{
			label: 'address',
			value: e.target.address.value,
			error_message: 'Veuillez entrez votre lastName',
			regex: /^[A-Za-z0-100\s]{5,50}$/,
		},
		{
			label: 'city',
			value: e.target.city.value,
			error_message: 'Veuillez indiquer votre ville',
			regex: /^[A-Za-z\s]{3,45}$/,
		},
		{
			label: 'email',
			value: e.target.email.value,
			error_message: 'Veuillez indiquer votre adresse mail',
			regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
		},
	];

	const errorsValidations = [];

	// Boucle de verification ....
	formAttributesWithValidation.forEach((rule) => {
		if (rule.regex.test(rule.value) === false) {
			errorsValidations.push({
				label: rule.label,
				message: rule.error_message,
			});
		}
	});

	// controle validité formulaire avant envoie danz le local storage
	if (errorsValidations.length != 0) {
		return alert('Veuillez remplir le formulaire');
	}

	// Creation et envoi de la commande
	const contactArray = formAttributesWithValidation.map((item) => {
		return [item.label, item.value];
	});

	// Transformer contactArray en Objet "contact"
	const contact = Object.fromEntries(contactArray);

	let products = productCartStorage.map((product) => {
		return product.id;
	});

	const order = {
		contact,
		products,
	};
	
	return sendOrder(order);
}
// Fonction qui execute la fonction sendOrder si le formulaire est valide
async function onSubmitOrderForm() {
	submitForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		formValidationAndSubmitForm(e);
	});
}

// Fonction qui envoie l'objet order au serveur pour valider la commande
async function sendOrder(order) {

	// Envoie de l'objet order au serveur
	try {
		const response = await fetch(`${apiUrl}/api/teddies/order`, {
			method: 'POST',
			body: JSON.stringify(order),
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});

		// Recuperation de la reponse du server
		const data = await response.json();

		// Suppresion du panier du localstorage
		localStorage.removeItem('products');

		// Redirection vers la page de confirmation de commande
		return (window.location.href = `./confirmation.html?orderId=${data.orderId}`);
	} catch (error) {
		console.log(error);
	}
}
