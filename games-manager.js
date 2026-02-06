// games-manager.js
// Système de gestion des jeux pour Le Ptit Score

class GamesManager {
    constructor(gamesJsonPath = 'games.json') {
        this.gamesJsonPath = gamesJsonPath;
        this.games = [];
        this.currentGame = null;
    }

    // Charger les jeux depuis le fichier JSON
    async loadGames() {
        try {
            console.log('📦 Chargement des jeux depuis games.json...');
            const response = await fetch(this.gamesJsonPath);
            const data = await response.json();
            this.games = data.games;
            console.log('✅ Jeux chargés:', this.games.length);
            return this.games;
        } catch (error) {
            console.error('❌ Erreur lors du chargement des jeux:', error);
            return this.getFallbackGames();
        }
    }

    // Jeux de secours (en cas d'échec du chargement)
    getFallbackGames() {
        return [
            {
                id: 'uno',
                name: 'Uno',
                icon: '🎯',
                players: '2-10 joueurs',
                duration: '30 min',
                description: 'Le but est de se débarrasser de toutes ses cartes.',
                scoreSystem: {
                    type: 'simple',
                    buttons: [
                        { label: '+1', value: 1, color: '#4CAF50' },
                        { label: '+5', value: 5, color: '#2196F3' },
                        { label: '+10', value: 10, color: '#FF9800' }
                    ]
                }
            }
        ];
    }

    // Obtenir un jeu par son ID
    getGameById(id) {
        return this.games.find(game => game.id === id);
    }

    // Obtenir tous les jeux
    getAllGames() {
        return this.games;
    }

    // Générer le HTML d'une carte de jeu pour le catalogue
    renderGameCard(game) {
        return `
            <div class="catalog-game-card">
                <div class="catalog-game-header">
                    <div class="catalog-game-icon">${game.icon}</div>
                    <div class="catalog-game-info">
                        <h3 class="catalog-game-title">${game.name}</h3>
                        <p class="catalog-game-meta">${game.players} • ${game.duration}</p>
                    </div>
                </div>
                <div class="catalog-game-description">
                    <h4>Règles du jeu :</h4>
                    <p>${game.rules.replace(/\n\n/g, '</p><p>')}</p>
                </div>
                <button class="btn btn-primary catalog-play-btn" onclick="startGame('${game.id}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                    </svg>
                    Jouer
                </button>
            </div>
        `;
    }

