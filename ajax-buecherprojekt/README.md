# 🔎 Hinweise

- Die PHP-Dateien liefern JSON
- Nutze die Browser-Konsole zum Debuggen
- Baue die Anwendung schrittweise:
  1. Übersicht
  2. Tabelle
  3. Details

---

# AJAX Bücher-Suche

Dieses Projekt ist eine AJAX-basierte Webanwendung zur Suche und Anzeige von Büchern aus einer MySQL-Datenbank. Die Anwendung nutzt PHP als Backend und Vanilla JavaScript für die dynamische Anzeige im Frontend.

## Features

- Suchfeld für Buchtitel oder Autor
- **Autocomplete/Suchvorschläge:** Während der Eingabe werden passende Titel/Autoren aus der Datenbank vorgeschlagen
- AJAX-Request zur Buchsuche (ohne Seitenreload)
- Dynamische Anzeige der Treffer als Tabelle
- "Details"-Button je Buch für weitere Informationen
- Zweiter AJAX-Request für Detaildaten
- Detailansicht ohne Seitenreload

## Projektstruktur (Tree)

```text
ajax-buecherprojekt/
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── details.js
│   └── search.js
├── server/
│   ├── autocomplete.php
│   ├── details.php
│   ├── pdo-connect.inc.php
│   └── search.php
├── books.sql
├── index.html
└── README.md
```

## Installation & Nutzung

1. **Datenbank einrichten:**
   - books.sql in MySQL importieren (z.B. mit HeidiSQL oder phpMyAdmin)
2. **Backend konfigurieren:**
   - Zugangsdaten in server/pdo-connect.inc.php prüfen
3. **Projekt im lokalen Webserver (z.B. Laragon) bereitstellen**
4. **index.html im Browser öffnen**

## Technik

- PHP (PDO, MySQL)
- Vanilla JavaScript (Fetch API)
- HTML5 & CSS3

## Hinweise

- Die Anwendung funktioniert komplett ohne Seitenreload
- Die PHP-Skripte liefern JSON-Daten für das Frontend
- Die Browser-Konsole hilft beim Debuggen
- **Autocomplete:** Die Datei server/autocomplete.php liefert Vorschläge für das Suchfeld (Titel/Autor)

---

© 2026 Marcus39-web
