# 🚀 Guide : Connecter Le Ptit Score à Strapi

Strapi est un CMS headless open-source qui vous permet de gérer vos articles avec une interface d'administration professionnelle et une API REST automatique.

## 🎯 Pourquoi Strapi ?

**Avantages** :
- ✅ Interface d'admin professionnelle (mieux que notre admin.html)
- ✅ API REST générée automatiquement
- ✅ Gestion d'images/médias intégrée
- ✅ Multi-utilisateurs avec rôles
- ✅ Versioning des contenus
- ✅ Gratuit et open-source
- ✅ Hébergement gratuit possible

**vs notre solution actuelle** :
- Admin local → Admin en ligne
- JSON manuel → API REST automatique
- Pas d'images → Upload d'images
- 1 utilisateur → Multi-utilisateurs

---

## 📋 Plan d'action

1. Installer Strapi localement
2. Configurer le modèle "Article"
3. Créer quelques articles de test
4. Modifier l'application pour utiliser l'API Strapi
5. Déployer Strapi en production

**Temps estimé** : 1-2 heures pour la première fois

---

## 🛠️ Partie 1 : Installation de Strapi

### Prérequis

Vous devez avoir installé :
- **Node.js** (version 18 ou 20) : https://nodejs.org
- Un éditeur de code (VS Code recommandé)

Vérifiez votre version :
```bash
node --version
# Devrait afficher v18.x.x ou v20.x.x
```

### Installation

Ouvrez un terminal et exécutez :

```bash
# Créer un nouveau projet Strapi
npx create-strapi-app@latest le-ptit-score-backend

# Choisissez les options suivantes :
# - Type: Quickstart (recommended)
# - TypeScript: Non (sauf si vous préférez)
# - Base de données: SQLite (pour commencer)
```

**Installation en cours...** ⏱️ (5-10 minutes)

Une fois terminé :
```bash
cd le-ptit-score-backend
npm run develop
```

Strapi s'ouvre automatiquement dans votre navigateur à `http://localhost:1337/admin`

### Créer votre compte admin

1. Remplissez le formulaire :
   - Prénom / Nom
   - Email
   - Mot de passe (min 8 caractères)
2. Cliquez sur "Let's start"

**🎉 Strapi est installé !**

---

## 📝 Partie 2 : Créer le modèle "Article"

### Étape 1 : Créer un Collection Type

Dans l'interface Strapi :

1. Cliquez sur **"Content-Type Builder"** (menu gauche)
2. Cliquez sur **"Create new collection type"**
3. Nom : `article` (en minuscules, singulier)
4. Cliquez sur **"Continue"**

### Étape 2 : Ajouter les champs

Ajoutez les champs suivants un par un :

#### 1. title (Titre)
- Type : **Text (short)**
- Name : `title`
- Required : ✅
- Cliquez sur **"Finish"**

#### 2. slug (ID unique)
- Type : **UID**
- Name : `slug`
- Attached field : `title`
- Cliquez sur **"Finish"**

#### 3. excerpt (Résumé)
- Type : **Text (short)**
- Name : `excerpt`
- Max length : 150
- Required : ✅
- Cliquez sur **"Finish"**

#### 4. content (Contenu)
- Type : **Rich text**
- Name : `content`
- Required : ✅
- Cliquez sur **"Finish"**

#### 5. category (Catégorie)
- Type : **Enumeration**
- Name : `category`
- Values : 
  - `Actualités`
  - `Sorties`
  - `Événements`
  - `Critiques`
  - `Tutoriels`
- Default value : `Actualités`
- Cliquez sur **"Finish"**

#### 6. icon (Icône)
- Type : **Text (short)**
- Name : `icon`
- Default value : `🎲`
- Cliquez sur **"Finish"**

#### 7. gradient (Dégradé)
- Type : **Text (long)**
- Name : `gradient`
- Default value : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Cliquez sur **"Finish"**

#### 8. badge (Badge optionnel)
- Type : **Text (short)**
- Name : `badge`
- Cliquez sur **"Finish"**

