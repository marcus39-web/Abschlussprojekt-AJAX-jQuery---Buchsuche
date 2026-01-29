
function loadDetails(id) {
  if (!id) return;
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = '<p>Lade Details...</p>';
  fetch('server/details.php?q=' + encodeURIComponent(id))
    .then(response => response.json())
    .then(data => {
      if (data.err) {
        detailsDiv.innerHTML = data.err;
        return;
      }
      // Einzelnes Buch-Objekt
      let html = `<h3>${data.title}</h3>`;
      if (data.image) {
        html += `<img src="${data.image}" alt="${data.title}" style="max-width:120px;float:right;margin-left:10px;">`;
      }
      html += `<p><strong>Autor:</strong> ${data.author}</p>`;
      html += `<p><strong>Verlag:</strong> ${data.publisher}</p>`;
      html += `<p>${data.description}</p>`;
      detailsDiv.innerHTML = html;
    })
    .catch(err => {
      detailsDiv.innerHTML = '<p>Fehler beim Laden der Details.</p>';
    });
}
