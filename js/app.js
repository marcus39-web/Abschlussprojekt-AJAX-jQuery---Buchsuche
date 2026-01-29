
// EventListener für den Such-Button und Enter-Taste
document.addEventListener('DOMContentLoaded', function() {
	const searchInput = document.getElementById('searchInput');
	const searchButton = document.getElementById('searchButton');
	const resultsDiv = document.getElementById('results');
	const detailsDiv = document.getElementById('details');

	function handleSearch() {
		const query = searchInput.value.trim();
		if (query.length === 0) {
			resultsDiv.innerHTML = '<p>Bitte einen Suchbegriff eingeben.</p>';
			detailsDiv.innerHTML = '';
			return;
		}
		resultsDiv.innerHTML = '<p>Suche läuft...</p>';
		detailsDiv.innerHTML = '';
		searchBooks(query);
	}

	searchButton.addEventListener('click', handleSearch);
	searchInput.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') {
			handleSearch();
		}
	});
});
