// Fonction qui récupere l'orderID dans l'URL pour l'injecter dans le HTML
;(() => {
    const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR'
    document.getElementById('commandId').textContent = orderId
  })()