# Whattadata — sito web

Sito statico di [whattadata.it](https://whattadata.it), pubblicato tramite
**GitHub Pages** con dominio personalizzato (vedi `CNAME`). Non c'è build server:
i file in root vengono serviti così come sono, quindi `index.html`, `privacy.html`
e i file di configurazione SEO devono restare nella cartella radice.

## Struttura

```
.
├── index.html              # Home page
├── privacy.html            # Informativa privacy
├── css/
│   ├── styles.css          # Stili custom del sito
│   ├── cursor.css          # Cursore personalizzato
│   └── tailwind.css        # Output generato di Tailwind (NON modificare a mano)
├── js/
│   ├── main.js             # Navigazione, menu mobile, animazioni UI, tab progetti
│   └── graph.js            # Animazione del grafo di nodi nella sezione "message"
├── src/
│   └── tailwind.css        # Sorgente Tailwind (input della build)
├── img/                    # Immagini (loghi, team, clienti, screenshot, sfondi)
├── tailwind.config.js      # Configurazione Tailwind
├── package.json            # Script di build
└── *.{txt,xml,webmanifest} # robots, sitemap, manifest, CNAME, verifica Google
```

## Build CSS

`css/tailwind.css` è generato a partire da `src/tailwind.css`. Dopo aver modificato
le classi Tailwind nell'HTML/JS, rigenera l'output:

```bash
npm install      # solo la prima volta
npm run build:css
```

Le classi applicate dinamicamente via JavaScript (es. `panel-enter`, `bg-gray-700`)
sopravvivono al purge perché `tailwind.config.js` include `./js/*.js` tra i
`content` da scansionare.

## Deploy

Il push sul branch `main` aggiorna automaticamente il sito tramite GitHub Pages.
Ricordati di committare anche `css/tailwind.css` rigenerato: in produzione non
esiste uno step di build.
