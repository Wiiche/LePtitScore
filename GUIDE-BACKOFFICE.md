# 🔐 Guide Backoffice - Le Ptit Score

Guide complet pour utiliser le backoffice d'administration de Le Ptit Score.

## 📋 Table des matières

1. [Accès au backoffice](#accès-au-backoffice)
2. [Authentification](#authentification)
3. [Dashboard](#dashboard)
4. [Gestion des articles](#gestion-des-articles)
5. [Gestion des jeux](#gestion-des-jeux)
6. [Paramètres](#paramètres)
7. [Sécurité](#sécurité)
8. [Synchronisation avec l'app](#synchronisation-avec-lapp)

---

## 🚪 Accès au backoffice

### URL d'accès

```
https://votre-domaine.com/backoffice.html
```

⚠️ **Important** : Cette URL doit rester **privée** et ne jamais être partagée publiquement.

### Identifiants par défaut

```
Utilisateur : admin
Mot de passe : admin123
```

🔒 **ATTENTION** : Changez ces identifiants immédiatement en production !

---

## 🔐 Authentification

### Première connexion

1. Ouvrez `backoffice.html`
2. Entrez vos identifiants
3. Cliquez sur "Se connecter"

### Changement du mot de passe

**Méthode 1 : Via l'interface** (recommandé pour les admins)
1. Allez dans **Paramètres**
2. Cliquez sur "🔐 Changer le mot de passe"
3. Suivez les instructions

**Méthode 2 : Dans le code** (pour les développeurs)

Modifiez le fichier `backoffice.js` :

```javascript
const ADMIN_CREDENTIALS = {
    username: 'votre-username',
    password: 'votre-nouveau-mot-de-passe'
};
```

### Déconnexion

Cliquez sur le bouton **"Déconnexion"** en haut à droite.

---

## 📊 Dashboard

Le dashboard affiche :
- **Nombre total d'articles** publiés
- **Nombre de jeux** disponibles
- **Articles en vedette**
- **Statut du système**

### Actions rapides

- **➕ Nouvel article** : Créer un article rapidement
- **➕ Nouveau jeu** : Ajouter un jeu au catalogue

---

## 📰 Gestion des articles

### Créer un article

1. Allez dans l'onglet **"📰 Articles"**
2. Cliquez sur **"➕ Nouvel article"**
3. Remplissez le formulaire :

#### Champs obligatoires *

| Champ | Description | Exemple |
|-------|-------------|---------|
| **Titre** | Titre de l'article | "Dune: Imperium arrive en français" |
| **Slug** | URL de l'article (auto-généré) | "dune-imperium" |
| **Catégorie** | Type d'article | Sorties, Événements, Critiques |
| **Icône** | Emoji représentant l'article | 🎲 |
| **Extrait** | Résumé (max 150 car.) | "La version française arrive..." |
| **Contenu** | Corps de l'article (Markdown) | Voir ci-dessous |

#### Champs optionnels

| Champ | Description | Exemple |
|-------|-------------|---------|
| **Badge** | Badge affiché sur la carte | 🔥 Nouveauté |
| **Temps de lecture** | Estimation de lecture | "3 min de lecture" |
| **Gradient** | Couleur de fond (CSS) | `linear-gradient(...)` |
| **En vedette** | ⭐ Mettre en avant | ☑️ Coché |

### Écrire le contenu (Markdown)

Le contenu utilise le **Markdown** simplifié :

```markdown
## Grand titre

Votre paragraphe avec du texte normal.

### Sous-titre

Encore du texte. Vous pouvez utiliser **du gras** et *de l'italique*.

- Premier élément de liste
- Deuxième élément
- Troisième élément

## Autre section

Nouveau paragraphe ici.
```

**Rendu dans l'app :**
- `##` → Titre H2
- `###` → Titre H3
- `- Item` → Liste à puces
- Paragraphes séparés par une ligne vide

### Modifier un article

1. Trouvez l'article dans la liste
2. Cliquez sur **"✏️ Modifier"**
3. Modifiez les champs
4. Cliquez sur **"💾 Enregistrer"**

### Supprimer un article

1. Trouvez l'article dans la liste
2. Cliquez sur **"🗑️ Supprimer"**
3. Confirmez la suppression

⚠️ **Attention** : Cette action est **irréversible** !

### Articles en vedette

Pour mettre un article en vedette :
1. Éditez l'article
2. Cochez **"⭐ Article en vedette"**
3. Enregistrez

Les articles en vedette apparaissent en premier dans l'app.

---

## 🎮 Gestion des jeux

### Jeux par défaut

Le catalogue contient 3 jeux par défaut :
- **Uno** 🎯
- **Yahtzee** 🎲
- **Tarot** 🃏

### Créer un jeu

1. Allez dans l'onglet **"🎮 Jeux"**
2. Cliquez sur **"➕ Nouveau jeu"**
3. Remplissez le formulaire :

| Champ | Description | Exemple |
|-------|-------------|---------|
| **Nom du jeu** | Nom complet | "Uno" |
| **Icône** | Emoji du jeu | 🎯 |
| **Joueurs** | Nombre de joueurs | "2-10 joueurs" |
| **Durée** | Temps moyen | "30 min" |
| **Description** | Courte description | "Le but est de..." |
| **Règles** | Règles complètes | Explication détaillée |

### Modifier / Supprimer un jeu

Même principe que pour les articles :
- **✏️ Modifier** : Éditer le jeu
- **🗑️ Supprimer** : Supprimer définitivement

---

## ⚙️ Paramètres

### Sécurité

**🔐 Changer le mot de passe**
- Changez le mot de passe admin
- Minimum 6 caractères

### Données

**📥 Exporter les données (JSON)**
- Télécharge un fichier JSON avec tous les articles et jeux
- Format : `leptitscore-backup-{timestamp}.json`
- **Usage** : Backup, migration

**📤 Importer des données**
- Restaure des articles et jeux depuis un fichier JSON
- **Usage** : Restauration, migration

### Danger Zone

**🗑️ Supprimer toutes les données**
- Supprime TOUS les articles et jeux
- Nécessite confirmation : tapez "SUPPRIMER"
- ⚠️ **IRRÉVERSIBLE** !

---

## 🔒 Sécurité

### Bonnes pratiques

✅ **À FAIRE**
- Changez les identifiants par défaut immédiatement
- Utilisez un mot de passe fort (12+ caractères)
- Ne partagez jamais l'URL du backoffice
- Faites des backups réguliers (export JSON)
- Déconnectez-vous après utilisation

❌ **À ÉVITER**
- Utiliser `admin/admin123` en production
- Partager les identifiants
- Laisser le backoffice ouvert sur un ordinateur public
- Ne jamais faire de backups

### Changer les identifiants (Production)

**Étape 1** : Ouvrez `backoffice.js`

**Étape 2** : Modifiez :

```javascript
const ADMIN_CREDENTIALS = {
    username: 'VotreNouveauUsername',  // Changez ici
    password: 'UnMotDePasseTrèsSecurisé123!'  // Et ici
};
```

**Étape 3** : Sauvegardez le fichier

**Étape 4** : Redéployez sur votre serveur

### Protection supplémentaire (Optionnel)

#### Option 1 : Fichier .htaccess (Apache)

Créez un fichier `.htaccess` :

```apache
AuthType Basic
AuthName "Zone Administrateur"
AuthUserFile /chemin/vers/.htpasswd
Require valid-user
```

#### Option 2 : Nginx

Dans votre config Nginx :

```nginx
location /backoffice.html {
    auth_basic "Zone Administrateur";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

---

## 🔄 Synchronisation avec l'app

### Comment ça marche ?

```
Backoffice (localStorage)
        ↓
    Exporter JSON
        ↓
   articles.json
        ↓
Uploader sur serveur
        ↓
    App lit le JSON
```

### Workflow complet

1. **Créez/Modifiez** des articles dans le backoffice
2. **Exportez** les données (bouton dans Paramètres)
3. **Téléchargez** le fichier `articles.json`
4. **Uploadez** sur votre serveur (remplacer l'ancien)
5. **Rafraîchissez** l'app → Les articles sont à jour !

### Automatisation avec Vercel/Netlify

Si vous utilisez Git + Vercel/Netlify :

1. Exportez depuis le backoffice
2. Remplacez `articles.json` dans votre repo
3. Commit & Push
4. Déploiement automatique ✅

### Intégration Strapi (Avancé)

Si vous avez configuré Strapi (voir GUIDE-STRAPI.md) :
- Les articles du backoffice peuvent être migrés vers Strapi
- L'app lira d'abord Strapi, puis fallback sur JSON
- Gestion plus professionnelle

---

## 📊 Structure des données

### Articles (JSON)

```json
{
  "id": "dune-imperium",
  "title": "Dune: Imperium arrive en français !",
  "icon": "🎲",
  "badge": "🔥 Nouveauté",
  "category": "Sorties",
  "date": "2026-01-24",
  "readTime": "4 min de lecture",
  "excerpt": "La version française du hit...",
  "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "featured": true,
  "author": "Rédaction Le Ptit Score",
  "content": [
    {
      "type": "paragraph",
      "text": "Votre texte ici..."
    },
    {
      "type": "heading",
      "level": 3,
      "text": "Titre de section"
    },
    {
      "type": "list",
      "items": ["Item 1", "Item 2"]
    }
  ]
}
```

### Jeux (localStorage)

```json
{
  "id": "uno",
  "name": "Uno",
  "icon": "🎯",
  "players": "2-10 joueurs",
  "duration": "30 min",
  "description": "Description courte...",
  "rules": "Règles complètes..."
}
```

---

## 🐛 Dépannage

### Problème : Je ne peux pas me connecter

**Solution** :
1. Vérifiez les identifiants (majuscules/minuscules)
2. Effacez le cache du navigateur
3. Vérifiez `backoffice.js` (ADMIN_CREDENTIALS)

### Problème : Mes articles n'apparaissent pas dans l'app

**Solutions** :
1. Avez-vous exporté le JSON ?
2. Avez-vous uploadé `articles.json` sur le serveur ?
3. Videz le cache de l'app (F5 ou Ctrl+Shift+R)
4. Vérifiez la console JavaScript (F12)

### Problème : J'ai perdu mes données

**Solutions** :
1. Vérifiez si vous avez un backup (fichier JSON exporté)
2. Importez le backup via Paramètres
3. Si pas de backup → Données perdues 😢

**Prévention** : Exportez régulièrement !

### Problème : Le backoffice est lent

**Solutions** :
1. Trop d'articles ? (>100) → Optimisation nécessaire
2. Videz le localStorage du navigateur
3. Utilisez un navigateur récent (Chrome, Firefox, Edge)

---

## 📚 Ressources

- **GUIDE-ADMIN.md** : Ancien guide (interface simple)
- **GUIDE-STRAPI.md** : CMS professionnel
- **GUIDE-BACKEND-VERCEL.md** : Backend avec base de données

---

## ✅ Checklist de sécurité

Avant de mettre en production :

- [ ] Identifiants changés (username + password)
- [ ] URL backoffice non indexée (robots.txt)
- [ ] Protection .htaccess ou Nginx (optionnel)
- [ ] Backup JSON créé
- [ ] Déconnexion automatique testée
- [ ] Accès HTTPS uniquement

---

## 📞 Support

En cas de problème :
1. Consultez la section Dépannage
2. Vérifiez la console JavaScript (F12)
3. Créez une issue sur GitHub

---

🎉 **Félicitations !** Vous maîtrisez maintenant le backoffice de Le Ptit Score !

Pour aller plus loin, consultez les autres guides disponibles.
