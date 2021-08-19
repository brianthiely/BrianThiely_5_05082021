// Fonction qui apelle toutes mes fonctions automatiquement
(async function () {
	const productId = getProductId();
	const product = await getProduct(productId);
	colorOptions(product);
	hydrateProduct(product);
})();

// Permet de récuperer l'ID de notre produit dans l'url
function getProductId() {
	return new URL(location.href).searchParams.get('id');
}

// Fonction qui permet de recuperer le produit choisie
function getProduct(productId) {
	return fetch(`${apiUrl}/api/teddies/${productId}`)
		.then((res) => res.json())
		.then((products) => products)
		.catch((error) => {
			alert('SOLD OUT !');
		});
}

// Ajoute le choix du coloris
function colorOptions(product) {
	const productColors = product.colors;
	const productOption = document.getElementById('productOption');
	productColors.forEach((color) => {
		const optionColor = document.createElement('option');
		optionColor.setAttribute('value', color);
		optionColor.innerHTML = color;
		productOption.appendChild(optionColor);
	});
}

// Injecte les infos produits dans le HTML
function hydrateProduct(product) {
	document.getElementById('productImage').src = product.imageUrl;
	document.getElementById('productName').textContent = product.name;
	document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`;
	document.getElementById('productDescription').textContent = product.description;

	//-------------- Récupération données séléctionner pour panier

	// Récupération des données du produit
	const idForm = document.querySelector('#productOption');
	const productName = product.name;
	const productPrice = product.price;

	// Sélection bouton ajout au panier
	const addToCart = document.querySelector('#addToCart');

	// Ecoute bouton addToCart
	addToCart.addEventListener('click', (e) => {
		e.preventDefault();

		// Choix option dans une variable
		const optionChoice = idForm.value;

		// Récuperation valeurs panier
		let productCart = {
			noms: productName,
			couleur: optionChoice,
			prix: productPrice / 100,
		};

		// --------------------localStorage

		// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
		let productCartStorage = JSON.parse(localStorage.getItem('product'));

		// Lorsque un article est ajouter au panier la fenetre popup s'ouvre
		const popupConfirm = () => {
			if (
				window.confirm(`L'ourson ${productName} en ${optionChoice} a bien été ajouté au panier
Consultez le panier OK ou revenir à l'accueil ANNULER`)
			) {
				window.location.href = '/front-end/pages/panier.html';
			} else {
				window.location.href = '/front-end/index.html';
			}
		};

		// Fonction pour ajouter un produit dans le localStorage
		const addProductLocalStorage = () => {
			// ajout dans le tableau de l'objet avec la couleur choisie
			productCartStorage.push(productCart);

			// transforme en json et envoie la key product dans le localstorage
			localStorage.setItem('product', JSON.stringify(productCartStorage));
		};

		//  si produit déja enregistrer dans le local
		if (productCartStorage) {
			addProductLocalStorage();
			popupConfirm();
		} else {
			productCartStorage = [];
			addProductLocalStorage();
			popupConfirm();
		}
	});
}
