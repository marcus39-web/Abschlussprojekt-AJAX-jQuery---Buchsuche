// Führt eine AJAX-Suche nach Büchern aus und zeigt die Ergebnisse an
function searchBooks(query) {
    fetch('server/search.php?q=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            // Fehlerbehandlung
            if (data.err) {
                resultsDiv.innerHTML = data.err;
                return;
            }
            // Keine Treffer gefunden
            if (!Array.isArray(data) || data.length === 0) {
                resultsDiv.innerHTML = '<p>Keine Treffer gefunden.</p>';
                return;
            }
            // Tabelle mit Suchergebnissen erzeugen
            let html = '<table class="table"><thead><tr><th>Titel</th><th>Autor</th><th>Verlag</th><th>Details</th></tr></thead><tbody>';
            data.forEach(book => {
                html += `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.publisher}</td>
                    <td><button class="details-btn" data-id="${book.id}">Details</button></td>
                </tr>`;
            });
            html += '</tbody></table>';
            resultsDiv.innerHTML = html;
        })
        .catch(err => {
            document.getElementById('results').innerHTML = '<p>Fehler bei der Suche.</p>';
        });
}

// Event-Delegation: Klick auf einen Details-Button löst das Laden der Buchdetails aus
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('details-btn')) {
        const id = e.target.getAttribute('data-id');
        loadDetails(id);
    }
});
