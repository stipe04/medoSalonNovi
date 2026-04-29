# Salon Medo static site

Ovo je statička verzija stranice napravljena u čistom `HTML`, `CSS` i `JavaScriptu`.

## Struktura

- `index.html` - glavna stranica
- `assets/site.css` - svi stilovi
- `assets/app.js` - mobilni meni, galerija i Google mapa
- `public-images/` - lokalne slike
- `uvjeti-koristenja/index.html` - pravna stranica
- `politika-privatnosti/index.html` - pravna stranica
- `kolacici/index.html` - pravna stranica

## Uredivanje u VS Code

Projekt nema framework ni build korake. Dovoljno je otvoriti cijeli folder u VS Codeu i uređivati datoteke direktno.

Najčešće izmjene:

- tekstovi i sekcije: `index.html`
- boje, spacing, tipografija i responsive pravila: `assets/site.css`
- interakcije: `assets/app.js`

## Responsive ponašanje

Stranica koristi prilagodljive gridove, fleksibilne slike i media query pravila za:

- mobitele
- tablete
- laptop ekrane
- veće desktope

## Napomena

Google mapa se učitava kao embed `iframe`, pa za puni prikaz treba internet. Ostatak stranice radi iz lokalnih datoteka.
