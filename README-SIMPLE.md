# 🎲 Le Ptit Score - Guide Complet

Application PWA de comptage de points pour jeux de société.

## 🚀 Démarrage rapide

### Installation locale
```bash
# Aucune installation requise !
# Ouvrez simplement index.html dans un navigateur
```

### Déploiement sur Netlify
```bash
1. Créez un compte sur netlify.com
2. Glissez-déposez le dossier du projet sur netlify.com/drop
3. Votre app est en ligne ! ✅
```

### Déploiement sur Vercel
```bash
npm install -g vercel
vercel
```

## 📁 Structure du projet

```
le-ptit-score/
├── index.html              # Application principale
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
│
├── games.json              # ⭐ Base de données des jeux
├── games-manager.js        # Logique de gestion des jeux
│
├── articles.json           # ⭐ Base de données des articles
├── articles-manager.js     # Logique de gestion des articles
│
├── players-manager.js      # Gestion des joueurs (localStorage)
│
├── backoffice.html         # Interface admin
├── backoffice.js           # Logique du backoffice
│
└── README.md               # Ce fichier
```

## ✏️ Modifier le contenu

### Ajouter un jeu

**1. Éditez `games.json`**

```json
{
  "games": [
    {
      "id": "mon-jeu",
      "name": "Mon Jeu",
      "icon": "🎮",
      "players": "2-4 joueurs",
      "duration": "30 min",
      "description": "Description courte",
      "rules": "Règles complètes...",
      "scoreSystem": {
        "type": "simple",
        "buttons": [
          { "label": "+10", "value": 10, "color": "#4CAF50" }
        ]
      }
    }
  ]
}
```

**2. Rechargez la page** → Le jeu apparaît automatiquement ✅

### Ajouter un article

**1. Éditez `articles.json`**

```json
{
  "articles": [
    {
      "id": "mon-article",
      "title": "Mon Article",
      "icon": "📰",
      "category": "Actualités",
      "date": "2026-02-06",
      "excerpt": "Résumé...",
      "content": [
        { "type": "paragraph", "text": "Contenu..." }
      ]
    }
  ]
}
```

**2. Rechargez la page** → L'article apparaît ✅

### Gérer les joueurs

Les joueurs sont gérés **automatiquement** via l'interface :
- Créer → Bouton "+ Créer" dans la popup
- Modifier → Icône ✏️ sur la carte joueur
- Supprimer → Icône 🗑️ sur la carte joueur
- **Stockage** → localStorage (persistant)

## 🎨 Personnaliser le design

### Couleurs principales

**Trouvez dans `index.html` (section `<style>`) :**

```css
:root {
    --primary-bg: #0f0f1e;           /* Fond principal */
    --secondary-bg: #1a1a2e;         /* Fond secondaire */
    --accent-purple: #667eea;        /* Violet principal */
    --accent-blue: #764ba2;          /* Bleu-violet */
    --text-primary: #e0e0e0;         /* Texte principal */
    --glass-bg: rgba(255, 255, 255, 0.05);  /* Glassmorphism */
}
```

Modifiez ces valeurs pour changer toute l'app !

### Icônes

Les icônes sont des **emojis** :
- Jeux → `"icon": "🎮"`
- Articles → `"icon": "📰"`
- Changez-les directement dans les fichiers JSON

## 🔐 Backoffice Admin

### Accès

```
URL: votre-site.com/backoffice.html
Username: admin
Password: admin123
```

⚠️ **Changez le mot de passe en production !**

### Fonctionnalités

- ✅ Créer/Modifier/Supprimer des articles
- ✅ Créer/Modifier/Supprimer des jeux
- ✅ Exporter/Importer les données (JSON)
- ✅ Statistiques du dashboard

### Changer le mot de passe

**Éditez `backoffice.js` (ligne 4) :**

```javascript
const ADMIN_CREDENTIALS = {
    username: 'votre-username',
    password: 'votre-mot-de-passe'
};
```

## 📊 Types de systèmes de scoring

### 1. Simple (boutons)
```json
{
  "scoreSystem": {
    "type": "simple",
    "buttons": [
      { "label": "+10", "value": 10, "color": "#4CAF50" }
    ]
  }
}
```
→ Cartes avec boutons colorés

### 2. Categories (grille)
```json
{
  "scoreSystem": {
    "type": "categories",
    "categories": [
      { "id": "ones", "name": "As", "type": "number", "max": 5 }
    ]
  }
}
```
→ Tableau avec colonnes par joueur

### 3. Contract (calcul)
```json
{
  "scoreSystem": {
    "type": "contract",
    "contracts": [
      { "id": "petite", "name": "Petite", "multiplier": 1 }
    ]
  }
}
```
→ Formulaire de calcul guidé

