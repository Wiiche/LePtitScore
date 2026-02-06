// players-manager.js
// Système de gestion des joueurs pour Le Ptit Score

class PlayersManager {
    constructor() {
        this.players = [];
        this.selectedPlayers = [];
        this.currentGameId = null;
        this.loadPlayers();
    }

    // Charger les joueurs depuis localStorage
    loadPlayers() {
        const stored = localStorage.getItem('players_database');
        if (stored) {
            this.players = JSON.parse(stored);
        } else {
            // Créer des joueurs par défaut
            this.players = [
                {
                    id: this.generateId(),
                    name: 'Valentin',
                    avatar: '🎮',
                    gamesPlayed: 0,
                    wins: 0,
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    name: 'Lilou',
                    avatar: '🌸',
                    gamesPlayed: 0,
                    wins: 0,
                    createdAt: new Date().toISOString()
                }
            ];
            this.savePlayers();
        }
        console.log('✅ Joueurs chargés:', this.players.length);
    }

    // Sauvegarder les joueurs
    savePlayers() {
        localStorage.setItem('players_database', JSON.stringify(this.players));
    }

    // Générer un ID unique
    generateId() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Obtenir tous les joueurs
    getAllPlayers() {
        return this.players;
    }

    // Obtenir un joueur par ID
    getPlayerById(id) {
        return this.players.find(p => p.id === id);
    }

    // Créer un nouveau joueur
    createPlayer(name, avatar = '👤') {
        const player = {
            id: this.generateId(),
            name: name.trim(),
            avatar: avatar,
            gamesPlayed: 0,
            wins: 0,
            createdAt: new Date().toISOString()
        };

        this.players.push(player);
        this.savePlayers();
        console.log('✅ Joueur créé:', player.name);
        return player;
    }

    // Supprimer un joueur
    deletePlayer(id) {
        this.players = this.players.filter(p => p.id !== id);
        this.savePlayers();
        console.log('🗑️ Joueur supprimé');
    }

    // Modifier un joueur
    updatePlayer(id, updates) {
        const index = this.players.findIndex(p => p.id === id);
        if (index !== -1) {
            this.players[index] = { ...this.players[index], ...updates };
            this.savePlayers();
            console.log('✅ Joueur mis à jour');
        }
    }

    // Incrémenter les stats d'un joueur
    incrementStats(playerId, won = false) {
        const player = this.getPlayerById(playerId);
        if (player) {
            player.gamesPlayed++;
            if (won) player.wins++;
            this.savePlayers();
        }
    }

