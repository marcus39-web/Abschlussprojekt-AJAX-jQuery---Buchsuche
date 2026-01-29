// Initialisiert EventListener für Suchfeld und Button, sobald das DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Referenzen auf die wichtigsten Elemente
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');
    const detailsDiv = document.getElementById('details');

    // Führt die Suche aus, wenn Button geklickt oder Enter gedrückt wird
    function handleSearch() {
        const query = searchInput.value.trim();
        if (query.length === 0) {
            resultsDiv.innerHTML = '<p>Bitte einen Suchbegriff eingeben.</p>';
            detailsDiv.innerHTML = '';
            return;
        }
        resultsDiv.innerHTML = '<p>Suche läuft...</p>';
        detailsDiv.innerHTML = '';
        // Ruft die Suchfunktion aus search.js auf
        searchBooks(query);
    }

    // Klick auf den Such-Button
    searchButton.addEventListener('click', handleSearch);
    // Enter-Taste im Suchfeld
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});