#### 9. readTime (Temps de lecture)
- Type : **Text (short)**
- Name : `readTime`
- Default value : `3 min de lecture`
- Cliquez sur **"Finish"**

#### 10. featured (En vedette)
- Type : **Boolean**
- Name : `featured`
- Default value : `false`
- Cliquez sur **"Finish"**

#### 11. publishedDate (Date de publication)
- Type : **Date**
- Name : `publishedDate`
- Type : Date only
- Cliquez on **"Finish"**

#### 12. coverImage (Image de couverture - Optionnel)
- Type : **Media (Single)**
- Name : `coverImage`
- Allowed types : Images only
- Cliquez sur **"Finish"**

### Étape 3 : Sauvegarder

Cliquez sur **"Save"** en haut à droite.

Strapi va redémarrer (30 secondes).

---

## 📰 Partie 3 : Créer des articles de test

### Étape 1 : Accéder à Content Manager

1. Cliquez sur **"Content Manager"** (menu gauche)
2. Sélectionnez **"Article"** dans Collection types

### Étape 2 : Créer un article

1. Cliquez sur **"Create new entry"**
2. Remplissez les champs :

**Exemple d'article** :
```
Title: Dune Imperium arrive en français
Excerpt: La version française du hit de deck-building sera disponible en février 2026
Content: (Utilisez l'éditeur riche pour formater)
  - Tapez votre contenu
  - Utilisez les boutons pour mettre en gras, italique, listes, etc.
Category: Sorties
Icon: 🎲
Badge: 🔥 Nouveauté
Featured: ✅ (coché)
Published Date: 2026-01-24
```

3. Cliquez sur **"Save"** en haut à droite
4. Cliquez sur **"Publish"** pour rendre l'article public

### Étape 3 : Créer 2-3 autres articles

Répétez l'opération pour avoir du contenu de test.

---

## 🔐 Partie 4 : Configurer les permissions

Par défaut, l'API est privée. Il faut autoriser l'accès public.

### Étape 1 : Paramètres de rôles

1. Allez dans **"Settings"** (menu gauche)
2. Cliquez sur **"Roles"** (sous Users & Permissions)
3. Cliquez sur **"Public"**

### Étape 2 : Autoriser l'API Article

1. Descendez jusqu'à **"Article"**
2. Cochez les permissions suivantes :
   - ✅ `find` (lister tous les articles)
   - ✅ `findOne` (récupérer un article)
3. Cliquez sur **"Save"** en haut à droite

### Étape 3 : Tester l'API

Ouvrez votre navigateur et allez sur :

```
http://localhost:1337/api/articles?populate=*
```

Vous devriez voir vos articles en JSON ! 🎉

---

## 💻 Partie 5 : Modifier l'application frontend

### Créer un nouveau fichier : strapi-connector.js

Créez ce fichier dans le même dossier que `index.html` :