    // Afficher la modal de sélection de joueurs
    openPlayersModal(gameId) {
        this.currentGameId = gameId;
        this.selectedPlayers = [];
        
        // Afficher la modal
        document.getElementById('playersModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Rendre la liste des joueurs disponibles
        this.renderAvailablePlayers();
        this.renderSelectedPlayers();
    }

    // Fermer la modal
    closePlayersModal() {
        document.getElementById('playersModal').classList.remove('active');
        document.body.style.overflow = '';
        this.selectedPlayers = [];
        this.currentGameId = null;
    }

    // Rendre la liste des joueurs disponibles
    renderAvailablePlayers() {
        const container = document.getElementById('availablePlayersList');
        
        if (this.players.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: var(--text-secondary); grid-column: 1/-1;">
                    Aucun joueur enregistré. Créez-en un ci-dessous !
                </div>
            `;
            return;
        }

        container.innerHTML = this.players.map(player => `
            <div class="available-player-card ${this.selectedPlayers.includes(player.id) ? 'selected' : ''}" 
                 onclick="window.playersManager.togglePlayer('${player.id}')">
                <div class="available-player-avatar">${player.avatar}</div>
                <div class="available-player-name">${player.name}</div>
                <div class="available-player-stats">${player.gamesPlayed} parties • ${player.wins} victoires</div>
                <div class="available-player-actions">
                    <button class="player-action-btn" onclick="event.stopPropagation(); window.playersManager.editPlayer('${player.id}')">✏️</button>
                    <button class="player-action-btn" onclick="event.stopPropagation(); window.playersManager.deletePlayerPrompt('${player.id}')">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Rendre la liste des joueurs sélectionnés
    renderSelectedPlayers() {
        const container = document.getElementById('selectedPlayersList');
        
        if (this.selectedPlayers.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = this.selectedPlayers.map(playerId => {
            const player = this.getPlayerById(playerId);
            if (!player) return '';
            
            return `
                <div class="selected-player-chip">
                    <span>${player.avatar} ${player.name}</span>
                    <button onclick="window.playersManager.removePlayer('${playerId}')">×</button>
                </div>
            `;
        }).join('');
    }

    // Ajouter/retirer un joueur de la sélection
    togglePlayer(playerId) {
        const index = this.selectedPlayers.indexOf(playerId);
        
        if (index === -1) {
            // Ajouter
            this.selectedPlayers.push(playerId);
        } else {
            // Retirer
            this.selectedPlayers.splice(index, 1);
        }
        
        this.renderAvailablePlayers();
        this.renderSelectedPlayers();
    }

    // Retirer un joueur de la sélection
    removePlayer(playerId) {
        const index = this.selectedPlayers.indexOf(playerId);
        if (index !== -1) {
            this.selectedPlayers.splice(index, 1);
        }
        this.renderAvailablePlayers();
        this.renderSelectedPlayers();
    }

    // Créer un nouveau joueur depuis la modal
    createNewPlayer() {
        const input = document.getElementById('newPlayerName');
        const name = input.value.trim();
        
        if (!name) {
            alert('Veuillez entrer un nom');
            return;
        }

        // Vérifier si le nom existe déjà
        if (this.players.find(p => p.name.toLowerCase() === name.toLowerCase())) {
            alert('Ce nom existe déjà');
            return;
        }

        // Liste d'avatars aléatoires
        const avatars = ['👤', '🎮', '🌸', '⚡', '🌟', '🎯', '🎲', '🎨', '🎭', '🎪', '🎬', '🎸', '🎺', '🎹', '🎤'];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

        const newPlayer = this.createPlayer(name, randomAvatar);
        
        // Ajouter automatiquement à la sélection
        this.selectedPlayers.push(newPlayer.id);
        
        // Rafraîchir l'affichage
        this.renderAvailablePlayers();
        this.renderSelectedPlayers();
        
        // Vider l'input
        input.value = '';
        
        alert(`✅ ${name} a été créé !`);
    }

    // Modifier un joueur
    editPlayer(playerId) {
        const player = this.getPlayerById(playerId);
        if (!player) return;

        const newName = prompt('Nouveau nom :', player.name);
        if (newName && newName.trim() !== player.name) {
            this.updatePlayer(playerId, { name: newName.trim() });
            this.renderAvailablePlayers();
            alert('✅ Joueur modifié');
        }
    }

    // Supprimer un joueur avec confirmation
    deletePlayerPrompt(playerId) {
        const player = this.getPlayerById(playerId);
        if (!player) return;

        if (confirm(`Supprimer ${player.name} ?\nCette action est irréversible.`)) {
            this.deletePlayer(playerId);
            
            // Retirer de la sélection si présent
            const index = this.selectedPlayers.indexOf(playerId);
            if (index !== -1) {
                this.selectedPlayers.splice(index, 1);
            }
            
            this.renderAvailablePlayers();
            this.renderSelectedPlayers();
            alert('🗑️ Joueur supprimé');
        }
    }

    // Démarrer la partie avec les joueurs sélectionnés
    startGameWithSelectedPlayers() {
        if (this.selectedPlayers.length < 2) {
            alert('Il faut au moins 2 joueurs pour commencer une partie !');
            return;
        }

        // Récupérer les noms des joueurs
        const playerNames = this.selectedPlayers.map(id => {
            const player = this.getPlayerById(id);
            return player ? player.name : 'Joueur';
        });

        console.log('🎮 Démarrage de la partie avec:', playerNames);

        // Fermer la modal
        this.closePlayersModal();

        // Lancer le jeu avec les joueurs sélectionnés
        if (this.currentGameId && window.gamesManager) {
            // Basculer vers l'onglet Partie
            switchTab('play');
            
            // Afficher l'interface de scoring
            const playSection = document.getElementById('playSection');
            if (playSection) {
                const scoreInterface = window.gamesManager.renderScoreInterface(this.currentGameId, playerNames);
                playSection.innerHTML = scoreInterface;
                
                // Initialiser les scores pour le système simple
                const game = window.gamesManager.getGameById(this.currentGameId);
                if (game && game.scoreSystem.type === 'simple') {
                    initializeScores(playerNames.length);
                }
            }
        }
    }

    // Obtenir les noms des joueurs depuis leurs IDs
    getPlayerNames(playerIds) {
        return playerIds.map(id => {
            const player = this.getPlayerById(id);
            return player ? player.name : 'Joueur';
        });
    }
}

// Instance globale
window.playersManager = new PlayersManager();

// Fonctions globales pour la modal

function closePlayersModal() {
    window.playersManager.closePlayersModal();
}

function createNewPlayer() {
    window.playersManager.createNewPlayer();
}

function startGameWithSelectedPlayers() {
    window.playersManager.startGameWithSelectedPlayers();
}

// Initialisation
console.log('👥 Players Manager chargé');
