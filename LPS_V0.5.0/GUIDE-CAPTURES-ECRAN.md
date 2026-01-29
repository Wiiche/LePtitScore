# 📸 Guide des Captures d'Écran pour le Play Store

## 🎯 Exigences Google Play

### Spécifications techniques
- **Format** : PNG ou JPG (24-bit)
- **Dimensions téléphone** : 1080 x 1920 pixels (portrait)
- **Dimensions tablette 7"** : 1200 x 1920 pixels
- **Dimensions tablette 10"** : 1920 x 1200 pixels (paysage)
- **Nombre** : Minimum 2, maximum 8
- **Taille fichier** : Maximum 8 MB par image

---

## 📱 Captures d'écran recommandées (8 suggestions)

### 1. Écran d'accueil principal
**Ce qui doit apparaître** :
- Logo et titre "Le Ptit Score"
- Section "Actualités Jeux de Société"
- Section "Mes Statistiques"
- Navigation en bas

**Texte overlay suggéré** :
```
🎲 Bienvenue !
Tout pour vos soirées jeux de société
```

### 2. Catalogue de jeux
**Ce qui doit apparaître** :
- Grille de jeux avec icônes
- Cartes colorées (Uno, Catan, Azul, etc.)
- Titre "Bibliothèque de Jeux"

**Texte overlay suggéré** :
```
🎮 12+ jeux populaires
Découvrez descriptions et images
```

### 3. Détails d'un jeu
**Ce qui doit apparaître** :
- Modale ouverte sur un jeu (ex: Catan)
- Description complète
- Galerie d'images
- Bouton "Ajouter aux favoris"

**Texte overlay suggéré** :
```
📖 Fiches détaillées
Règles, durée, nombre de joueurs
```

### 4. Article d'actualité
**Ce qui doit apparaître** :
- Modale d'article ouverte
- Contenu formaté avec titres
- En-tête coloré
- Boutons de partage

**Texte overlay suggéré** :
```
📰 Restez informé
Nouveautés et événements ludiques
```

### 5. Mes jeux favoris
**Ce qui doit apparaître** :
- Onglet "Mes Jeux"
- Liste de jeux favoris avec badges
- Statistiques de parties jouées

**Texte overlay suggéré** :
```
⭐ Vos favoris
Accès rapide à vos jeux préférés
```

### 6. Statistiques
**Ce qui doit apparaître** :
- Cartes statistiques colorées
- "Parties jouées", "Temps de jeu", "Joueurs uniques"
- Top jeux les plus joués

**Texte overlay suggéré** :
```
📊 Suivez vos performances
Analysez vos habitudes de jeu
```

### 7. Profil utilisateur
**Ce qui doit apparaître** :
- Section profil avec avatar
- ID joueur
- Liste d'amis
- Paramètres

**Texte overlay suggéré** :
```
👥 Jouez entre amis
Créez votre profil de joueur
```

### 8. Mode sombre
**Ce qui doit apparaître** :
- N'importe quel écran en mode sombre
- Contraste avec les captures précédentes
- Interface élégante

**Texte overlay suggéré** :
```
🌙 Mode sombre inclus
Confort visuel optimal
```

---

## 🛠️ Comment créer les captures

### Méthode 1 : Chrome DevTools (Gratuit)

1. **Ouvrir votre app en ligne** dans Chrome
2. Appuyer sur **F12** (DevTools)
3. Cliquer sur l'icône **appareil mobile** (ou Ctrl+Shift+M)
4. Régler la résolution : **360 x 640** (ou custom : 1080 x 1920)
5. Naviguer dans l'app
6. Faire des captures d'écran :
   - Windows : Outil Capture d'écran
   - Mac : Cmd+Shift+4
   - Ou clic droit > "Capturer la capture d'écran"

### Méthode 2 : Appareil réel

1. Utiliser un téléphone Android
2. Activer le mode développeur
3. Utiliser **scrcpy** pour projeter l'écran sur PC
4. Faire des captures en haute résolution

### Méthode 3 : Simulateur (Android Studio)

1. Télécharger Android Studio
2. Lancer un émulateur Pixel
3. Installer l'app
4. Faire des captures natives

---

## 🎨 Ajouter du texte sur les captures

### Option 1 : Canva (Gratuit - Recommandé)

1. Allez sur **canva.com**
2. Créez un design **1080 x 1920 px**
3. Uploadez votre capture d'écran
4. Ajoutez du texte :
   ```
   Police : Outfit Bold ou Montserrat
   Taille : 60-80 px pour le titre
   Couleur : Blanc avec ombre portée
   Position : En haut ou en bas
   ```
5. Ajoutez un rectangle semi-transparent derrière le texte
6. Téléchargez en PNG

### Option 2 : Figma (Gratuit)

Même principe que Canva, plus professionnel.

### Option 3 : Photoshop / GIMP

Pour les plus expérimentés.

### Conseils de design

**Bonnes pratiques** :
- ✅ Fond semi-transparent derrière le texte (opacité 70%)
- ✅ Police lisible et moderne
- ✅ Couleurs contrastées
- ✅ Texte court et impactant (5-7 mots max)
- ✅ Émojis pour attirer l'œil

