// backoffice.js - Système de gestion backoffice pour Le Ptit Score

// Configuration
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // À CHANGER EN PRODUCTION !
};

const STORAGE_KEYS = {
    articles: 'backoffice_articles',
    games: 'backoffice_games',
    auth: 'backoffice_auth'
};

// État global
let currentEditingArticle = null;
let currentEditingGame = null;

// ======================
// AUTHENTICATION
// ======================

// Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Authentification réussie
        localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({
            username: username,
            loginTime: new Date().toISOString()
        }));
        
        showAdmin();
    } else {
        showError('Identifiants incorrects');
    }
});

// Vérifier l'authentification au chargement
window.addEventListener('DOMContentLoaded', () => {
    const auth = localStorage.getItem(STORAGE_KEYS.auth);
    if (auth) {
        showAdmin();
    }
});

// Afficher l'interface admin
function showAdmin() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminContainer').classList.add('show');
    
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEYS.auth));
    document.getElementById('currentUser').textContent = auth.username;
    
    loadDashboard();
    loadArticles();
    loadGames();
}

// Déconnexion
function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        localStorage.removeItem(STORAGE_KEYS.auth);
        location.reload();
    }
}

// Afficher un message d'erreur
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 3000);
}

// ======================
// TAB SWITCHING
// ======================