```javascript
// strapi-connector.js
// Connexion à l'API Strapi pour Le Ptit Score

class StrapiConnector {
    constructor(apiUrl = 'http://localhost:1337/api') {
        this.apiUrl = apiUrl;
    }

    // Récupérer tous les articles
    async getArticles() {
        try {
            const response = await fetch(`${this.apiUrl}/articles?populate=*&sort=publishedDate:desc`);
            const data = await response.json();
            
            // Transformer les données Strapi au format de l'app
            return data.data.map(item => this.transformArticle(item));
        } catch (error) {
            console.error('Erreur lors du chargement des articles:', error);
            return [];
        }
    }

    // Récupérer un article par son slug
    async getArticleBySlug(slug) {
        try {
            const response = await fetch(`${this.apiUrl}/articles?filters[slug][$eq]=${slug}&populate=*`);
            const data = await response.json();
            
            if (data.data.length > 0) {
                return this.transformArticle(data.data[0]);
            }
            return null;
        } catch (error) {
            console.error('Erreur lors du chargement de l\'article:', error);
            return null;
        }
    }

    // Transformer un article Strapi au format de l'app
    transformArticle(strapiArticle) {
        const attrs = strapiArticle.attributes;
        
        return {
            id: attrs.slug,
            title: attrs.title,
            icon: attrs.icon || '🎲',
            badge: attrs.badge || null,
            category: attrs.category || 'Actualités',
            date: attrs.publishedDate,
            readTime: attrs.readTime || '3 min de lecture',
            excerpt: attrs.excerpt,
            gradient: attrs.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            featured: attrs.featured || false,
            author: 'Rédaction Le Ptit Score',
            content: this.parseRichText(attrs.content),
            coverImage: attrs.coverImage?.data ? this.getStrapiUrl(attrs.coverImage.data.attributes.url) : null
        };
    }

    // Convertir le rich text Strapi en blocs de contenu
    parseRichText(richText) {
        if (!richText) return [];
        
        // Parser le markdown/rich text de Strapi
        // Pour simplifier, on crée un seul bloc paragraphe
        // Vous pouvez améliorer ce parsing selon vos besoins
        return [
            {
                type: 'paragraph',
                text: richText
            }
        ];
    }

    // Obtenir l'URL complète d'un média Strapi
    getStrapiUrl(path) {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://localhost:1337${path}`;
    }

    // Formater la date
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return "Hier";
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        if (diffDays < 14) return "Il y a 1 semaine";
        if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
        return `Il y a ${Math.floor(diffDays / 30)} mois`;
    }
}

// Instance globale
window.strapiConnector = new StrapiConnector();
```

### Modifier articles-manager.js

Remplacez la fonction `loadArticles()` :

```javascript
// Dans articles-manager.js
async loadArticles() {
    try {
        // Essayer d'abord de charger depuis Strapi
        if (window.strapiConnector) {
            const strapiArticles = await window.strapiConnector.getArticles();
            if (strapiArticles.length > 0) {
                this.articles = strapiArticles;
                return this.articles;
            }
        }
        
        // Fallback sur le fichier JSON local
        const response = await fetch(this.articlesJsonPath);
        const data = await response.json();
        this.articles = data.articles;
        return this.articles;
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        return this.getFallbackArticles();
    }
}
```

### Modifier index.html

Ajoutez le script Strapi AVANT articles-manager.js :

```html
<!-- Connexion à Strapi -->
<script src="strapi-connector.js"></script>

<!-- Gestionnaire d'articles dynamiques -->
<script src="articles-manager.js"></script>
```

---

## 🧪 Partie 6 : Tester

1. **Strapi en cours d'exécution** : `npm run develop` dans le terminal
2. **Ouvrir l'application** : Ouvrez `index.html` dans votre navigateur
3. **Vérifier** : Les articles de Strapi devraient s'afficher !

**Ouvrez la console (F12)** pour voir les logs.

---

## 🌐 Partie 7 : Déployer en production

### Option 1 : Strapi Cloud (Gratuit pour commencer)

1. Allez sur https://cloud.strapi.io
2. Créez un compte
3. Créez un nouveau projet
4. Connectez votre GitHub
5. Déployez !

**URL de prod** : `https://votre-projet.strapiapp.com`

### Option 2 : Railway (Gratuit avec limites)

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Login
railway login

# Déployer
railway up
```

### Option 3 : Render (Gratuit)

1. Allez sur https://render.com
2. Connectez votre repo GitHub
3. Créez un "Web Service"
4. Sélectionnez votre projet Strapi
5. Déployez !

### Mettre à jour l'URL dans l'app

Dans `strapi-connector.js`, changez l'URL :

```javascript
// Développement
const apiUrl = 'http://localhost:1337/api';

// Production
const apiUrl = 'https://votre-strapi.strapiapp.com/api';

// Ou détection automatique
const apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:1337/api'
    : 'https://votre-strapi.strapiapp.com/api';
