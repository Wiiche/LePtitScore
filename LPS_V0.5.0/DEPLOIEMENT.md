# 🚀 Guide de Déploiement Rapide

## 📱 Méthode la plus simple : Netlify Drop

### Étape 1 : Préparation (1 minute)
- Téléchargez tous les fichiers de l'application
- Gardez-les dans un dossier

### Étape 2 : Déploiement (2 minutes)
1. Allez sur **https://app.netlify.com/drop**
2. Créez un compte gratuit (avec GitHub, Google ou email)
3. **Glissez-déposez** tout le dossier dans la zone
4. Attendez 30 secondes... ✨

### Étape 3 : C'est en ligne ! 🎉
- Netlify vous donne une URL automatique
- Exemple : `https://le-ptit-score-abc123.netlify.app`
- Vous pouvez personnaliser le nom dans les paramètres

---

## 🎯 Méthode GitHub Pages (Gratuit + Custom Domain)

### Étape 1 : Créer un repository
1. Allez sur **https://github.com/new**
2. Nom du repo : `le-ptit-score`
3. Cochez "Public"
4. Créez le repository

### Étape 2 : Uploader les fichiers
1. Cliquez sur "uploading an existing file"
2. Glissez tous vos fichiers
3. Commit avec le message "Initial commit"

### Étape 3 : Activer GitHub Pages
1. Allez dans **Settings** > **Pages**
2. Source : `main` branch
3. Cliquez sur **Save**
4. Attendez 2-3 minutes

### Étape 4 : Accéder à votre site
Votre site sera accessible à :
```
https://votre-username.github.io/le-ptit-score
```

---

## ⚡ Méthode Vercel (Très rapide)

### Étape 1 : S'inscrire
1. Allez sur **https://vercel.com/signup**
2. Créez un compte (avec GitHub recommandé)

### Étape 2 : Déployer
1. Cliquez sur **"New Project"**
2. Importez depuis GitHub OU uploadez directement
3. Cliquez sur **"Deploy"**
4. Attendez 1 minute ⏱️

### Résultat
URL automatique fournie :
```
https://le-ptit-score.vercel.app
```

---

## 🔧 Personnalisation du nom de domaine

### Sur Netlify (Gratuit)
1. Site settings > Domain management
2. Change site name
3. Utilisez : `votre-nom.netlify.app`

### Avec un domaine personnalisé (Optionnel)
1. Achetez un domaine (ex: OVH, Namecheap, Google Domains)
2. Configurez les DNS selon la plateforme choisie
3. Attendez la propagation DNS (24-48h max)

---

## 📲 Rendre l'application installable

Une fois en ligne, votre application est **automatiquement installable** !

### Test de l'installation
1. Ouvrez votre site en ligne sur mobile
2. Chrome/Safari proposera "Installer l'app"
3. L'icône 🎲 apparaîtra sur l'écran d'accueil

### Sur Desktop
1. Ouvrez votre site sur Chrome/Edge
2. Cherchez l'icône ⊕ dans la barre d'adresse
3. Cliquez sur "Installer"

---

## ✅ Checklist finale

- [ ] Tous les fichiers uploadés (index.html, manifest.json, sw.js)
- [ ] Site accessible en ligne
- [ ] Application installable sur mobile
- [ ] Service Worker activé (fonctionne hors ligne)
- [ ] URL partagée avec vos amis

---

## 🆘 Problèmes courants

### "L'app ne s'installe pas"
- Vérifiez que vous utilisez HTTPS (automatique sur Netlify/Vercel/GitHub)
- Vérifiez que manifest.json est accessible
- Essayez sur Chrome/Edge (meilleur support PWA)

### "Le site ne s'affiche pas"
- Attendez 2-3 minutes (propagation)
- Videz le cache du navigateur (Ctrl+F5)
- Vérifiez que index.html est à la racine

### "Erreur 404"
- Vérifiez l'URL
- Sur GitHub Pages : attendez 5 minutes après activation

---

## 🎉 Félicitations !

Votre application est maintenant en ligne et installable !
Partagez l'URL avec vos amis joueurs ! 🎲

**Besoin d'aide ?** Consultez la documentation de votre plateforme d'hébergement.