function switchAdminTab(tabName) {
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Activer l'onglet sélectionné
    const tabButton = event.target || document.querySelector(`.tab[onclick="switchAdminTab('${tabName}')"]`);
    if (tabButton) tabButton.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// ======================
// DASHBOARD
// ======================

function loadDashboard() {
    const articles = getArticles();
    const games = getGames();
    
    document.getElementById('totalArticles').textContent = articles.length;
    document.getElementById('totalGames').textContent = games.length;
    document.getElementById('featuredArticles').textContent = 
        articles.filter(a => a.featured).length;
}

// ======================
// ARTICLES MANAGEMENT
// ======================

// Récupérer les articles
function getArticles() {
    const stored = localStorage.getItem(STORAGE_KEYS.articles);
    return stored ? JSON.parse(stored) : [];
}

// Sauvegarder les articles
function saveArticles(articles) {
    localStorage.setItem(STORAGE_KEYS.articles, JSON.stringify(articles));
    // Exporter aussi vers articles.json pour l'app
    exportArticlesToJSON(articles);
}

// Charger les articles dans le tableau
function loadArticles() {
    const articles = getArticles();
    const tbody = document.getElementById('articlesTableBody');
    
    if (articles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Aucun article. Créez-en un !</td></tr>';
        return;
    }
    
    tbody.innerHTML = articles.map(article => `
        <tr>
            <td>
                <strong>${article.title}</strong><br>
                <small style="color: #999;">${article.excerpt.substring(0, 60)}...</small>
            </td>
            <td>${article.category}</td>
            <td>${formatDate(article.date)}</td>
            <td>
                <span class="badge ${article.featured ? 'badge-featured' : 'badge-normal'}">
                    ${article.featured ? '⭐ Vedette' : 'Normal'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editArticle('${article.id}')">✏️ Modifier</button>
                    <button class="btn-delete" onclick="deleteArticle('${article.id}')">🗑️ Supprimer</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Ouvrir la modal article
function openArticleModal(articleId = null) {
    const modal = document.getElementById('articleModal');
    const form = document.getElementById('articleForm');
    form.reset();
    
    if (articleId) {
        // Mode édition
        const articles = getArticles();
        const article = articles.find(a => a.id === articleId);
        if (!article) return;
        
        currentEditingArticle = article;
        document.getElementById('articleModalTitle').textContent = 'Modifier l\'article';
        
        // Remplir le formulaire
        document.getElementById('articleId').value = article.id;
        document.getElementById('articleTitle').value = article.title;
        document.getElementById('articleSlug').value = article.id;
        document.getElementById('articleCategory').value = article.category;
        document.getElementById('articleIcon').value = article.icon;
        document.getElementById('articleBadge').value = article.badge || '';
        document.getElementById('articleReadTime').value = article.readTime;
        document.getElementById('articleExcerpt').value = article.excerpt;
        document.getElementById('articleContent').value = contentToMarkdown(article.content);
        document.getElementById('articleGradient').value = article.gradient;
        document.getElementById('articleFeatured').checked = article.featured;
    } else {
        // Mode création
        currentEditingArticle = null;
        document.getElementById('articleModalTitle').textContent = 'Nouvel article';
    }
    
    modal.classList.add('show');
}

// Fermer la modal article
function closeArticleModal() {
    document.getElementById('articleModal').classList.remove('show');
    currentEditingArticle = null;
}

// Sauvegarder un article
document.getElementById('articleForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const articles = getArticles();
    const id = document.getElementById('articleId').value || document.getElementById('articleSlug').value;
    
    const articleData = {
        id: id,
        title: document.getElementById('articleTitle').value,
        icon: document.getElementById('articleIcon').value,
        badge: document.getElementById('articleBadge').value || null,
        category: document.getElementById('articleCategory').value,
        date: new Date().toISOString().split('T')[0],
        readTime: document.getElementById('articleReadTime').value,
        excerpt: document.getElementById('articleExcerpt').value,
        gradient: document.getElementById('articleGradient').value,
        featured: document.getElementById('articleFeatured').checked,
        author: 'Rédaction Le Ptit Score',
        content: parseMarkdown(document.getElementById('articleContent').value)
    };
    
    if (currentEditingArticle) {
        // Mise à jour
        const index = articles.findIndex(a => a.id === currentEditingArticle.id);
        articles[index] = articleData;
    } else {
        // Création
        articles.push(articleData);
    }
    
    saveArticles(articles);
    loadArticles();
    loadDashboard();
    closeArticleModal();
    
    alert('✅ Article enregistré avec succès !');
});

// Éditer un article
function editArticle(id) {
    openArticleModal(id);
}

// Supprimer un article
function deleteArticle(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;
    
    const articles = getArticles();
    const filtered = articles.filter(a => a.id !== id);
    saveArticles(filtered);
    loadArticles();
    loadDashboard();
    
    alert('🗑️ Article supprimé');
}

// ======================
// GAMES MANAGEMENT
// ======================

// Récupérer les jeux
function getGames() {
    const stored = localStorage.getItem(STORAGE_KEYS.games);
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Jeux par défaut
    return [
        {
            id: 'uno',
            name: 'Uno',
            icon: '🎯',
            players: '2-10 joueurs',
            duration: '30 min',
            description: 'Le but est de se débarrasser de toutes ses cartes.',
            rules: 'À tour de rôle, posez une carte de même couleur ou de même chiffre que la carte sur le dessus de la pile. Utilisez les cartes spéciales (Passer, Inverser, +2, +4, Joker) pour perturber vos adversaires !\n\nFin de partie : Le premier joueur à poser sa dernière carte gagne. N\'oubliez pas de crier "Uno !" quand il ne vous reste qu\'une carte.'
        },
        {
            id: 'yahtzee',
            name: 'Yahtzee',
            icon: '🎲',
            players: '2-10 joueurs',
            duration: '45 min',
            description: 'Lancez les dés pour réaliser des combinaisons.',
            rules: 'Lancez 5 dés jusqu\'à 3 fois par tour pour réaliser des combinaisons. Chaque combinaison ne peut être utilisée qu\'une seule fois dans la partie. Les combinaisons incluent : Brelan, Carré, Full, Suite, et le Yahtzee (5 dés identiques).\n\nDécompte des points : Chiffres (1-6), Brelan (somme des dés), Full (25 pts), Suite (30-40 pts), Yahtzee (50 pts).'
        },
        {
            id: 'tarot',
            name: 'Tarot',
            icon: '🃏',
            players: '3-5 joueurs',
            duration: '60 min',
            description: 'Jeu de cartes stratégique avec atouts.',
            rules: 'Un joueur est désigné preneur et doit réaliser un contrat contre les autres joueurs (la défense). Le preneur constitue son écart (dog) avec 6 cartes face cachée. Les atouts (1-21 + Excuse) sont les cartes maîtresses.\n\nDécompte des points : Comptez les bouts (1, 21, Excuse) dans les plis pour définir le seuil. Le preneur doit atteindre 56, 51 ou 41 points selon le nombre de bouts.'
        }
    ];
}

// Sauvegarder les jeux
function saveGames(games) {
    localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(games));
}

// Charger les jeux dans le tableau
function loadGames() {
    const games = getGames();
    const tbody = document.getElementById('gamesTableBody');
    
    tbody.innerHTML = games.map(game => `
        <tr>
            <td><strong>${game.name}</strong></td>
            <td>${game.players}</td>
            <td>${game.duration}</td>
            <td style="font-size: 2rem;">${game.icon}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editGame('${game.id}')">✏️ Modifier</button>
                    <button class="btn-delete" onclick="deleteGame('${game.id}')">🗑️ Supprimer</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Ouvrir la modal jeu
function openGameModal(gameId = null) {
    const modal = document.getElementById('gameModal');
    const form = document.getElementById('gameForm');
    form.reset();
    
    if (gameId) {
        // Mode édition
        const games = getGames();
        const game = games.find(g => g.id === gameId);
        if (!game) return;
        
        currentEditingGame = game;
        document.getElementById('gameModalTitle').textContent = 'Modifier le jeu';
        
        document.getElementById('gameId').value = game.id;
        document.getElementById('gameName').value = game.name;
        document.getElementById('gameIcon').value = game.icon;
        document.getElementById('gamePlayers').value = game.players;
        document.getElementById('gameDuration').value = game.duration;
        document.getElementById('gameDescription').value = game.description;
        document.getElementById('gameRules').value = game.rules;
    } else {
        // Mode création
        currentEditingGame = null;
        document.getElementById('gameModalTitle').textContent = 'Nouveau jeu';
    }
    
    modal.classList.add('show');
}

// Fermer la modal jeu
function closeGameModal() {
    document.getElementById('gameModal').classList.remove('show');
    currentEditingGame = null;
}

// Sauvegarder un jeu
document.getElementById('gameForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const games = getGames();
    const name = document.getElementById('gameName').value;
    const id = document.getElementById('gameId').value || name.toLowerCase().replace(/\s+/g, '-');
    
    const gameData = {
        id: id,
        name: name,
        icon: document.getElementById('gameIcon').value,
        players: document.getElementById('gamePlayers').value,
        duration: document.getElementById('gameDuration').value,
        description: document.getElementById('gameDescription').value,
        rules: document.getElementById('gameRules').value
    };
    
    if (currentEditingGame) {
        // Mise à jour
        const index = games.findIndex(g => g.id === currentEditingGame.id);
        games[index] = gameData;
    } else {
        // Création
        games.push(gameData);
    }
    
    saveGames(games);
    loadGames();
    loadDashboard();
    closeGameModal();
    
    alert('✅ Jeu enregistré avec succès !');
});

// Éditer un jeu
function editGame(id) {
    openGameModal(id);
}

// Supprimer un jeu
function deleteGame(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) return;
    
    const games = getGames();
    const filtered = games.filter(g => g.id !== id);
    saveGames(filtered);
    loadGames();
    loadDashboard();
    
    alert('🗑️ Jeu supprimé');
}

// ======================
// MARKDOWN PARSER
// ======================

// Convertir le contenu en Markdown simple
function contentToMarkdown(content) {
    let markdown = '';
    
    content.forEach(block => {
        switch (block.type) {
            case 'paragraph':
                markdown += block.text + '\n\n';
                break;
            case 'heading':
                const hashes = '#'.repeat(block.level || 3);
                markdown += `${hashes} ${block.text}\n\n`;
                break;
            case 'list':
                block.items.forEach(item => {
                    markdown += `- ${item}\n`;
                });
                markdown += '\n';
                break;
        }
    });
    
    return markdown.trim();
}

// Parser le Markdown en contenu structuré
function parseMarkdown(markdown) {
    const blocks = [];
    const lines = markdown.split('\n\n');
    
    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        // Titres
        if (line.startsWith('### ')) {
            blocks.push({
                type: 'heading',
                level: 3,
                text: line.replace('### ', '')
            });
        } else if (line.startsWith('## ')) {
            blocks.push({
                type: 'heading',
                level: 2,
                text: line.replace('## ', '')
            });
        }
        // Listes
        else if (line.includes('\n- ') || line.startsWith('- ')) {
            const items = line.split('\n')
                .filter(l => l.trim().startsWith('- '))
                .map(l => l.replace(/^-\s*/, '').trim());
            
            if (items.length > 0) {
                blocks.push({
                    type: 'list',
                    items: items
                });
            }
        }
        // Paragraphe
        else {
            blocks.push({
                type: 'paragraph',
                text: line
            });
        }
    });
    
    return blocks;
}