```

---

## 🔒 Partie 8 : Sécurité (Production)

### Variables d'environnement

Dans Strapi, créez un fichier `.env` :

```env
# Production
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-secure-key-here
API_TOKEN_SALT=generate-secure-key-here
ADMIN_JWT_SECRET=generate-secure-key-here
JWT_SECRET=generate-secure-key-here

# Base de données PostgreSQL (recommandé pour production)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your-secure-password
```

Générez des clés sécurisées :
```bash
node
> require('crypto').randomBytes(64).toString('base64')
```

### CORS

Dans `config/middlewares.js` de Strapi :

```javascript
module.exports = [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://votre-site.com', 'http://localhost:5500'],
      credentials: true,
    },
  },
  // ...
];
```

---

## 📊 Comparaison : Avant vs Après Strapi

| Fonctionnalité | Avant (JSON local) | Après (Strapi) |
|----------------|-------------------|----------------|
| Interface admin | Basique (admin.html) | Professionnelle |
| Images | Pas possible | Upload + CDN |
| Multi-users | Non | Oui (avec rôles) |
| API | Fichier statique | API REST |
| Recherche | Non | Oui (intégrée) |
| Versioning | Non | Oui |
| Temps création | 5 min | 2 min |
| Coût | Gratuit | Gratuit (débutant) |

---

## 🎯 Workflow avec Strapi

### Créer un article

1. Ouvrir Strapi Admin (`http://localhost:1337/admin`)
2. Content Manager > Article > Create new entry
3. Remplir le formulaire
4. Save > Publish
5. L'article apparaît instantanément sur le site ! ✨

**Plus besoin** de :
- ❌ Télécharger un JSON
- ❌ Upload FTP
- ❌ Recharger le site

**Temps gagné** : 10 minutes → 2 minutes par article

---

## 🚀 Fonctionnalités avancées (bonus)

### Ajouter un éditeur WYSIWYG

Installer CKEditor pour Strapi :

```bash
npm install @ckeditor/strapi-plugin-ckeditor
```

### Ajouter la recherche

```javascript
// Dans strapi-connector.js
async searchArticles(query) {
    const response = await fetch(
        `${this.apiUrl}/articles?filters[title][$contains]=${query}&populate=*`
    );
    const data = await response.json();
    return data.data.map(item => this.transformArticle(item));
}
```

### Webhooks (notifications)

Dans Strapi : Settings > Webhooks

Créez un webhook qui s'exécute quand un article est publié :
- URL : `https://votre-site.com/webhook`
- Events : `entry.publish`

---

## 🐛 Dépannage

### "Cannot connect to Strapi"
- Vérifiez que Strapi tourne : `npm run develop`
- Vérifiez l'URL dans `strapi-connector.js`
- Vérifiez les permissions (Rôle Public)

### "CORS error"
Configurez CORS dans `config/middlewares.js`

### "Articles ne s'affichent pas"
- Ouvrez F12 > Console pour voir les erreurs
- Vérifiez que les articles sont publiés dans Strapi
- Testez l'API directement : `http://localhost:1337/api/articles?populate=*`

---

## ✅ Checklist finale

- [ ] Strapi installé et configuré
- [ ] Modèle Article créé avec tous les champs
- [ ] 3+ articles de test créés et publiés
- [ ] Permissions Public configurées
- [ ] strapi-connector.js ajouté
- [ ] articles-manager.js modifié
- [ ] index.html mis à jour
- [ ] Test local réussi
- [ ] Strapi déployé en production
- [ ] URL de production mise à jour dans le code
- [ ] Site déployé et fonctionnel

---

## 🎉 Félicitations !

Vous avez maintenant :
- ✅ Un CMS professionnel
- ✅ Une API REST automatique
- ✅ Une interface d'admin moderne
- ✅ Upload d'images
- ✅ Multi-utilisateurs
- ✅ Workflow optimisé

**Prochaine étape** : Explorez la documentation Strapi pour aller plus loin !
- https://docs.strapi.io
- https://strapi.io/blog

Bon développement ! 🚀
