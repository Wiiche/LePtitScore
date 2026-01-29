# 🎨 Guide d'utilisation - Interface Admin

Bienvenue dans l'interface d'administration du Ptit Score ! Cette page vous permet de créer et gérer vos articles sans toucher au code.

## 🚀 Comment ça marche ?

### Architecture
```
admin.html          → Interface visuelle pour créer des articles
admin.js            → Gestion de la logique (sauvegarde, export)
localStorage        → Stockage temporaire des articles
articles.json       → Fichier final à uploader sur votre serveur
```

---

## 📝 Créer votre premier article

### Étape 1 : Ouvrir l'interface admin

Ouvrez le fichier `admin.html` dans votre navigateur (double-clic suffit).

### Étape 2 : Remplir le formulaire

#### Informations générales
- **Titre** : Le titre principal de votre article
- **ID** : Généré automatiquement depuis le titre (pas besoin d'y toucher)
- **Catégorie** : Choisissez parmi Actualités, Sorties, Événements, etc.
- **Résumé** : Un texte court de 150 caractères maximum
- **Date** : Date de publication (aujourd'hui par défaut)
- **Temps de lecture** : Ex: "3 min de lecture"

#### Personnalisation visuelle
- **Icône** : Cliquez sur l'émoji que vous voulez (🎲, 🎮, 🏆, etc.)
- **Dégradé** : Choisissez une couleur d'arrière-plan
- **Badge** : Ajoutez un badge comme "🔥 Nouveauté" (optionnel)
- **Article en vedette** : Cochez pour mettre en avant l'article

#### Contenu de l'article

Construisez votre article en ajoutant des blocs :

**Bloc Paragraphe** 📝
- Cliquez sur "+ Paragraphe"
- Tapez votre texte
- Vous pouvez utiliser `<strong>gras</strong>` et `<em>italique</em>`

**Bloc Titre** 📌
- Cliquez sur "+ Titre"
- Choisissez le niveau (H2, H3, H4)
- Tapez le texte du titre

**Bloc Liste** 📋
- Cliquez sur "+ Liste"
- Remplissez les éléments (3 par défaut)
- Cliquez sur "+ Ajouter un élément" pour en ajouter d'autres

### Étape 3 : Créer l'article

Cliquez sur **"✨ Créer l'article"**

✅ Un message de succès apparaît
✅ L'article apparaît dans la liste à droite
✅ Le formulaire se réinitialise pour créer un nouvel article

---

## 📚 Gérer vos articles

### Voir un article
Cliquez sur le bouton **"👁️ Voir"** pour prévisualiser l'article dans une nouvelle fenêtre.

### Supprimer un article
Cliquez sur le bouton **"🗑️"** puis confirmez la suppression.

### Modifier un article
Pour l'instant, il faut supprimer et recréer l'article. Une fonction d'édition sera ajoutée prochainement.

---

## 💾 Exporter et déployer

### Étape 1 : Télécharger le JSON

Une fois vos articles créés, cliquez sur **"📥 Télécharger articles.json"** en bas du formulaire.

Un fichier `articles.json` sera téléchargé sur votre ordinateur.

### Étape 2 : Uploader sur votre serveur

Remplacez l'ancien fichier `articles.json` par le nouveau sur votre serveur.

**Méthodes pour uploader** :
- **FTP** : FileZilla, Cyberduck
- **Hébergeur web** : Interface de gestion de fichiers
- **Git** : Commit et push le fichier
- **Netlify/Vercel** : Glisser-déposer dans l'interface

### Étape 3 : Vérifier

Rechargez votre site web. Les nouveaux articles devraient apparaître automatiquement !

---

## 🎨 Personnalisation

### Changer les icônes disponibles

Éditez `admin.html` et ajoutez des émojis dans la section `.icon-selector` :

```html
<div class="icon-option" data-icon="🌟">🌟</div>
<div class="icon-option" data-icon="🎉">🎉</div>
```

### Ajouter des dégradés de couleur

Ajoutez des options dans `.gradient-selector` :

```html
<div class="gradient-option" 
     data-gradient="linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)" 
     style="background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);">
</div>
```

### Ajouter des catégories

Éditez le `<select id="articleCategory">` :

```html
<option value="Interviews">Interviews</option>
<option value="Tests">Tests</option>
```

---

## 💡 Astuces et bonnes pratiques

### Structurer un bon article

**Exemple de structure recommandée** :
1. Paragraphe d'introduction
2. Titre H3 pour la première section
3. Paragraphe explicatif
4. Liste des points importants
5. Titre H3 pour la deuxième section
6. Paragraphe de conclusion

### Optimiser le résumé

Le résumé apparaît sur la carte d'actualité. Il doit :
- ✅ Être accrocheur
- ✅ Résumer l'essentiel
- ✅ Donner envie de cliquer
- ✅ Faire moins de 150 caractères

**Bon exemple** :
> "La version française de Wingspan arrive enfin ! Découvrez toutes les nouveautés de cette extension tant attendue."

**Mauvais exemple** :
> "Article sur Wingspan."

### Utiliser les balises HTML

Vous pouvez enrichir vos textes avec :
- `<strong>texte en gras</strong>`
- `<em>texte en italique</em>`
- `<br>` pour un saut de ligne

### Choisir les bonnes couleurs

**Par thème** :
- 🎮 Jeux vidéo → Bleu/Violet
- 🏆 Compétitions → Rose/Rouge
- 🎪 Événements → Bleu clair/Cyan
- 🌟 Sorties → Orange/Rose
- 📰 News générales → Violet/Bleu

---

## 🔧 Dépannage

### "Mes articles disparaissent quand je ferme le navigateur"

Les articles sont stockés dans le **localStorage** de votre navigateur. Ils restent même après fermeture, SAUF si :
- Vous videz le cache du navigateur
- Vous utilisez le mode navigation privée
- Vous changez de navigateur

**Solution** : Téléchargez régulièrement le JSON !

### "Le bouton télécharger ne fonctionne pas"

Vérifiez que :
1. Vous avez créé au moins un article
2. Votre navigateur autorise les téléchargements
3. Vous n'êtes pas en mode navigation privée

### "L'article ne s'affiche pas sur mon site"

1. Vérifiez que vous avez bien uploadé `articles.json` sur le serveur
2. Vérifiez que le fichier est à la racine (même dossier que index.html)
3. Videz le cache de votre navigateur (Ctrl+F5)
4. Vérifiez qu'il n'y a pas d'erreur dans la console (F12)

### "Je veux modifier un article existant"

Pour l'instant, il faut :
1. Noter le contenu de l'article
2. Le supprimer
3. Le recréer avec les modifications

Une fonction d'édition sera ajoutée dans une future version.

---

## 🎯 Workflow recommandé

### Pour publier régulièrement

1. **Lundi matin** : Créer 2-3 articles pour la semaine
2. **Télécharger le JSON** immédiatement
3. **Uploader sur le serveur**
4. **Vérifier** que tout s'affiche bien
5. **Répéter** chaque semaine

### Sauvegardes

🔴 **IMPORTANT** : Téléchargez le JSON après chaque session de création !

Gardez plusieurs versions :
```
articles-2026-01-26.json
articles-2026-02-02.json
articles-2026-02-09.json
```

---

## 🚀 Évolutions futures possibles

### Version 2.0 (À venir)
- ✨ Éditer un article existant
- 📸 Upload d'images directement
- 📅 Planification de publication
- 🔍 Recherche d'articles
- 📊 Statistiques (vues, clics)

### Version 3.0 (Backend complet)
- 🔐 Authentification sécurisée
- 👥 Multi-utilisateurs
- 📤 Publication directe (sans télécharger le JSON)
- 💾 Base de données MySQL/MongoDB
- 🌐 API REST complète

---

## 📞 Support

### Problème technique ?

1. Vérifiez la console du navigateur (F12)
2. Consultez ce guide
3. Vérifiez que les fichiers sont bien uploadés

### Besoin d'aide ?

Consultez les autres guides :
- `GUIDE-ARTICLES.md` - Comprendre la structure JSON
- `DEPLOIEMENT.md` - Mettre en ligne l'application
- `README.md` - Vue d'ensemble du projet

---

## ✅ Checklist avant publication

- [ ] Tous les articles sont créés
- [ ] Les titres sont accrocheurs
- [ ] Les résumés font moins de 150 caractères
- [ ] Les icônes et couleurs sont bien choisies
- [ ] Le contenu est structuré (titres, paragraphes, listes)
- [ ] Pas de fautes d'orthographe
- [ ] JSON téléchargé
- [ ] JSON uploadé sur le serveur
- [ ] Articles vérifiés sur le site en ligne

---

## 🎉 C'est parti !

Vous êtes maintenant prêt à gérer vos articles comme un pro ! 

**Avantages de cette interface** :
- ⚡ Rapide : Créer un article en 5 minutes
- 🎨 Visuel : Aperçu en temps réel
- 💾 Sûr : Stockage local automatique
- 🎯 Simple : Pas besoin de connaître le JSON

Bon blogging ! 📝✨