// ======================
// UTILITIES
// ======================

// Formater une date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Exporter les articles vers JSON
function exportArticlesToJSON(articles) {
    const data = {
        articles: articles,
        lastUpdate: new Date().toISOString()
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Télécharger automatiquement
    const a = document.createElement('a');
    a.href = url;
    a.download = 'articles.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ======================
// SETTINGS
// ======================

// Changer le mot de passe
function changePassword() {
    const oldPassword = prompt('Mot de passe actuel :');
    if (oldPassword !== ADMIN_CREDENTIALS.password) {
        alert('❌ Mot de passe incorrect');
        return;
    }
    
    const newPassword = prompt('Nouveau mot de passe :');
    const confirmPassword = prompt('Confirmer le nouveau mot de passe :');
    
    if (newPassword !== confirmPassword) {
        alert('❌ Les mots de passe ne correspondent pas');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('❌ Le mot de passe doit contenir au moins 6 caractères');
        return;
    }
    
    alert('⚠️ Pour changer le mot de passe, modifiez la variable ADMIN_CREDENTIALS dans backoffice.js');
}

// Exporter toutes les données
function exportData() {
    const data = {
        articles: getArticles(),
        games: getGames(),
        exportDate: new Date().toISOString()
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `leptitscore-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('✅ Données exportées avec succès !');
}

// Importer des données
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (data.articles) {
                    saveArticles(data.articles);
                }
                if (data.games) {
                    saveGames(data.games);
                }
                
                loadArticles();
                loadGames();
                loadDashboard();
                
                alert('✅ Données importées avec succès !');
            } catch (error) {
                alert('❌ Erreur lors de l\'import : ' + error.message);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Supprimer toutes les données
function clearAllData() {
    const confirmation = prompt('Tapez "SUPPRIMER" pour confirmer la suppression de toutes les données :');
    
    if (confirmation === 'SUPPRIMER') {
        localStorage.removeItem(STORAGE_KEYS.articles);
        localStorage.removeItem(STORAGE_KEYS.games);
        
        loadArticles();
        loadGames();
        loadDashboard();
        
        alert('🗑️ Toutes les données ont été supprimées');
    }
}

// Auto-générer le slug depuis le titre
document.getElementById('articleTitle')?.addEventListener('input', (e) => {
    const title = e.target.value;
    const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    
    document.getElementById('articleSlug').value = slug;
});