    // Afficher tous les jeux dans le catalogue
    async displayGames(containerId = 'gamesLibrarySection') {
        await this.loadGames();
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Conteneur ${containerId} introuvable`);
            return;
        }

        // Trouver le div games-catalog
        let catalogDiv = container.querySelector('.games-catalog');
        if (!catalogDiv) {
            console.error('.games-catalog introuvable');
            return;
        }

        const gamesHtml = this.games.map(game => 
            this.renderGameCard(game)
        ).join('');

        catalogDiv.innerHTML = gamesHtml;
    }

    // Générer l'interface de scoring pour un jeu
    renderScoreInterface(gameId, players) {
        const game = this.getGameById(gameId);
        if (!game) return '';

        this.currentGame = game;
        const scoreSystem = game.scoreSystem;

        switch (scoreSystem.type) {
            case 'simple':
                return this.renderSimpleScoreInterface(game, players);
            case 'categories':
                return this.renderCategoriesScoreInterface(game, players);
            case 'contract':
                return this.renderContractScoreInterface(game, players);
            case 'symbiose':
                return this.renderSymbioseScoreInterface(game, players);
            default:
                return this.renderSimpleScoreInterface(game, players);
        }
    }

    // Interface simple avec boutons de points
    renderSimpleScoreInterface(game, players) {
        return `
            <div class="score-interface">
                <h2 class="section-title">🎮 ${game.name}</h2>
                <p class="section-subtitle">Partie en cours</p>

                <div class="players-score-grid">
                    ${players.map((player, index) => `
                        <div class="player-score-card" data-player-index="${index}">
                            <div class="player-name">${player}</div>
                            <div class="player-score" id="score-${index}">0</div>
                            <div class="score-buttons">
                                ${game.scoreSystem.buttons.map(btn => `
                                    <button class="score-btn" 
                                            style="background: ${btn.color}"
                                            onclick="addPoints(${index}, ${btn.value})">
                                        ${btn.label}
                                    </button>
                                `).join('')}
                            </div>
                            <button class="btn-reset-player" onclick="resetPlayerScore(${index})">
                                ↻ Réinitialiser
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="game-actions">
                    <button class="btn btn-secondary" onclick="endCurrentGame()">
                        Terminer la partie
                    </button>
                    <button class="btn btn-primary" onclick="saveGameScores()">
                        💾 Sauvegarder
                    </button>
                </div>
            </div>
        `;
    }

    // Interface avec catégories (Yahtzee)
    renderCategoriesScoreInterface(game, players) {
        const categories = game.scoreSystem.categories;
        
        return `
            <div class="score-interface">
                <h2 class="section-title">🎮 ${game.name}</h2>
                <p class="section-subtitle">Grille de score</p>

                <div class="yahtzee-scoresheet">
                    <table class="score-table">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                ${players.map((player, idx) => `<th>${player}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${categories.map(cat => `
                                <tr>
                                    <td><strong>${cat.name}</strong></td>
                                    ${players.map((player, pIdx) => `
                                        <td>
                                            ${this.renderCategoryInput(cat, pIdx)}
                                        </td>
                                    `).join('')}
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td><strong>TOTAL</strong></td>
                                ${players.map((player, pIdx) => `
                                    <td id="total-${pIdx}">0</td>
                                `).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="game-actions">
                    <button class="btn btn-secondary" onclick="endCurrentGame()">
                        Terminer la partie
                    </button>
                    <button class="btn btn-primary" onclick="calculateYahtzeeScores()">
                        📊 Calculer les totaux
                    </button>
                </div>
            </div>
        `;
    }

    // Générer l'input pour une catégorie
    renderCategoryInput(category, playerIndex) {
        const inputId = `${category.id}-player-${playerIndex}`;
        
        if (category.type === 'fixed') {
            // Checkbox pour points fixes (Full, Suite, etc.)
            return `
                <input type="checkbox" 
                       id="${inputId}" 
                       data-points="${category.points}"
                       onchange="updateYahtzeeTotal(${playerIndex})">
                <label for="${inputId}">${category.points} pts</label>
            `;
        } else if (category.type === 'number') {
            // Input numérique
            return `
                <input type="number" 
                       id="${inputId}" 
                       min="0" 
                       max="${category.max || 100}" 
                       value="0"
                       class="score-input"
                       onchange="updateYahtzeeTotal(${playerIndex})">
            `;
        }
    }

    // Interface contrat (Tarot)
    renderContractScoreInterface(game, players) {
        return `
            <div class="score-interface">
                <h2 class="section-title">🎮 ${game.name}</h2>
                <p class="section-subtitle">Calcul du contrat</p>

                <div class="tarot-calculator">
                    <div class="form-group">
                        <label>Preneur</label>
                        <select id="tarot-taker">
                            ${players.map((player, idx) => `
                                <option value="${idx}">${player}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Contrat</label>
                        <select id="tarot-contract">
                            ${game.scoreSystem.contracts.map(contract => `
                                <option value="${contract.id}" data-multiplier="${contract.multiplier}">
                                    ${contract.name} (×${contract.multiplier})
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Nombre de bouts</label>
                        <select id="tarot-bouts">
                            ${game.scoreSystem.bouts.map(bout => `
                                <option value="${bout.count}" data-threshold="${bout.threshold}">
                                    ${bout.count} bout${bout.count > 1 ? 's' : ''} (Seuil: ${bout.threshold} pts)
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Points réalisés</label>
                        <input type="number" id="tarot-points" min="0" max="91" value="41">
                    </div>

                    <div class="form-group">
                        <label>Bonus</label>
                        ${game.scoreSystem.bonuses.map(bonus => `
                            <div class="checkbox-group">
                                <input type="checkbox" id="bonus-${bonus.id}" data-points="${bonus.points}">
                                <label for="bonus-${bonus.id}">${bonus.name} (+${bonus.points})</label>
                            </div>
                        `).join('')}
                    </div>

                    <button class="btn btn-primary" onclick="calculateTarotScore()">
                        📊 Calculer le score
                    </button>

                    <div id="tarot-result" class="tarot-result" style="display: none;">
                        <!-- Résultat affiché ici -->
                    </div>
                </div>

                <div class="game-actions">
                    <button class="btn btn-secondary" onclick="endCurrentGame()">
                        Terminer la partie
                    </button>
                </div>
            </div>
        `;
    }

    // Interface Symbiose avec plateau visuel
    renderSymbioseScoreInterface(game, players) {
        // Maximum 4 joueurs pour Symbiose
        const numPlayers = Math.min(players.length, 4);
        const playersList = players.slice(0, numPlayers);
        
        return `
            <div class="score-interface symbiose-interface">
                <h2 class="section-title">🌸 ${game.name}</h2>
                <p class="section-subtitle">${numPlayers} joueur${numPlayers > 1 ? 's' : ''}</p>

                <!-- Disposition des plateaux selon le nombre de joueurs -->
                <div class="symbiose-boards ${numPlayers === 2 ? 'layout-2' : numPlayers === 3 ? 'layout-3' : 'layout-4'}">
                    ${playersList.map((player, pIdx) => `
                        <div class="symbiose-player-board" data-player-index="${pIdx}">
                            <div class="symbiose-player-header">
                                <h3>${player}</h3>
                                <div class="symbiose-player-score" id="symbiose-score-${pIdx}">0 pts</div>
                            </div>
                            
                            <!-- Mare 4x2 (8 cartes) -->
                            <div class="symbiose-mare">
                                ${[0, 1, 2, 3, 4, 5, 6, 7].map(cardIdx => `
                                    <div class="symbiose-card" data-position="${this.getSymbiosePosition(cardIdx)}">
                                        <div class="symbiose-card-animal">
                                            <select onchange="updateSymbioseScore(${pIdx})" 
                                                    id="p${pIdx}-animal-${cardIdx}">
                                                <option value="">-</option>
                                                <option value="libellule">🦋 Libellule</option>
                                                <option value="escargot">🐌 Escargot</option>
                                                <option value="grenouille">🐸 Grenouille</option>
                                                <option value="martin">🐦 Martin-pêcheur</option>
                                                <option value="crapaud">🐸 Crapaud</option>
                                                <option value="salamandre">🦎 Salamandre</option>
                                                <option value="poisson">🐟 Poisson</option>
                                                <option value="triton">🦎 Triton</option>
                                                <option value="nenuphar">🪷 Nénuphar</option>
                                            </select>
                                        </div>
                                        <div class="symbiose-card-season">
                                            <select onchange="updateSymbioseScore(${pIdx})" 
                                                    id="p${pIdx}-season-${cardIdx}">
                                                <option value="">-</option>
                                                <option value="printemps">🌸 Printemps</option>
                                                <option value="ete">☀️ Été</option>
                                                <option value="automne">🍂 Automne</option>
                                                <option value="hiver">❄️ Hiver</option>
                                            </select>
                                        </div>
                                        <div class="symbiose-card-points">
                                            <input type="number" min="0" max="10" value="0" 
                                                   placeholder="Pts"
                                                   id="p${pIdx}-points-${cardIdx}"
                                                   onchange="updateSymbioseScore(${pIdx})">
                                        </div>
                                        <div class="symbiose-card-position">${this.getSymbiosePositionLabel(cardIdx)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="symbiose-legend">
                    <h4>Légende des positions :</h4>
                    <div class="legend-items">
                        <div class="legend-item"><span class="pos-left">G</span> Score avec voisin de gauche</div>
                        <div class="legend-item"><span class="pos-center">C</span> Score avec ses propres cartes</div>
                        <div class="legend-item"><span class="pos-right">D</span> Score avec voisin de droite</div>
                    </div>
                </div>

                <div class="game-actions">
                    <button class="btn btn-primary" onclick="calculateAllSymbioseScores()">
                        📊 Calculer tous les scores
                    </button>
                    <button class="btn btn-secondary" onclick="endCurrentGame()">
                        Terminer la partie
                    </button>
                </div>
            </div>
        `;
    }

    // Obtenir la position d'une carte dans la mare Symbiose
    getSymbiosePosition(cardIndex) {
        // Mare 4x2 : [0,1,2,3] ligne du haut, [4,5,6,7] ligne du bas
        // Gauche: 0,4 | Centre: 1,2,5,6 | Droite: 3,7
        if (cardIndex === 0 || cardIndex === 4) return 'left';
        if (cardIndex === 3 || cardIndex === 7) return 'right';
        return 'center';
    }

    // Obtenir le label de position
    getSymbiosePositionLabel(cardIndex) {
        const pos = this.getSymbiosePosition(cardIndex);
        if (pos === 'left') return 'G';
        if (pos === 'right') return 'D';
        return 'C';
    }
}

// Instance globale
window.gamesManager = new GamesManager();

// Fonctions globales pour l'interface de scoring

// Scores simples
let playerScores = [];

function initializeScores(playerCount) {
    playerScores = new Array(playerCount).fill(0);
}

function addPoints(playerIndex, value) {
    playerScores[playerIndex] += value;
    document.getElementById(`score-${playerIndex}`).textContent = playerScores[playerIndex];
    
    // Animation
    const scoreElement = document.getElementById(`score-${playerIndex}`);
    scoreElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
    }, 200);
}

function resetPlayerScore(playerIndex) {
    if (confirm('Réinitialiser le score de ce joueur ?')) {
        playerScores[playerIndex] = 0;
        document.getElementById(`score-${playerIndex}`).textContent = '0';
    }
}

// Yahtzee
function updateYahtzeeTotal(playerIndex) {
    const game = window.gamesManager.currentGame;
    if (!game || game.scoreSystem.type !== 'categories') return;
    
    let total = 0;
    
    // Calculer le total
    game.scoreSystem.categories.forEach(cat => {
        const inputId = `${cat.id}-player-${playerIndex}`;
        const input = document.getElementById(inputId);
        
        if (!input) return;
        
        if (cat.type === 'fixed' && input.checked) {
            total += cat.points;
        } else if (cat.type === 'number') {
            total += parseInt(input.value) || 0;
        }
    });
    
    // Bonus section supérieure (As à Six)
    const sectionSup = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    let supTotal = 0;
    sectionSup.forEach(catId => {
        const input = document.getElementById(`${catId}-player-${playerIndex}`);
        if (input) supTotal += parseInt(input.value) || 0;
    });
    
    if (supTotal >= 63 && game.scoreSystem.bonus) {
        total += game.scoreSystem.bonus.points;
    }
    
    document.getElementById(`total-${playerIndex}`).textContent = total;
}

function calculateYahtzeeScores() {
    const playerCount = document.querySelectorAll('[id^="total-"]').length;
    for (let i = 0; i < playerCount; i++) {
        updateYahtzeeTotal(i);
    }
    alert('✅ Totaux calculés !');
}

// Tarot
function calculateTarotScore() {
    const game = window.gamesManager.currentGame;
    if (!game || game.scoreSystem.type !== 'contract') return;
    
    const takerIndex = parseInt(document.getElementById('tarot-taker').value);
    const contractSelect = document.getElementById('tarot-contract');
    const multiplier = parseInt(contractSelect.selectedOptions[0].dataset.multiplier);
    
    const boutsSelect = document.getElementById('tarot-bouts');
    const threshold = parseInt(boutsSelect.selectedOptions[0].dataset.threshold);
    
    const pointsMade = parseInt(document.getElementById('tarot-points').value);
    
    // Calculer la différence
    const difference = pointsMade - threshold;
    const baseScore = 25 + Math.abs(difference);
    const finalScore = baseScore * multiplier * (difference >= 0 ? 1 : -1);
    
    // Bonus
    let bonusTotal = 0;
    game.scoreSystem.bonuses.forEach(bonus => {
        const checkbox = document.getElementById(`bonus-${bonus.id}`);
        if (checkbox && checkbox.checked) {
            bonusTotal += bonus.points;
        }
    });
    
    // Afficher le résultat
    const resultDiv = document.getElementById('tarot-result');
    const success = difference >= 0;
    
    resultDiv.innerHTML = `
        <h3>${success ? '✅ Contrat réussi' : '❌ Contrat raté'}</h3>
        <p>Points : ${pointsMade} / ${threshold}</p>
        <p>Différence : ${difference > 0 ? '+' : ''}${difference}</p>
        <p>Score de base : ${baseScore} × ${multiplier} = <strong>${finalScore}</strong></p>
        ${bonusTotal > 0 ? `<p>Bonus : +${bonusTotal}</p>` : ''}
        <p class="final-score">Score final : <strong>${finalScore + bonusTotal}</strong> points</p>
    `;
    resultDiv.style.display = 'block';
}

// Fin de partie
function endCurrentGame() {
    if (confirm('Terminer la partie ?')) {
        switchTab('home');
        alert('🎮 Partie terminée !');
    }
}

function saveGameScores() {
    alert('💾 Scores sauvegardés ! (fonctionnalité à implémenter avec le backend)');
}

// Symbiose - Calcul des scores
function updateSymbioseScore(playerIndex) {
    // Calculer automatiquement le score pour un joueur
    let totalScore = 0;
    
    // Parcourir les 8 cartes
    for (let cardIdx = 0; cardIdx < 8; cardIdx++) {
        const pointsInput = document.getElementById(`p${playerIndex}-points-${cardIdx}`);
        if (pointsInput) {
            const points = parseInt(pointsInput.value) || 0;
            totalScore += points;
        }
    }
    
    // Mettre à jour l'affichage
    const scoreDisplay = document.getElementById(`symbiose-score-${playerIndex}`);
    if (scoreDisplay) {
        scoreDisplay.textContent = `${totalScore} pts`;
        
        // Animation
        scoreDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            scoreDisplay.style.transform = 'scale(1)';
        }, 200);
    }
}

function calculateAllSymbioseScores() {
    // Calculer les scores de tous les joueurs
    const boards = document.querySelectorAll('.symbiose-player-board');
    boards.forEach((board, index) => {
        updateSymbioseScore(index);
    });
    
    alert('✅ Tous les scores ont été calculés !');
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', async () => {
    await window.gamesManager.loadGames();
    
    // Afficher les jeux dans le catalogue si on est sur cette page
    if (document.getElementById('gamesLibrarySection')) {
        window.gamesManager.displayGames();
    }
});
