# 📰 Guide du Système d'Articles Dynamiques

Ce système vous permet de gérer les articles d'actualité sans toucher au code HTML !

## 🎯 Comment ça marche ?

### Architecture
```
articles.json          → Stocke tous les articles (données)
articles-manager.js    → Charge et affiche les articles (logique)
index.html            → Affiche les articles (présentation)
```

**Avantages** :
- ✅ Pas besoin de modifier le HTML pour ajouter un article
- ✅ Facile de gérer plusieurs articles
- ✅ Structure uniforme et professionnelle
- ✅ Peut évoluer vers un vrai CMS plus tard

---

## 📝 Ajouter un nouvel article

### Étape 1 : Ouvrir articles.json

Ajoutez votre nouvel article dans le tableau `articles` :

```json
{
  "articles": [
    {
      "id": "mon-nouvel-article",
      "title": "Titre de mon article",
      "icon": "🎮",
      "badge": null,
      "category": "Actualités",
      "date": "2026-01-26",
      "readTime": "3 min de lecture",
      "excerpt": "Résumé court de l'article (max 150 caractères)",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "featured": false,
      "author": "Votre nom",
      "content": [
        {
          "type": "paragraph",
          "text": "Premier paragraphe de l'article..."
        },
        {
          "type": "heading",
          "level": 3,
          "text": "Sous-titre de section"
        },
        {
          "type": "list",
          "items": [
            "Premier élément de la liste",
            "Deuxième élément",
            "Troisième élément"
          ]
        }
      ]
    }
  ]
}
```

### Étape 2 : Recharger la page

C'est tout ! L'article apparaîtra automatiquement sur la page d'accueil.

---

## 🎨 Structure d'un article

