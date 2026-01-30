# 🚀 Guide Backend Vercel pour Le Ptit Score

Vous avez une base de données sur Vercel et vous voulez créer un backend pour votre application. Ce guide vous montre comment faire en quelques étapes.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Architecture](#architecture)
3. [Configuration initiale](#configuration-initiale)
4. [Créer les API Routes](#créer-les-api-routes)
5. [Connecter à la base de données](#connecter-à-la-base-de-données)
6. [Déploiement](#déploiement)
7. [Utilisation dans l'app](#utilisation-dans-lapp)

---

## 🎯 Prérequis

**Vous avez déjà** :
- ✅ Un compte Vercel
- ✅ Une base de données créée sur Vercel (Postgres, MySQL, ou autre)

**Vous aurez besoin** :
- Node.js installé (v18+)
- Un éditeur de code (VS Code recommandé)
- Git (optionnel mais recommandé)

---

## 🏗️ Architecture

### Option 1 : API Routes simples (Recommandé pour commencer)

```
votre-projet/
├── public/
│   ├── index.html          (votre app frontend)
│   ├── manifest.json
│   └── sw.js
├── api/                     (vos endpoints backend)
│   ├── games.js
│   ├── scores.js
│   ├── users.js
│   └── parties.js
├── package.json
└── vercel.json
```

### Option 2 : Next.js (Pour une app plus complexe)

```
votre-projet/
├── pages/
│   ├── api/                 (backend)
│   │   ├── games.js
│   │   └── scores.js
│   └── index.js             (frontend)
├── package.json
└── next.config.js
```

**Pour ce guide, nous utiliserons l'Option 1 (API Routes simples).**

---

## 🛠️ Configuration initiale

### Étape 1 : Créer la structure du projet

Dans le dossier de votre projet :

```bash
# Créer le dossier api
mkdir api

# Créer le fichier package.json
npm init -y
```

### Étape 2 : Installer les dépendances

```bash
# Pour Postgres (Vercel Postgres)
npm install @vercel/postgres

# OU pour MySQL
npm install mysql2

# Utilitaires
npm install cors
```

### Étape 3 : Créer vercel.json

Créez un fichier `vercel.json` à la racine :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**",
      "use": "@vercel/static"
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### Étape 4 : Déplacer vos fichiers frontend

```bash
# Créer le dossier public
mkdir public

# Déplacer vos fichiers
mv index.html public/
mv manifest.json public/
mv sw.js public/
mv *.js public/  # Tous vos JS frontend
```

---

## 📡 Créer les API Routes

### Exemple 1 : API pour les jeux

Créez `api/games.js` :

```javascript
// api/games.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Récupérer tous les jeux
      const { rows } = await sql`SELECT * FROM games ORDER BY created_at DESC`;
      return res.status(200).json({ games: rows });
    }

    if (req.method === 'POST') {
      // Créer un nouveau jeu
      const { name, players, duration } = req.body;
      
      const { rows } = await sql`
        INSERT INTO games (name, players, duration, created_at)
        VALUES (${name}, ${players}, ${duration}, NOW())
        RETURNING *
      `;
      
      return res.status(201).json({ game: rows[0] });
    }

    // Méthode non autorisée
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
```

### Exemple 2 : API pour les scores

Créez `api/scores.js` :

```javascript
// api/scores.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Récupérer les scores d'un jeu
      const { gameId } = req.query;
      
      if (gameId) {
        const { rows } = await sql`
          SELECT * FROM scores 
          WHERE game_id = ${gameId} 
          ORDER BY score DESC
        `;
        return res.status(200).json({ scores: rows });
      }
      
      // Récupérer tous les scores
      const { rows } = await sql`
        SELECT s.*, g.name as game_name 
        FROM scores s 
        JOIN games g ON s.game_id = g.id 
        ORDER BY s.created_at DESC 
        LIMIT 100
      `;
      return res.status(200).json({ scores: rows });
    }

    if (req.method === 'POST') {
      // Créer un nouveau score
      const { gameId, playerName, score } = req.body;
      
      const { rows } = await sql`
        INSERT INTO scores (game_id, player_name, score, created_at)
        VALUES (${gameId}, ${playerName}, ${score}, NOW())
        RETURNING *
      `;
      
      return res.status(201).json({ score: rows[0] });
    }

    if (req.method === 'DELETE') {
      // Supprimer un score
      const { id } = req.query;
      
      await sql`DELETE FROM scores WHERE id = ${id}`;
      
      return res.status(200).json({ message: 'Score deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
```

### Exemple 3 : API pour les parties en cours

Créez `api/parties.js` :

```javascript
// api/parties.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Récupérer les parties actives
      const { rows } = await sql`
        SELECT * FROM parties 
        WHERE status = 'active' 
        ORDER BY created_at DESC
      `;
      return res.status(200).json({ parties: rows });
    }

    if (req.method === 'POST') {
      // Créer une nouvelle partie
      const { gameId, players, settings } = req.body;
      
      const { rows } = await sql`
        INSERT INTO parties (game_id, players, settings, status, created_at)
        VALUES (${gameId}, ${JSON.stringify(players)}, ${JSON.stringify(settings)}, 'active', NOW())
        RETURNING *
      `;
      
      return res.status(201).json({ partie: rows[0] });
    }

    if (req.method === 'PUT') {
      // Mettre à jour une partie
      const { id } = req.query;
      const { players, settings, status } = req.body;
      
      const { rows } = await sql`
        UPDATE parties 
        SET 
          players = ${JSON.stringify(players)},
          settings = ${JSON.stringify(settings)},
          status = ${status},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      
      return res.status(200).json({ partie: rows[0] });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
```

---

## 🗄️ Connecter à la base de données

### Étape 1 : Récupérer les variables d'environnement

Sur Vercel :
1. Allez dans votre projet
2. Settings → Environment Variables
3. Notez les variables de votre base de données :
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - etc.

### Étape 2 : Créer .env.local pour le développement

Créez un fichier `.env.local` à la racine :

```env
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

⚠️ **Important** : Ajoutez `.env.local` à votre `.gitignore` !

### Étape 3 : Créer le schéma de la base de données

Créez un fichier `db/schema.sql` :

```sql
-- Créer la table games
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  players VARCHAR(50),
  duration VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table scores
CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  player_name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table parties
CREATE TABLE IF NOT EXISTS parties (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  players JSONB NOT NULL,
  settings JSONB,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer des index pour améliorer les performances
CREATE INDEX idx_scores_game_id ON scores(game_id);
CREATE INDEX idx_parties_status ON parties(status);
CREATE INDEX idx_parties_game_id ON parties(game_id);
```

### Étape 4 : Exécuter le schéma

Vous pouvez exécuter ce SQL via :
- Le dashboard Vercel (Storage → votre DB → Query)
- Un client Postgres (pgAdmin, DBeaver, etc.)
- En ligne de commande avec `psql`

---

## 🚀 Déploiement

### Option A : Via Git (Recommandé)

```bash
# Initialiser git si pas déjà fait
git init

# Créer .gitignore
echo "node_modules/
.env.local
.vercel" > .gitignore

# Commit
git add .
git commit -m "Add backend API routes"

# Pousser vers GitHub
git remote add origin https://github.com/votre-username/votre-repo.git
git push -u origin main
```

Ensuite sur Vercel :
1. Import Project
2. Sélectionnez votre repo GitHub
3. Les variables d'environnement sont déjà configurées ✅
4. Deploy !

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

---

## 💻 Utilisation dans l'app frontend

### Créer un fichier api-client.js

Créez `public/api-client.js` :

```javascript
// api-client.js - Client pour communiquer avec le backend

class ApiClient {
    constructor() {
        // URL de base de l'API
        // En dev: http://localhost:3000
        // En prod: https://votre-app.vercel.app
        this.baseUrl = window.location.origin;
    }

    // Méthode générique pour faire des requêtes
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}/api/${endpoint}`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'API Error');
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }

    // === JEUX ===
    
    async getGames() {
        return this.request('games');
    }

    async createGame(gameData) {
        return this.request('games', {
            method: 'POST',
            body: JSON.stringify(gameData),
        });
    }

    // === SCORES ===
    
    async getScores(gameId = null) {
        const query = gameId ? `?gameId=${gameId}` : '';
        return this.request(`scores${query}`);
    }

    async createScore(scoreData) {
        return this.request('scores', {
            method: 'POST',
            body: JSON.stringify(scoreData),
        });
    }

    async deleteScore(id) {
        return this.request(`scores?id=${id}`, {
            method: 'DELETE',
        });
    }

    // === PARTIES ===
    
    async getParties() {
        return this.request('parties');
    }

    async createPartie(partieData) {
        return this.request('parties', {
            method: 'POST',
            body: JSON.stringify(partieData),
        });
    }

    async updatePartie(id, updates) {
        return this.request(`parties?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
}

// Instance globale
window.apiClient = new ApiClient();
```

### Utiliser l'API dans votre app

Dans votre `index.html`, ajoutez avant la fermeture de `</body>` :

```html
<!-- API Client -->
<script src="api-client.js"></script>

<!-- Votre code principal -->
<script>
    // Exemple : Charger les jeux depuis l'API
    async function loadGamesFromAPI() {
        try {
            const { games } = await window.apiClient.getGames();
            console.log('Jeux chargés:', games);
            // Afficher les jeux dans l'UI
            displayGames(games);
        } catch (error) {
            console.error('Erreur:', error);
            // Afficher un message d'erreur
        }
    }

    // Exemple : Sauvegarder un score
    async function saveScore(gameId, playerName, score) {
        try {
            const result = await window.apiClient.createScore({
                gameId,
                playerName,
                score
            });
            console.log('Score sauvegardé:', result);
            alert('✅ Score enregistré !');
        } catch (error) {
            console.error('Erreur:', error);
            alert('❌ Erreur lors de la sauvegarde');
        }
    }

    // Exemple : Créer une partie
    async function startNewGame(gameName, players) {
        try {
            const result = await window.apiClient.createPartie({
                gameId: 1, // ID du jeu
                players: players,
                settings: { mode: 'normal' }
            });
            console.log('Partie créée:', result);
            // Rediriger vers la partie
            switchTab('play');
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    // Charger au démarrage
    document.addEventListener('DOMContentLoaded', () => {
        loadGamesFromAPI();
    });
</script>
```

---

## 🧪 Tester en local

### Étape 1 : Installer Vercel CLI

```bash
npm i -g vercel
```

### Étape 2 : Lancer le serveur de dev

```bash
vercel dev
```

Votre API sera accessible sur `http://localhost:3000`

### Étape 3 : Tester les endpoints

```bash
# Tester GET
curl http://localhost:3000/api/games

# Tester POST
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"name":"Uno","players":"2-10","duration":"30min"}'
```

---

## 📊 Exemple complet : Intégration avec l'app

Modifiez votre fonction `startGame()` pour utiliser l'API :

```javascript
// Dans index.html
async function startGame(gameName) {
    try {
        // 1. Récupérer l'ID du jeu depuis l'API
        const { games } = await window.apiClient.getGames();
        const game = games.find(g => g.name === gameName);
        
        if (!game) {
            alert('Jeu non trouvé');
            return;
        }

        // 2. Créer une nouvelle partie dans la BDD
        const players = ['Joueur 1', 'Joueur 2']; // À adapter
        const partie = await window.apiClient.createPartie({
            gameId: game.id,
            players: players,
            settings: { difficulty: 'normal' }
        });

        // 3. Basculer vers l'onglet Partie
        switchTab('play');

        // 4. Afficher l'interface de jeu
        const playSection = document.getElementById('playSection');
        playSection.innerHTML = `
            <h2 class="section-title">🎮 ${gameName}</h2>
            <p class="section-subtitle">Partie #${partie.partie.id}</p>
            
            <div class="game-interface">
                <h3>Joueurs :</h3>
                ${players.map(p => `<div class="player">${p}</div>`).join('')}
                
                <button class="btn btn-primary" onclick="endGame(${partie.partie.id})">
                    Terminer la partie
                </button>
            </div>
        `;
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors du démarrage de la partie');
    }
}

// Terminer une partie
async function endGame(partieId) {
    try {
        await window.apiClient.updatePartie(partieId, {
            status: 'finished'
        });
        
        alert('✅ Partie terminée !');
        switchTab('home');
    } catch (error) {
        console.error('Erreur:', error);
    }
}
```

---

## 🔒 Sécurité

### 1. Variables d'environnement

✅ **À faire** :
- Utilisez les variables d'environnement Vercel
- Ne committez JAMAIS vos credentials
- Ajoutez `.env.local` au `.gitignore`

### 2. Validation des données

```javascript
// Exemple de validation
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, score } = req.body;
        
        // Validation
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid name' });
        }
        
        if (!score || typeof score !== 'number') {
            return res.status(400).json({ error: 'Invalid score' });
        }
        
        // Continuer...
    }
}
```

### 3. Rate Limiting (Optionnel)

```bash
npm install @vercel/edge-rate-limit
```

---

## 🐛 Dépannage

### Erreur : "Module not found"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur CORS

Vérifiez que vous avez bien les headers CORS dans chaque endpoint :

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

### La base de données ne se connecte pas

1. Vérifiez les variables d'environnement sur Vercel
2. Testez la connexion avec un client SQL
3. Vérifiez que le schéma est bien créé

### Les changements ne se déploient pas

```bash
# Forcer le redéploiement
vercel --prod --force
```

---

## 📚 Ressources

- [Vercel Functions Documentation](https://vercel.com/docs/functions)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [API Routes Examples](https://github.com/vercel/examples)

---

## ✅ Checklist finale

Avant de déployer :

- [ ] Les API routes sont créées dans `/api`
- [ ] Le fichier `vercel.json` est configuré
- [ ] Les variables d'environnement sont sur Vercel
- [ ] Le schéma de base de données est exécuté
- [ ] Les fichiers frontend sont dans `/public`
- [ ] `.gitignore` contient `.env.local`
- [ ] Le client API est créé
- [ ] Tests en local avec `vercel dev`
- [ ] Git commit et push
- [ ] Déployé sur Vercel

---

🎉 **Félicitations !** Vous avez maintenant un backend complet sur Vercel !

Pour toute question, consultez la documentation Vercel ou créez une issue sur votre repo GitHub.
