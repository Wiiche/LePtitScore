# 📱 Guide : Publier sur le Google Play Store

## 🎯 Méthode Recommandée : PWABuilder (La plus simple)

PWABuilder est un outil officiel Microsoft qui convertit votre PWA en app Android/iOS.

### Prérequis
- ✅ Votre application doit être en ligne (sur un domaine HTTPS)
- ✅ Avoir un compte Google Play Developer (25$ unique)
- ✅ manifest.json et Service Worker configurés (déjà fait ✓)

---

## 🚀 Étape par Étape

### 1️⃣ Mettre l'application en ligne d'abord

**IMPORTANT** : Votre app DOIT être en ligne avant de générer l'APK.

Utilisez une des méthodes du guide DEPLOIEMENT.md :
- Netlify (recommandé)
- Vercel
- GitHub Pages

➡️ Notez votre URL (ex: `https://le-ptit-score.netlify.app`)

---

### 2️⃣ Générer l'APK avec PWABuilder

#### A. Aller sur PWABuilder
1. Allez sur **https://www.pwabuilder.com**
2. Entrez l'URL de votre app en ligne
3. Cliquez sur **"Start"**

#### B. Vérification automatique
PWABuilder va analyser votre app et vérifier :
- ✅ Manifest.json valide
- ✅ Service Worker actif
- ✅ HTTPS activé
- ✅ Icônes présentes

#### C. Générer le package Android
1. Cliquez sur **"Package for Stores"**
2. Sélectionnez **"Android"**
3. Configurez les options :
   ```
   Package ID: com.leptitscore.app
   App name: Le Ptit Score
   Version: 1.0.0
   Version code: 1
   ```
4. Choisissez le type de signature :
   - **"Google Play Signing"** (recommandé)
   - Ou générez votre propre keystore

5. Cliquez sur **"Generate"**
6. **Téléchargez** le fichier `.aab` (Android App Bundle)

---

### 3️⃣ Créer un compte Google Play Developer

Si vous n'en avez pas déjà un :

1. Allez sur **https://play.google.com/console**
2. Créez un compte développeur
3. **Payez les frais** : 25$ (paiement unique, valable à vie)
4. Remplissez vos informations (nom, adresse, etc.)
5. Acceptez les conditions

⏱️ **Validation** : Peut prendre 24-48h

---

### 4️⃣ Créer l'application dans la console

1. Dans la **Play Console**, cliquez sur **"Créer une application"**
2. Remplissez les informations :
   ```
   Nom de l'app : Le Ptit Score
   Langue par défaut : Français
   Type : Application
   Gratuit/Payant : Gratuit
   ```
3. Acceptez les déclarations

---

### 5️⃣ Préparer la fiche du Play Store

#### A. Fiche du Play Store (Store Listing)

**Titre** : Le Ptit Score - Compteur de Points

**Description courte** (80 caractères max) :
```
Compteur de points pour vos parties de jeux de société 🎲
```

**Description complète** :
```
🎲 Le Ptit Score - L'application essentielle pour vos parties de jeux de société !

✨ FONCTIONNALITÉS

📊 Compteur de points intuitif
Suivez facilement les scores de tous les joueurs pendant vos parties.

🎮 Catalogue de jeux
Découvrez des descriptions détaillées et des images de vos jeux préférés :
• Catan, Carcassonne, Azul
• Dune: Imperium, 7 Wonders
• Et bien d'autres !

📰 Actualités
Restez informé des dernières sorties et événements ludiques.

⭐ Gestion des favoris
Sauvegardez vos jeux préférés pour un accès rapide.

📈 Statistiques
Analysez vos parties : jeux les plus joués, meilleurs joueurs, temps de jeu...

👥 Profil et amis
Créez votre profil de joueur et ajoutez vos amis.

🌙 Mode sombre
Interface moderne avec support du thème sombre.

📱 Fonctionne hors ligne
Utilisez l'application même sans connexion Internet.

💾 Données locales
Toutes vos données restent sur votre appareil, aucun serveur externe.

🎯 PARFAIT POUR
• Les soirées jeux entre amis
• Les clubs de jeux de société
• Les familles de joueurs
• Les joueurs occasionnels ou passionnés

📲 INSTALLATION
Aucune inscription requise, lancez et jouez !

🆓 GRATUIT ET SANS PUB
L'application est entièrement gratuite et ne contient aucune publicité.

🎲 Téléchargez Le Ptit Score et transformez vos soirées jeux !
```

#### B. Assets graphiques requis

**Captures d'écran** (OBLIGATOIRE) :
- Minimum 2, maximum 8 captures
- Format : JPG ou PNG 24-bit
- Dimensions : 
  - Téléphone : 1080x1920 px (portrait)
  - Tablette 7" : 1200x1920 px
  - Tablette 10" : 1920x1200 px

**Icône de l'application** (OBLIGATOIRE) :
- Format : PNG 32-bit
- Dimensions : 512x512 px
- Fond transparent ou de couleur

**Image de présentation** (OBLIGATOIRE) :
- Dimensions : 1024x500 px
- Format : JPG ou PNG 24-bit

**Bannière TV** (Optionnel pour Android TV) :
- Dimensions : 1280x720 px

#### C. Catégories et tags

**Catégorie** : Loisirs ou Jeux
**Tags** : jeux de société, compteur, scores, board games

---

### 6️⃣ Uploader l'APK/AAB