### 4. Symbiose (plateau visuel)
```json
{
  "scoreSystem": {
    "type": "symbiose"
  }
}
```
→ Interface 4×2 avec dropdowns

## 🔄 Mise à jour du contenu

### Workflow simple

```bash
1. Modifiez games.json ou articles.json
2. Rechargez la page
3. Les changements apparaissent ✅
```

### Workflow avec Git

```bash
1. Modifiez les fichiers
2. git add .
3. git commit -m "Ajout nouveau jeu"
4. git push
5. Netlify/Vercel auto-déploie ✅
```

## 📱 PWA (Progressive Web App)

### Installation sur mobile

**Android :**
1. Ouvrez le site dans Chrome
2. Menu → "Ajouter à l'écran d'accueil"
3. L'app s'installe ✅

**iOS :**
1. Ouvrez le site dans Safari
2. Partager → "Sur l'écran d'accueil"
3. L'app s'installe ✅

### Mode hors ligne

Grâce au Service Worker (`sw.js`), l'app fonctionne **sans connexion** après la première visite.

## 🐛 Dépannage

### Les jeux ne s'affichent pas
1. Ouvrez la console (F12)
2. Vérifiez les erreurs
3. Vérifiez que `games.json` est valide (jsonlint.com)
4. Videz le cache (Ctrl+Shift+R)

### Les joueurs ont disparu
- Les joueurs sont dans localStorage
- Si vous effacez les données du navigateur, ils disparaissent
- **Solution** : Créez-les à nouveau ou importez un backup

### Le backoffice ne s'ouvre pas
1. Vérifiez l'URL : `/backoffice.html`
2. Vérifiez que le fichier est bien uploadé
3. Essayez en navigation privée

## 📦 Export/Import des données

### Exporter

**Via le backoffice :**
1. Paramètres → "📥 Exporter les données"
2. Fichier JSON téléchargé
3. Sauvegardez-le en sécurité

### Importer

**Via le backoffice :**
1. Paramètres → "📤 Importer des données"
2. Sélectionnez votre fichier JSON
3. Données restaurées ✅

## 🔒 Sécurité

### Bonnes pratiques

✅ Changez les identifiants admin par défaut
✅ Utilisez HTTPS (automatique sur Netlify/Vercel)
✅ Faites des backups réguliers
✅ Ne partagez jamais l'URL du backoffice publiquement

### Protection supplémentaire (optionnel)

**Ajoutez un `.htaccess` :**

```apache
<Files "backoffice.html">
  AuthType Basic
  AuthName "Admin"
  AuthUserFile /path/.htpasswd
  Require valid-user
</Files>
```

## 📈 Évolutions futures

### Extensions possibles

- **Base de données** → Supabase, Firebase
- **Authentification** → Auth0, Firebase Auth
- **API** → Backend Vercel/Netlify Functions
- **CMS** → Strapi (voir GUIDE-STRAPI.md)
- **Analytics** → Google Analytics, Plausible

### Modules prêts à l'emploi

Le projet inclut déjà :
- `strapi-connector.js` → Connexion Strapi
- Guides détaillés dans `/guides`

## 🆘 Support

### Documentation complète

- `GUIDE-GAMES-SCORING.md` → Systèmes de scoring
- `GUIDE-BACKOFFICE.md` → Interface admin
- `GUIDE-BACKEND-VERCEL.md` → Backend avec BDD
- `SIMPLIFICATION.md` → Architecture simplifiée

### Ressources

- [Documentation Netlify](https://docs.netlify.com)
- [Documentation PWA](https://web.dev/progressive-web-apps/)
- [JSON Lint](https://jsonlint.com) → Valider vos JSON

## ✅ Checklist de déploiement

Avant de mettre en production :

- [ ] Identifiants admin changés
- [ ] `games.json` validé (JSON valide)
- [ ] `articles.json` validé (JSON valide)
- [ ] Icônes et images optimisées
- [ ] Testé sur mobile
- [ ] Testé mode hors ligne
- [ ] Backup des données créé
- [ ] URL personnalisée configurée

## 🎉 C'est tout !

Votre app est **simple**, **rapide** et **facile à maintenir**.

**Temps de modification typique :**
- Ajouter un jeu → 2 minutes
- Ajouter un article → 3 minutes
- Changer les couleurs → 5 minutes
- Déployer une mise à jour → 30 secondes

---

**Version** : 2.0.0  
**Dernière mise à jour** : 06/02/2026  
**Auteur** : Le Ptit Score Team
