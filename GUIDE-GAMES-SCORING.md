# 🎮 Guide du Système de Jeux et Scoring

Guide complet pour gérer les jeux et leurs systèmes de comptage de points personnalisés.

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Fichier games.json](#fichier-gamesjson)
3. [Types de systèmes de scoring](#types-de-systèmes-de-scoring)
4. [Ajouter un nouveau jeu](#ajouter-un-nouveau-jeu)
5. [Personnaliser le scoring](#personnaliser-le-scoring)
6. [Interface de jeu](#interface-de-jeu)

---

## 🎯 Vue d'ensemble

Le système de jeux utilise deux composants principaux :

### **1. games.json**
Fichier JSON contenant tous les jeux disponibles avec leurs règles et systèmes de scoring.

### **2. games-manager.js**
Script JavaScript qui charge les jeux et génère les interfaces de comptage de points.

### **Workflow**
```
games.json → games-manager.js → Catalogue → Interface de scoring
```

---

## 📄 Fichier games.json

### Structure de base

```json
{
  "games": [
    {
      "id": "identifiant-unique",
      "name": "Nom du jeu",
      "icon": "🎲",
      "players": "2-6 joueurs",
      "duration": "30 min",
      "description": "Description courte",
      "rules": "Règles complètes du jeu...",
      "scoreSystem": {
        "type": "simple|categories|contract",
        ...
      }
    }
  ]
}
```

### Champs obligatoires

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `id` | string | Identifiant unique | `"uno"` |
| `name` | string | Nom du jeu | `"Uno"` |
| `icon` | string | Emoji du jeu | `"🎯"` |
| `players` | string | Nombre de joueurs | `"2-10 joueurs"` |
| `duration` | string | Durée moyenne | `"30 min"` |
| `description` | string | Description courte | `"Le but est..."` |
| `rules` | string | Règles complètes | Texte long |
| `scoreSystem` | object | Système de scoring | Voir ci-dessous |

---

## 🎲 Types de systèmes de scoring

### **Type 1 : Simple (Boutons de points)**

Pour des jeux où on ajoute simplement des points.

**Exemple : Uno**

```json
"scoreSystem": {
  "type": "simple",
  "buttons": [
    { "label": "+1", "value": 1, "color": "#4CAF50" },
    { "label": "+5", "value": 5, "color": "#2196F3" },
    { "label": "+10", "value": 10, "color": "#FF9800" },
    { "label": "+20", "value": 20, "color": "#F44336" },
    { "label": "+50", "value": 50, "color": "#9C27B0" },
    { "label": "-10", "value": -10, "color": "#607D8B" }
  ]
}
```

**Interface générée :**
- Carte pour chaque joueur
- Boutons colorés pour ajouter/retirer des points
- Score affiché en temps réel
- Bouton de réinitialisation par joueur

### **Type 2 : Categories (Grille de score)**

Pour des jeux avec des catégories de scoring (comme Yahtzee).

**Exemple : Yahtzee**

```json
"scoreSystem": {
  "type": "categories",
  "categories": [
    {
      "id": "ones",
      "name": "As (1)",
      "type": "number",
      "max": 5
    },
    {
      "id": "full",
      "name": "Full",
      "type": "fixed",
      "points": 25
    }
  ],
  "bonus": {
    "condition": "section_sup >= 63",
    "points": 35,
    "label": "Bonus section supérieure"
  }
}
```

**Types de catégories :**

| Type | Description | Exemple |
|------|-------------|---------|
| `number` | Input numérique | As, Deux, Brelan |
| `fixed` | Checkbox avec points fixes | Full (25), Suite (30) |

**Interface générée :**
- Tableau avec catégories en lignes
- Colonne par joueur
- Inputs ou checkboxes selon le type
- Calcul automatique des totaux
- Bonus automatique

### **Type 3 : Contract (Calcul de contrat)**

Pour des jeux avec des contrats (comme le Tarot).

**Exemple : Tarot**

```json
"scoreSystem": {
  "type": "contract",
  "contracts": [
    { "id": "petite", "name": "Petite", "multiplier": 1 },
    { "id": "garde", "name": "Garde", "multiplier": 2 },
    { "id": "garde_sans", "name": "Garde sans", "multiplier": 4 },
    { "id": "garde_contre", "name": "Garde contre", "multiplier": 6 }
  ],
  "bouts": [
    { "count": 0, "threshold": 56 },
    { "count": 1, "threshold": 51 },
    { "count": 2, "threshold": 41 },
    { "count": 3, "threshold": 36 }
  ],
  "bonuses": [
    { "id": "petit_au_bout", "name": "Petit au bout", "points": 10 },
    { "id": "poignee_simple", "name": "Poignée simple", "points": 20 }
  ]
}
```

**Interface générée :**
- Sélection du preneur
- Choix du contrat
- Nombre de bouts
- Points réalisés
- Bonus/malus
- Calcul automatique du score final

---

## ➕ Ajouter un nouveau jeu

### Étape 1 : Modifier games.json

Ajoutez votre jeu dans le tableau `games` :

```json
{
  "games": [
    {
      "id": "7-wonders",
      "name": "7 Wonders",
      "icon": "🏛️",
      "players": "2-7 joueurs",
      "duration": "30 min",
      "description": "Jeu de draft et de développement de civilisation.",
      "rules": "Chaque joueur développe sa civilisation à travers trois âges...",
      "scoreSystem": {
        "type": "categories",
        "categories": [
          { "id": "military", "name": "Militaire", "type": "number", "max": 100 },
          { "id": "treasury", "name": "Trésor", "type": "number", "max": 50 },
          { "id": "wonders", "name": "Merveilles", "type": "number", "max": 100 },
          { "id": "blue", "name": "Cartes bleues", "type": "number", "max": 50 },
          { "id": "yellow", "name": "Cartes jaunes", "type": "number", "max": 50 },
          { "id": "green", "name": "Science", "type": "number", "max": 100 },
          { "id": "purple", "name": "Guildes", "type": "number", "max": 50 }
        ]
      }
    }
  ]
}
```

### Étape 2 : Uploader le fichier

1. Uploadez `games.json` sur votre serveur
2. Remplacez l'ancien fichier
3. Rafraîchissez l'app

### Étape 3 : Tester

1. Allez dans le catalogue
2. Le nouveau jeu apparaît automatiquement
3. Cliquez sur "Jouer"
4. Testez l'interface de scoring

---

## 🎨 Personnaliser le scoring

### Exemple 1 : Jeu de dés simple

```json
{
  "id": "poker-dice",
  "name": "Poker d'As",
  "icon": "🎲",
  "scoreSystem": {
    "type": "simple",
    "buttons": [
      { "label": "Paire", "value": 10, "color": "#4CAF50" },
      { "label": "Double paire", "value": 20, "color": "#2196F3" },
      { "label": "Brelan", "value": 30, "color": "#FF9800" },
      { "label": "Carré", "value": 40, "color": "#F44336" },
      { "label": "Quinte", "value": 50, "color": "#9C27B0" }
    ]
  }
}
```

### Exemple 2 : Jeu de cartes avec catégories

```json
{
  "id": "rummy",
  "name": "Rami",
  "icon": "🃏",
  "scoreSystem": {
    "type": "categories",
    "categories": [
      { "id": "sets", "name": "Brelans", "type": "number", "max": 100 },
      { "id": "runs", "name": "Suites", "type": "number", "max": 100 },
      { "id": "bonus_rummy", "name": "Rami", "type": "fixed", "points": 50 },
      { "id": "penalty", "name": "Cartes restantes", "type": "number", "max": 0 }
    ]
  }
}
```

### Exemple 3 : Jeu avec contrats

```json
{
  "id": "belote",
  "name": "Belote",
  "icon": "🂡",
  "scoreSystem": {
    "type": "contract",
    "contracts": [
      { "id": "normal", "name": "Normal", "multiplier": 1 },
      { "id": "capot", "name": "Capot", "multiplier": 2 }
    ],
    "bonuses": [
      { "id": "belote_rebelote", "name": "Belote-Rebelote", "points": 20 },
      { "id": "tierce", "name": "Tierce", "points": 20 },
      { "id": "cinquante", "name": "Cinquante", "points": 50 },
      { "id": "cent", "name": "Cent", "points": 100 }
    ]
  }
}
```

---

## 🎮 Interface de jeu

### Workflow utilisateur

1. **Catalogue** → Voir tous les jeux
2. **Clic sur "Jouer"** → Demande les noms des joueurs
3. **Saisie des joueurs** → `Joueur 1, Joueur 2, Joueur 3`
4. **Interface générée** → Selon le type de scoreSystem
5. **Comptage des points** → Interface interactive
6. **Fin de partie** → Sauvegarde des scores

### Fonctionnalités de l'interface

#### **Type Simple**
- ✅ Carte par joueur
- ✅ Boutons colorés personnalisés
- ✅ Score en temps réel
- ✅ Animation au clic
- ✅ Réinitialisation par joueur
- ✅ Sauvegarde globale

#### **Type Categories**
- ✅ Tableau avec tous les joueurs
- ✅ Input par catégorie
- ✅ Calcul automatique des totaux
- ✅ Bonus automatiques
- ✅ Validation des valeurs max

#### **Type Contract**
- ✅ Sélection du preneur
- ✅ Choix du contrat
- ✅ Calcul intelligent
- ✅ Affichage du résultat détaillé
- ✅ Bonus/malus

---

## 🔧 Personnalisation avancée

### Couleurs des boutons (Type Simple)

Utilisez des codes couleur hexadécimaux :

```json
"buttons": [
  { "label": "+1", "value": 1, "color": "#4CAF50" },  // Vert
  { "label": "+5", "value": 5, "color": "#2196F3" },  // Bleu
  { "label": "+10", "value": 10, "color": "#FF9800" }, // Orange
  { "label": "+20", "value": 20, "color": "#F44336" }, // Rouge
  { "label": "-10", "value": -10, "color": "#607D8B" } // Gris
]
```

### Validation des inputs (Type Categories)

```json
{
  "id": "ones",
  "name": "As (1)",
  "type": "number",
  "max": 5,        // Valeur maximale
  "min": 0         // Valeur minimale (défaut: 0)
}
```

### Multiplicateurs (Type Contract)

```json
"contracts": [
  { "id": "petite", "name": "Petite", "multiplier": 1 },
  { "id": "garde", "name": "Garde", "multiplier": 2 },
  { "id": "garde_sans", "name": "Garde sans", "multiplier": 4 }
]
```

---

## 📊 Exemples de jeux complets

### Jeu 1 : 6 qui prend !

```json
{
  "id": "6-qui-prend",
  "name": "6 qui prend !",
  "icon": "🐮",
  "players": "2-10 joueurs",
  "duration": "45 min",
  "description": "Ne ramassez pas la 6ème carte !",
  "rules": "Posez vos cartes en ordre croissant. Si vous posez la 6ème carte d'une rangée, vous ramassez toute la rangée et comptez les têtes de bœuf.",
  "scoreSystem": {
    "type": "simple",
    "buttons": [
      { "label": "+1 🐮", "value": 1, "color": "#4CAF50" },
      { "label": "+2 🐮", "value": 2, "color": "#8BC34A" },
      { "label": "+3 🐮", "value": 3, "color": "#FFC107" },
      { "label": "+5 🐮", "value": 5, "color": "#FF9800" },
      { "label": "+7 🐮", "value": 7, "color": "#F44336" }
    ]
  }
}
```

### Jeu 2 : Ticket to Ride

```json
{
  "id": "ticket-to-ride",
  "name": "Les Aventuriers du Rail",
  "icon": "🚂",
  "players": "2-5 joueurs",
  "duration": "60 min",
  "description": "Construisez des routes de train à travers le pays.",
  "rules": "Collectez des cartes wagon pour réclamer des routes ferroviaires et relier les villes indiquées sur vos cartes destination.",
  "scoreSystem": {
    "type": "categories",
    "categories": [
      { "id": "routes", "name": "Routes", "type": "number", "max": 300 },
      { "id": "destinations", "name": "Destinations réalisées", "type": "number", "max": 200 },
      { "id": "destinations_failed", "name": "Destinations ratées", "type": "number", "max": 0 },
      { "id": "longest_road", "name": "Route la plus longue", "type": "fixed", "points": 10 }
    ]
  }
}
```

### Jeu 3 : Skull King

```json
{
  "id": "skull-king",
  "name": "Skull King",
  "icon": "🏴‍☠️",
  "players": "2-6 joueurs",
  "duration": "30 min",
  "description": "Annoncez vos plis et réalisez-les !",
  "rules": "Chaque manche, annoncez combien de plis vous pensez faire. Gagnez des points si vous réalisez exactement votre annonce.",
  "scoreSystem": {
    "type": "categories",
    "categories": [
      { "id": "round_1", "name": "Manche 1", "type": "number", "max": 100 },
      { "id": "round_2", "name": "Manche 2", "type": "number", "max": 100 },
      { "id": "round_3", "name": "Manche 3", "type": "number", "max": 100 },
      { "id": "round_4", "name": "Manche 4", "type": "number", "max": 100 },
      { "id": "round_5", "name": "Manche 5", "type": "number", "max": 100 },
      { "id": "round_6", "name": "Manche 6", "type": "number", "max": 100 },
      { "id": "round_7", "name": "Manche 7", "type": "number", "max": 100 },
      { "id": "round_8", "name": "Manche 8", "type": "number", "max": 100 },
      { "id": "round_9", "name": "Manche 9", "type": "number", "max": 100 },
      { "id": "round_10", "name": "Manche 10", "type": "number", "max": 100 }
    ]
  }
}
```

---

## 🔄 Synchronisation

### Workflow de mise à jour

1. **Modifiez** `games.json`
2. **Uploadez** sur votre serveur
3. **Rafraîchissez** l'app
4. ✅ **Nouveaux jeux** disponibles automatiquement

### Via le backoffice

Vous pouvez aussi gérer les jeux via le backoffice :
1. Allez dans **"🎮 Jeux"**
2. Créez/modifiez un jeu
3. Exportez les données
4. Le fichier `games.json` est généré

---

## ✅ Checklist

Avant d'ajouter un nouveau jeu :

- [ ] ID unique défini
- [ ] Nom, icône, joueurs, durée renseignés
- [ ] Description claire
- [ ] Règles complètes
- [ ] Type de scoreSystem choisi
- [ ] Catégories/boutons/contrats définis
- [ ] Testé en local
- [ ] Uploadé sur le serveur

---

## 🐛 Dépannage

### Problème : Le jeu n'apparaît pas

**Solutions** :
1. Vérifiez la syntaxe JSON (utilisez jsonlint.com)
2. Vérifiez que `games.json` est bien uploadé
3. Videz le cache (Ctrl+Shift+R)
4. Vérifiez la console JavaScript (F12)

### Problème : L'interface de scoring ne s'affiche pas

**Solutions** :
1. Vérifiez que `scoreSystem.type` est valide
2. Vérifiez la structure des catégories/boutons
3. Consultez la console pour les erreurs

### Problème : Les scores ne se calculent pas

**Solutions** :
1. Pour Yahtzee : Vérifiez les IDs des catégories
2. Pour Tarot : Vérifiez les multiplicateurs et seuils
3. Vérifiez que les inputs ont les bons attributs

---

🎉 **Félicitations !** Vous pouvez maintenant créer des jeux avec des systèmes de scoring personnalisés !

Pour toute question, consultez les fichiers d'exemple dans `games.json`.
