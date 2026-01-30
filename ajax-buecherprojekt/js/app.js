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

// Autocomplete-Funktion für das Suchfeld
// Diese Funktion zeigt während der Eingabe passende Titel/Autoren aus der Datenbank als Vorschläge an
(function() {
    let acList;
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('searchInput');
        // Vorschlagsliste (ul) erzeugen und an das Suchfeld anhängen
        acList = document.createElement('ul');
        acList.id = 'autocomplete-list';
        // Grundlegendes Styling direkt per JS (kann auch in CSS ausgelagert werden)
        acList.style.position = 'absolute';
        acList.style.zIndex = '1000';
        acList.style.background = '#fff';
        acList.style.border = '1px solid #ccc';
        acList.style.listStyle = 'none';
        acList.style.margin = '0';
        acList.style.padding = '0';
        acList.style.width = searchInput.offsetWidth + 'px';
        acList.style.maxHeight = '180px';
        acList.style.overflowY = 'auto';
        acList.style.display = 'none';
        searchInput.parentNode.appendChild(acList);

        // Bei jeder Eingabe im Suchfeld
        searchInput.addEventListener('input', function() {
            const val = this.value.trim();
            // Nur ab 2 Zeichen Vorschläge anzeigen
            if (val.length < 2) {
                acList.style.display = 'none';
                return;
            }
            // AJAX-Request an autocomplete.php
            fetch('server/autocomplete.php?q=' + encodeURIComponent(val))
                .then(res => res.json())
                .then(data => {
                    acList.innerHTML = '';
                    if (!data.length) {
                        acList.style.display = 'none';
                        return;
                    }
                    // Vorschläge als Listenelemente anzeigen
                    data.forEach(suggestion => {
                        const li = document.createElement('li');
                        li.textContent = suggestion;
                        li.style.padding = '6px 12px';
                        li.style.cursor = 'pointer';
                        // Klick auf Vorschlag übernimmt ihn ins Suchfeld
                        li.addEventListener('mousedown', function(e) {
                            searchInput.value = suggestion;
                            acList.style.display = 'none';
                        });
                        acList.appendChild(li);
                    });
                    // Positioniere die Liste direkt unter dem Input
                    const rect = searchInput.getBoundingClientRect();
                    acList.style.left = searchInput.offsetLeft + 'px';
                    acList.style.top = (searchInput.offsetTop + searchInput.offsetHeight) + 'px';
                    acList.style.width = searchInput.offsetWidth + 'px';
                    acList.style.display = 'block';
                });
        });
        // Schließe die Liste, wenn außerhalb geklickt wird
        document.addEventListener('mousedown', function(e) {
            if (!acList.contains(e.target) && e.target !== searchInput) {
                acList.style.display = 'none';
            }
        });
    });
})();
