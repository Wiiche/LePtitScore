// articles-manager.js
// Système de gestion d'articles dynamique pour Le Ptit Score

class ArticlesManager {
    constructor(articlesJsonPath = 'articles.json') {
        this.articlesJsonPath = articlesJsonPath;
        this.articles = [];
        this.currentArticle = null;
    }

    // Charger les articles depuis le fichier JSON
    async loadArticles() {
        try {
            // PRIORITÉ 1 : Essayer de charger depuis Strapi
            if (window.strapiConnector) {
                console.log('🔄 Tentative de chargement depuis Strapi...');
                const strapiArticles = await window.strapiConnector.getArticles();
                
                if (strapiArticles && strapiArticles.length > 0) {
                    console.log('✅ Articles chargés depuis Strapi:', strapiArticles.length);
                    this.articles = strapiArticles;
                    return this.articles;
                }
            }
            
            // PRIORITÉ 2 : Fallback sur le fichier JSON local
            console.log('📄 Chargement depuis articles.json (fallback)...');
            const response = await fetch(this.articlesJsonPath);
            const data = await response.json();
            this.articles = data.articles;
            console.log('✅ Articles chargés depuis JSON:', this.articles.length);
            return this.articles;
        } catch (error) {
            console.error('❌ Erreur lors du chargement des articles:', error);
            // PRIORITÉ 3 : Articles en dur si tout échoue
            console.log('⚠️ Utilisation des articles de secours');
            return this.getFallbackArticles();
        }
    }

    // Articles de secours (en cas d'échec du chargement du JSON)
    getFallbackArticles() {
        return [
            {
                id: 'dune-imperium',
                title: 'Dune: Imperium arrive enfin en français !',
                icon: '🎲',
                badge: '🔥 Nouveauté',
                category: 'Sorties',
                date: '2026-01-24',
                readTime: '4 min de lecture',
                excerpt: 'La version française du hit de deck-building sera disponible dès février 2026.',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                featured: true
            }
        ];
    }

    // Obtenir un article par son ID
    getArticleById(id) {
        return this.articles.find(article => article.id === id);
    }

    // Obtenir les articles en vedette
    getFeaturedArticles() {
        return this.articles.filter(article => article.featured);
    }

    // Obtenir les articles récents (limité à n)
    getRecentArticles(limit = 3) {
        return this.articles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // Formater la date de l'article
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return "Hier";
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        if (diffDays < 14) return "Il y a 1 semaine";
        if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
        return `Il y a ${Math.floor(diffDays / 30)} mois`;
    }

    // Rendre le contenu d'un article (converti du JSON en HTML)
    renderArticleContent(content) {
        let html = '';

        content.forEach(block => {
            switch (block.type) {
                case 'paragraph':
                    html += `<p class="news-modal-content-text">${block.text}</p>`;
                    break;

                case 'heading':
                    const level = block.level || 3;
                    html += `<h${level}>${block.text}</h${level}>`;
                    break;

                case 'list':
                    html += '<ul>';
                    block.items.forEach(item => {
                        html += `<li>${item}</li>`;
                    });
                    html += '</ul>';
                    break;

                case 'image':
                    html += `<img src="${block.src}" alt="${block.alt || ''}" class="news-modal-image">`;
                    break;

                case 'quote':
                    html += `<blockquote class="news-modal-quote">${block.text}</blockquote>`;
                    break;

                default:
                    console.warn('Type de bloc inconnu:', block.type);
            }
        });

        return html;
    }

    // Générer le HTML d'une carte d'article pour la page d'accueil
    renderArticleCard(article) {
        const featuredClass = article.featured ? 'featured' : '';
        const badgeHtml = article.badge 
            ? `<div class="news-badge">${article.badge}</div>` 
            : '';

        return `
            <div class="news-card ${featuredClass}" onclick="showNewsArticle('${article.id}')">
                ${badgeHtml}
                <div class="news-image" style="background: ${article.gradient};">
                    <div class="news-image-text">${article.icon}</div>
                </div>
                <div class="news-content">
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-excerpt">${article.excerpt}</p>
                    <div class="news-meta">
                        <span class="news-date">${this.formatDate(article.date)}</span>
                        <span class="news-category">${article.category}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Afficher tous les articles dans un conteneur
    async displayArticles(containerId = 'newsGrid') {
        await this.loadArticles();
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Conteneur ${containerId} introuvable`);
            return;
        }

        const articlesHtml = this.articles.map(article => 
            this.renderArticleCard(article)
        ).join('');

        container.innerHTML = articlesHtml;
    }

    // Ouvrir la modale d'un article
    openArticleModal(articleId) {
        const article = this.getArticleById(articleId);
        if (!article) {
            console.error('Article introuvable:', articleId);
            return;
        }

        this.currentArticle = article;

        // Mettre à jour les éléments de la modale
        document.getElementById('newsModalIcon').textContent = article.icon;
        document.getElementById('newsModalTitle').textContent = article.title;
        document.getElementById('newsModalExcerpt').textContent = article.excerpt;
        document.getElementById('newsModalDate').textContent = this.formatDate(article.date);
        document.getElementById('newsModalCategory').textContent = article.category;
        document.getElementById('newsModalReadTime').textContent = article.readTime;
        document.getElementById('newsModalContent').innerHTML = this.renderArticleContent(article.content);
        document.getElementById('newsModalHeaderBg').style.background = article.gradient;

        // Badge
        const badge = document.getElementById('newsModalBadge');
        if (article.badge) {
            badge.textContent = article.badge;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }

        // Afficher la modale
        document.getElementById('newsModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Exporter l'instance globale
window.articlesManager = new ArticlesManager();

// Fonction globale pour ouvrir un article (appelée depuis le onclick)
function showNewsArticle(articleId) {
    window.articlesManager.openArticleModal(articleId);
}

// Fonction pour fermer la modale (déjà existante dans votre code)
function closeNewsModal() {
    document.getElementById('newsModal').classList.remove('active');
    document.body.style.overflow = '';
    window.articlesManager.currentArticle = null;
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    // Charger et afficher les articles
    await window.articlesManager.displayArticles('newsGrid');
});