### Champs obligatoires

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `id` | string | Identifiant unique (pas d'espaces) | `"nouvel-article"` |
| `title` | string | Titre de l'article | `"Mon super article"` |
| `icon` | string | Émoji représentant l'article | `"🎮"` |
| `category` | string | Catégorie de l'article | `"Sorties"` |
| `date` | string | Date au format YYYY-MM-DD | `"2026-01-26"` |
| `readTime` | string | Temps de lecture estimé | `"3 min de lecture"` |
| `excerpt` | string | Résumé court (150 char max) | `"Description..."` |
| `gradient` | string | CSS gradient pour l'en-tête | `"linear-gradient(...)"` |
| `content` | array | Contenu structuré de l'article | `[{...}]` |

### Champs optionnels

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `badge` | string/null | Badge "Nouveauté" etc. | `"🔥 Nouveauté"` |
| `featured` | boolean | Article en vedette ? | `true` ou `false` |
| `author` | string | Nom de l'auteur | `"Jean Dupont"` |

---

## 📄 Types de blocs de contenu

### 1. Paragraphe
```json
{
  "type": "paragraph",
  "text": "Votre texte ici. Vous pouvez utiliser <strong>du gras</strong> et <em>de l'italique</em>."
}
```

### 2. Titre (heading)
```json
{
  "type": "heading",
  "level": 3,
  "text": "Votre sous-titre"
}
```
**Niveaux** : 2, 3, ou 4

### 3. Liste à puces
```json
{
  "type": "list",
  "items": [
    "Premier point",
    "Deuxième point avec <strong>du gras</strong>",
    "Troisième point"
  ]
}
```

### 4. Image (optionnel)
```json
{
  "type": "image",
  "src": "https://exemple.com/image.jpg",
  "alt": "Description de l'image"
}
```

### 5. Citation (optionnel)
```json
{
  "type": "quote",
  "text": "Une citation inspirante"
}
```

---

## 🎨 Dégradés de couleur disponibles

Copiez-collez ces valeurs pour le champ `gradient` :

```css
/* Bleu → Violet */
"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

/* Rose → Rouge */
"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"

/* Bleu clair → Cyan */
"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"

/* Orange → Rose */
"linear-gradient(135deg, #fa709a 0%, #fee140 100%)"

/* Vert → Cyan */
"linear-gradient(135deg, #30cfd0 0%, #330867 100%)"

/* Violet foncé */
"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
```

---

## 📋 Exemple complet d'article

```json
{
  "id": "wingspan-extension",
  "title": "Wingspan : L'extension Océanie arrive !",
  "icon": "🦜",
  "badge": "🔥 Nouveauté",
  "category": "Sorties",
  "date": "2026-01-26",
  "readTime": "3 min de lecture",
  "excerpt": "Découvrez de nouvelles espèces d'oiseaux avec l'extension Océanie de Wingspan.",
  "gradient": "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "featured": true,
  "author": "Rédaction Le Ptit Score",
  "content": [
    {
      "type": "paragraph",
      "text": "L'extension tant attendue de <strong>Wingspan</strong> arrive enfin ! Océanie ajoute 95 nouvelles cartes d'oiseaux endémiques de cette région du monde."
    },
    {
      "type": "heading",
      "level": 3,
      "text": "Nouveautés de l'extension"
    },
    {
      "type": "paragraph",
      "text": "Cette extension apporte plusieurs nouveautés mécaniques :"
    },
    {
      "type": "list",
      "items": [
        "95 nouvelles cartes d'oiseaux uniques",
        "Un nouveau type d'œuf : les œufs nectar",
        "5 nouvelles cartes bonus",
        "De nouveaux objectifs de fin de manche"
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "text": "Disponibilité et prix"
    },
    {
      "type": "paragraph",
      "text": "L'extension Wingspan Océanie sera disponible début février 2026 au prix conseillé de 29,90€. Compatible avec le jeu de base et les autres extensions."
    }
  ]
}
```

---

## 🚀 Intégration dans index.html

### Option A : Inclure le script (Recommandé)

Ajoutez ces lignes dans votre `index.html` avant la fermeture du `</body>` :

```html
<!-- Chargement des articles dynamiques -->
<script src="articles-manager.js"></script>
```

### Option B : Remplacer le code existant

Dans votre `index.html`, trouvez la section avec les cartes d'actualités et remplacez par :

```html
<!-- Section des actualités -->
<div class="section-header">
    <h2 class="section-title">📰 Actualités Jeux de Société</h2>
</div>

<!-- Les articles seront chargés ici automatiquement -->
<div class="news-grid" id="newsGrid">
    <div class="empty-state-mini">
        <p>Chargement des actualités...</p>
    </div>
</div>
```

---

## 🔧 Fonctions disponibles

### Dans le JavaScript

```javascript
// Charger tous les articles
await articlesManager.loadArticles();

// Obtenir un article spécifique
const article = articlesManager.getArticleById('dune-imperium');

// Obtenir les articles en vedette
const featured = articlesManager.getFeaturedArticles();

// Obtenir les 3 articles les plus récents
const recent = articlesManager.getRecentArticles(3);

// Afficher les articles dans un conteneur
await articlesManager.displayArticles('newsGrid');

// Ouvrir la modale d'un article
showNewsArticle('dune-imperium');
```

---

## 🎯 Évolutions possibles

### Phase 2 : Interface d'administration

Créer une page `admin.html` pour ajouter des articles sans éditer le JSON :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Admin - Articles</title>
</head>
<body>
    <h1>Ajouter un article</h1>
    <form id="articleForm">
        <input type="text" name="title" placeholder="Titre">
        <textarea name="excerpt" placeholder="Résumé"></textarea>
        <!-- etc. -->
        <button type="submit">Publier</button>
    </form>
</body>
</html>
```

### Phase 3 : Backend Node.js

Créer une API REST pour gérer les articles :

```javascript
// server.js
const express = require('express');
const app = express();

app.get('/api/articles', (req, res) => {
    // Retourner les articles depuis une base de données
});

app.post('/api/articles', (req, res) => {
    // Créer un nouvel article
});
```

### Phase 4 : CMS Headless (Strapi, Sanity)

Utiliser un CMS professionnel avec interface d'administration complète.

---

## ❓ FAQ

### Comment ajouter une image dans un article ?
```json
{
  "type": "image",
  "src": "https://exemple.com/image.jpg",
  "alt": "Description"
}
```

### Comment mettre un article en vedette ?
Changez `"featured": false` en `"featured": true`

### Comment supprimer un article ?
Supprimez l'objet JSON correspondant dans `articles.json`

### Les articles s'affichent dans quel ordre ?
Par défaut : du plus récent au plus ancien (basé sur la date)

### Puis-je utiliser du HTML dans le texte ?
Oui ! Vous pouvez utiliser `<strong>`, `<em>`, `<br>`, etc.

### Comment changer l'icône d'un article ?
Utilisez n'importe quel émoji : 🎮 🎲 🏆 🎪 🎯 📰 🔥

---

## 📁 Structure des fichiers

```
votre-projet/
├── index.html              # Page principale
├── articles.json           # Base de données des articles ⭐
├── articles-manager.js     # Gestionnaire d'articles ⭐
├── manifest.json
└── sw.js
```

---

## 🎉 Résumé

**Pour ajouter un article** :
1. Ouvrez `articles.json`
2. Copiez un article existant
3. Modifiez les valeurs (id, titre, contenu, etc.)
4. Sauvegardez
5. Rechargez la page !

**Temps nécessaire** : 5-10 minutes par article

**Aucune connaissance en HTML requise** ✅

---

## 💡 Conseils

### Bonnes pratiques
- ✅ Utilisez des ID uniques (sans espaces ni accents)
- ✅ Mettez des dates au format YYYY-MM-DD
- ✅ Gardez les résumés courts (150 caractères max)
- ✅ Structurez bien le contenu avec des titres

### À éviter
- ❌ Dupliquer des IDs d'articles
- ❌ Oublier des virgules dans le JSON
- ❌ Mettre des dates au mauvais format
- ❌ Des articles trop longs (>1000 mots)

---

Vous êtes maintenant prêt à gérer vos actualités comme un pro ! 🚀📰
