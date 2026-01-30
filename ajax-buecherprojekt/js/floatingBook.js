// Animiert ein schwebendes Buch auf der Startseite, bis die Maus bewegt wird
window.addEventListener('DOMContentLoaded', function() {
    // Erstelle ein neues <div> für das Buch-Emoji (kann durch ein Bild ersetzt werden)
    var book = document.createElement('div');
    book.id = 'floatingBook';
    book.innerText = '📖'; // Buch-Emoji als Symbol
    document.body.appendChild(book);

    // Startposition (x, y) und Bewegungsrichtung (dx, dy)
    var x = 50, y = 100; // Anfangskoordinaten
    var dx = 2, dy = 1.5; // Geschwindigkeit in px pro Frame
    var width = 60, height = 60; // Größe des Buches (für Kollision mit Fenster)
    var running = true; // Steuert, ob Animation läuft

    // Styling für das schwebende Buch
    book.style.position = 'fixed'; // Bleibt immer an der gleichen Stelle im Viewport
    book.style.left = x + 'px';
    book.style.top = y + 'px';
    book.style.fontSize = '60px'; // Größe des Emojis
    book.style.zIndex = 9999; // Immer ganz oben
    book.style.pointerEvents = 'none'; // Klicks gehen "durch" das Buch
    book.style.transition = 'opacity 0.5s'; // Weiches Ausblenden

    // Animationsfunktion: bewegt das Buch und prallt an den Fensterkanten ab
    function animate() {
        if (!running) return; // Stoppt die Animation
        x += dx;
        y += dy;
        // Prallt an den Rändern des Fensters ab
        if (x < 0 || x > window.innerWidth - width) dx *= -1;
        if (y < 0 || y > window.innerHeight - height) dy *= -1;
        book.style.left = x + 'px';
        book.style.top = y + 'px';
        requestAnimationFrame(animate); // Nächster Frame
    }
    animate();

    // Funktion zum Stoppen und Ausblenden des Buches
    function stopBook() {
        running = false; // Animation stoppen
        book.style.opacity = 0; // Ausblenden
        setTimeout(function() {
            if (book.parentNode) book.parentNode.removeChild(book); // Element entfernen
        }, 600);
        // Event-Listener wieder entfernen, damit Funktion nur einmal ausgeführt wird
        window.removeEventListener('mousemove', stopBook);
        window.removeEventListener('mousedown', stopBook);
        window.removeEventListener('keydown', stopBook);
    }
    // Bei Mausbewegung, Mausklick oder Tastendruck das Buch ausblenden
    window.addEventListener('mousemove', stopBook);
    window.addEventListener('mousedown', stopBook);
    window.addEventListener('keydown', stopBook);
});
