# LinkContextOnScreen (API contexte d'un lien)

Petit dépôt d'une API permettant d'obtenir des informations sur les liens présents sur une page.

# Informations
- Savoir si le lien est visible au-dessus du premier écran visualisé
- Si le lien découvert est plus court que l'url de la page.
- Taille de police du texte associé au lien
- Couleur de la police du texte ancré
- Si le texte d'ancrage est en gras
- Si le texte d'ancrage est de la même couleur que le fond.
- Si le texte d'ancrage est en italique.
- La position X et Y du lien.
- Si le lien est dans une liste et à quel position dans la liste.

## Prérequis
- NodeJS (https://nodejs.org/en/)
- ExpressJS (https://expressjs.com/)
- Playwright

## Utilisation

```bash
node crawl.js
```

##Demo
``` http://localhost:3000/url/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FPageRank```

    