**À éviter** :
- ❌ Texte trop petit
- ❌ Trop d'informations
- ❌ Polices fantaisistes
- ❌ Images floues ou pixelisées

---

## 🖼️ Image de présentation (Feature Graphic)

**Dimensions** : 1024 x 500 pixels

### Contenu suggéré

```
┌──────────────────────────────────────────────┐
│                                              │
│   🎲                  LE PTIT SCORE          │
│                                              │
│   Compteur de points pour jeux de société   │
│                                              │
│   [Image : cartes de jeu, dés, pions]       │
│                                              │
└──────────────────────────────────────────────┘
```

### Éléments à inclure
- Logo / Icône de l'app (grand)
- Nom de l'app (Outfit Bold, ~60px)
- Tagline (texte descriptif, ~30px)
- Illustrations de jeux de société
- Couleurs : Dégradé bleu (#4a90e2 → #5b9cf5)

### Template Canva
1. Créer un design **1024 x 500 px**
2. Fond : Dégradé bleu
3. Ajouter l'icône 🎲 en grand (gauche)
4. Texte "LE PTIT SCORE" (centre)
5. Sous-titre "Compteur de points pour jeux de société"
6. Quelques icônes de jeux en arrière-plan (semi-transparents)

---

## 📱 Icône de l'application (App Icon)

**Dimensions** : 512 x 512 pixels
**Format** : PNG 32-bit avec transparence

### Design actuel
L'app utilise déjà l'émoji 🎲 sur fond coloré.

### Pour améliorer (optionnel)
Créer un icône vectoriel personnalisé :
- Dé stylisé
- Couleurs : Bleu (#4a90e2) et blanc
- Design minimaliste
- Contraste élevé pour visibilité

### Outils
- **Figma** : Gratuit, professionnel
- **Inkscape** : Gratuit, vectoriel
- **Canva** : Modèles d'icônes disponibles

---

## ✅ Checklist finale

### Captures d'écran téléphone (1080x1920)
- [ ] 1. Écran d'accueil
- [ ] 2. Catalogue de jeux
- [ ] 3. Détails d'un jeu
- [ ] 4. Article d'actualité
- [ ] 5. Mes jeux favoris
- [ ] 6. Statistiques
- [ ] 7. Profil utilisateur
- [ ] 8. Mode sombre

### Assets obligatoires
- [ ] Feature Graphic (1024x500)
- [ ] Icône haute résolution (512x512)
- [ ] Au moins 2 captures d'écran

### Assets optionnels (mais recommandés)
- [ ] Captures tablette 7"
- [ ] Captures tablette 10"
- [ ] Vidéo de démo (30 sec max)

---

## 🎬 Bonus : Vidéo de présentation

**Format** : MP4 ou MOV
**Durée** : Maximum 30 secondes
**Résolution** : Minimum 720p, recommandé 1080p

### Script suggéré (25 secondes)

```
[0-5s] : Écran d'accueil avec logo
Texte : "Le Ptit Score - Votre compagnon de jeux"

[5-10s] : Navigation rapide dans le catalogue
Texte : "12+ jeux populaires"

[10-15s] : Ouverture d'une fiche jeu
Texte : "Descriptions détaillées"

[15-20s] : Affichage des statistiques
Texte : "Suivez vos performances"

[20-25s] : Logo final
Texte : "Téléchargez maintenant - Gratuit"
```

### Outils pour créer la vidéo
- **ScreenToGif** (Windows) - Gratuit
- **QuickTime** (Mac) - Intégré
- **OBS Studio** - Gratuit, cross-platform
- **Kapwing** - En ligne, gratuit

---

## 💡 Conseils d'expert

### Erreurs fréquentes à éviter
1. ❌ Captures trop petites (doivent être exactement 1080x1920)
2. ❌ Texte illisible sur mobile
3. ❌ Trop de texte explicatif
4. ❌ Captures d'écran de mauvaise qualité
5. ❌ Pas assez de variété dans les captures

### Pour se démarquer
1. ✅ Montrer les fonctionnalités clés
2. ✅ Utiliser de vraies données (pas "Lorem ipsum")
3. ✅ Montrer différents états de l'app (vide, rempli, mode sombre)
4. ✅ Ajouter des textes courts et percutants
5. ✅ Maintenir une cohérence visuelle

### Inspiration
Cherchez "board game app" sur le Play Store et regardez comment les tops apps présentent leurs captures.

---

## 📦 Livrable final

Vous devriez avoir un dossier avec :

```
assets-play-store/
├── screenshots/
│   ├── 01-home.png (1080x1920)
│   ├── 02-catalog.png (1080x1920)
│   ├── 03-game-details.png (1080x1920)
│   ├── 04-news.png (1080x1920)
│   ├── 05-favorites.png (1080x1920)
│   ├── 06-stats.png (1080x1920)
│   ├── 07-profile.png (1080x1920)
│   └── 08-dark-mode.png (1080x1920)
├── feature-graphic.png (1024x500)
├── icon-512.png (512x512)
└── promo-video.mp4 (optionnel)
```

---

Bon courage pour la création de vos assets ! 🎨📱
