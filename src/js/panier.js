// Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
let productCartStorage = JSON.parse(localStorage.getItem("product"));
console.log(productCartStorage);