1. Dans la console, allez dans **"Production"** > **"Créer une version"**
2. Uploadez le fichier **.aab** téléchargé depuis PWABuilder
3. Ajoutez des **notes de version** :
   ```
   Version 1.0.0 - Janvier 2026
   
   🎉 Première version publique !
   
   Fonctionnalités :
   • Compteur de points pour jeux de société
   • Catalogue de 12 jeux populaires
   • Actualités ludiques
   • Gestion des favoris
   • Statistiques de parties
   • Mode sombre
   • Fonctionne hors ligne
   ```

---

### 7️⃣ Remplir le questionnaire de contenu

Google demande des informations sur votre app :

**Classification du contenu** :
- Public cible : Tous publics
- Catégorie : Divertissement/Jeux
- Contenu inapproprié : Non

**Confidentialité** :
- Politique de confidentialité : Créez-en une simple (voir ci-dessous)
- Données collectées : Aucune (tout est local)
- Autorisations : Aucune requise

**Distribution** :
- Pays disponibles : Tous (ou sélectionnez)
- Tarification : Gratuit

---

### 8️⃣ Politique de confidentialité

Vous DEVEZ fournir une URL de politique de confidentialité. Voici un template simple :

```markdown
# Politique de confidentialité - Le Ptit Score

Date : Janvier 2026

## Collecte de données
Le Ptit Score ne collecte AUCUNE donnée personnelle.

## Stockage local
Toutes les données (scores, jeux favoris, profil) sont stockées localement 
sur votre appareil via localStorage.

## Partage de données
Aucune donnée n'est partagée avec des tiers ou envoyée à des serveurs externes.

## Modifications
Cette politique peut être mise à jour. Les changements seront publiés 
dans l'application.

## Contact
Pour toute question : [votre-email@exemple.com]
```

➡️ Publiez cette page sur votre site (ex: `https://votre-site.com/privacy`)

---

### 9️⃣ Soumettre pour révision

1. Vérifiez que tout est complété (icône ✅ partout)
2. Cliquez sur **"Envoyer pour examen"**
3. Google va examiner votre app

⏱️ **Délai de révision** : Généralement 2-7 jours

---

## 📊 Suivi et mises à jour

### Après publication

**Statistiques disponibles** :
- Nombre d'installations
- Notes et avis
- Taux de désinstallation
- Pays des utilisateurs

**Pour mettre à jour** :
1. Modifiez votre app en ligne
2. Regénérez l'APK avec PWABuilder
3. Uploadez la nouvelle version (incrémentez version code)
4. Soumettez à nouveau

---

## 💰 Coûts récapitulatifs

| Élément | Prix |
|---------|------|
| Compte Google Play Developer | 25$ (unique, à vie) |
| Hébergement (Netlify/Vercel) | Gratuit |
| Conversion PWA → APK | Gratuit |
| Certificats SSL | Gratuit (auto) |
| **TOTAL** | **25$** |

---

## 🛠️ Alternative : Bubblewrap CLI (Pour développeurs)

Si vous êtes à l'aise avec la ligne de commande :

```bash
# Installation
npm install -g @bubblewrap/cli

# Initialisation
bubblewrap init --manifest https://votre-site.com/manifest.json

# Build
bubblewrap build

# Résultat : fichier .aab généré
```

---

## ⚠️ Checklist avant soumission

- [ ] App en ligne avec HTTPS
- [ ] manifest.json valide
- [ ] Service Worker fonctionnel
- [ ] Icône 512x512 px
- [ ] Au moins 2 captures d'écran
- [ ] Image de présentation 1024x500
- [ ] Description complète rédigée
- [ ] Politique de confidentialité en ligne
- [ ] Compte Developer créé (25$ payé)
- [ ] Fichier .aab généré
- [ ] Classification du contenu remplie

---

## 🎯 Timeline complète

| Étape | Temps estimé |
|-------|-------------|
| Mise en ligne de l'app | 10 minutes |
| Génération APK avec PWABuilder | 5 minutes |
| Création compte Developer | 30 min + 24-48h validation |
| Remplissage fiche Play Store | 1-2 heures |
| Création assets (captures, icônes) | 1-2 heures |
| Soumission | 5 minutes |
| **Révision Google** | **2-7 jours** |
| **TOTAL jusqu'à publication** | **~3-10 jours** |

---

## 🆘 Problèmes courants

### "Le manifest.json n'est pas valide"
- Vérifiez que tous les champs sont présents
- Testez avec https://web.dev/measure/

### "Le Service Worker ne fonctionne pas"
- Assurez-vous que sw.js est accessible
- Vérifiez dans DevTools > Application > Service Workers

### "L'app est rejetée"
- Lisez attentivement le motif du rejet
- Corrigez et resoumettez
- Google peut demander plus de captures d'écran ou une description plus claire

### "Comment créer des captures d'écran ?"
- Utilisez Chrome DevTools (F12) > Mode responsive
- Réglez sur 1080x1920
- Faites des captures de différentes pages de l'app
- Utilisez un outil comme Figma/Canva pour ajouter du texte explicatif

---

## 📱 Bonus : iOS App Store

Pour publier aussi sur l'App Store :

1. Utilisez également PWABuilder (génère un package iOS)
2. Compte Apple Developer requis : **99$/an** (vs 25$ unique Google)
3. Process similaire mais plus strict
4. Révision généralement plus longue (1-2 semaines)

---

## 🎉 Résumé

**Ce qu'il vous faut** :
1. ✅ App en ligne (Netlify/Vercel) - ✅ Déjà fait
2. ✅ Compte Google Play (25$) - À créer
3. ✅ Captures d'écran - À faire
4. ✅ Description - À rédiger
5. ✅ APK généré via PWABuilder - À faire

**Durée totale** : ~1 semaine (incluant validation Google)

**Investissement** : 25$ + 3-4 heures de travail

---

Bonne chance avec votre publication ! 🚀🎲
