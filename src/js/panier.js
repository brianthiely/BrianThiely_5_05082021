// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
let productCartStorage = JSON.parse(localStorage.getItem('product'));
console.log(productCartStorage);

// Selection de la classe ou le code HTML sera injecter
const containerPanier = document.querySelector('#containerPanier');

// Si le panier est vide
if (productCartStorage === null) {
	console.log('JE SUIS VIDE');
} else {
	console.log('Je ne suis pas vide');
}
