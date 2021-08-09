
(async function() {
    const teddies = await getAllTeddies()
    
    for (teddie of teddies) {
        console.log('display teddie', teddie);
      displayTeddie(teddie)
    }
  })()

async function getAllTeddies() {
   return await fetch(`${apiUrl}/api/teddies`)
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()
    })
    .then(function(teddies) {
        console.log(teddies);
        return teddies
    })
    .catch(function(error) {
        alert("Oups... Il semblerait que les nounours ce sont fait la malle.")
    })
}

function displayTeddie(teddie) {
  const templateElt = document.getElementById("teddie")
  const cloneElt = document.importNode(templateElt.content, true)

  cloneElt.getElementById('teddieImage').src = teddie.imageUrl
  cloneElt.getElementById('teddieName').textContent = teddie.name
  cloneElt.getElementById('teddiePrice').textContent = teddie.price
  cloneElt.getElementById('teddieDescription').textContent = teddie.description


  document.getElementById("main").appendChild(cloneElt)

}




