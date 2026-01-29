// strapi-connector.js
// Connexion à l'API Strapi pour Le Ptit Score

class StrapiConnector {
    constructor(apiUrl = null) {
        // Détection automatique dev/prod
        this.apiUrl = apiUrl || this.getApiUrl();
    }

    // Détecter l'URL de l'API automatiquement
    getApiUrl() {
        const hostname = window.location.hostname;
        
        // Développement local
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:1337/api';
        }
        
        // Production - À MODIFIER avec votre URL Strapi
        // Exemple : return 'https://votre-strapi.strapiapp.com/api';
        return 'http://localhost:1337/api';
    }

    // Récupérer tous les articles
    async getArticles() {
        try {
            const url = `${this.apiUrl}/articles?populate=*&sort=publishedDate:desc`;
            console.log('📡 Chargement des articles depuis Strapi:', url);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Articles chargés:', data.data.length);
            
            // Transformer les données Strapi au format de l'app
            return data.data.map(item => this.transformArticle(item));
        } catch (error) {
            console.error('❌ Erreur lors du chargement des articles depuis Strapi:', error);
            return null; // Retourner null pour indiquer l'échec
        }
    }

    // Récupérer un article par son slug
    async getArticleBySlug(slug) {
        try {
            const url = `${this.apiUrl}/articles?filters[slug][$eq]=${slug}&populate=*`;
            console.log('📡 Chargement de l\'article:', slug);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.data.length > 0) {
                console.log('✅ Article trouvé:', data.data[0].attributes.title);
                return this.transformArticle(data.data[0]);
            }
            
            console.warn('⚠️ Article non trouvé:', slug);
            return null;
        } catch (error) {
            console.error('❌ Erreur lors du chargement de l\'article:', error);
            return null;
        }
    }

    // Récupérer les articles en vedette
    async getFeaturedArticles() {
        try {
            const url = `${this.apiUrl}/articles?filters[featured][$eq]=true&populate=*&sort=publishedDate:desc`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.data.map(item => this.transformArticle(item));
        } catch (error) {
            console.error('❌ Erreur lors du chargement des articles en vedette:', error);
            return [];
        }
    }

    // Rechercher des articles
    async searchArticles(query) {
        try {
            const url = `${this.apiUrl}/articles?filters[$or][0][title][$containsi]=${query}&filters[$or][1][excerpt][$containsi]=${query}&populate=*`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.data.map(item => this.transformArticle(item));
        } catch (error) {
            console.error('❌ Erreur lors de la recherche:', error);
            return [];
        }
    }

    // Transformer un article Strapi au format de l'app
    transformArticle(strapiArticle) {
        const attrs = strapiArticle.attributes;
        
        return {
            id: attrs.slug,
            title: attrs.title,
            icon: attrs.icon || '🎲',
            badge: attrs.badge || null,
            category: attrs.category || 'Actualités',
            date: attrs.publishedDate,
            readTime: attrs.readTime || '3 min de lecture',
            excerpt: attrs.excerpt,
            gradient: attrs.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            featured: attrs.featured || false,
            author: attrs.author || 'Rédaction Le Ptit Score',
            content: this.parseRichText(attrs.content),
            coverImage: this.getCoverImage(attrs.coverImage)
        };
    }

    // Convertir le rich text Strapi en blocs de contenu
    parseRichText(richText) {
        if (!richText) return [];
        
        // Si c'est déjà un tableau d'objets (format personnalisé)
        if (Array.isArray(richText)) {
            return richText;
        }
        
        // Si c'est du texte simple ou markdown
        if (typeof richText === 'string') {
            // Parser le texte en blocs
            const blocks = [];
            const lines = richText.split('\n\n');
            
            lines.forEach(line => {
                line = line.trim();
                if (!line) return;
                
                // Détecter les titres (##, ###, etc.)
                if (line.startsWith('###')) {
                    blocks.push({
                        type: 'heading',
                        level: 3,
                        text: line.replace(/^###\s*/, '')
                    });
                } else if (line.startsWith('##')) {
                    blocks.push({
                        type: 'heading',
                        level: 2,
                        text: line.replace(/^##\s*/, '')
                    });
                } 
                // Détecter les listes
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
                // Paragraphe normal
                else {
                    blocks.push({
                        type: 'paragraph',
                        text: line
                    });
                }
            });
            
            return blocks;
        }
        
        // Fallback : un seul paragraphe
        return [
            {
                type: 'paragraph',
                text: String(richText)
            }
        ];
    }

    // Obtenir l'image de couverture
    getCoverImage(coverImage) {
        if (!coverImage || !coverImage.data) {
            return null;
        }
        
        const imageData = coverImage.data;
        const attrs = imageData.attributes;
        
        return {
            url: this.getStrapiUrl(attrs.url),
            alt: attrs.alternativeText || attrs.name,
            formats: attrs.formats
        };
    }

    // Obtenir l'URL complète d'un média Strapi
    getStrapiUrl(path) {
        if (!path) return null;
        
        // Si c'est déjà une URL complète
        if (path.startsWith('http')) {
            return path;
        }
        
        // Ajouter l'URL de base
        const baseUrl = this.apiUrl.replace('/api', '');
        return `${baseUrl}${path}`;
    }

    // Formater la date
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

    // Vérifier si Strapi est accessible
    async checkConnection() {
        try {
            const response = await fetch(`${this.apiUrl}/articles?pagination[limit]=1`);
            return response.ok;
        } catch (error) {
            console.warn('⚠️ Strapi non accessible, utilisation du fallback JSON');
            return false;
        }
    }
}

// Instance globale
window.strapiConnector = new StrapiConnector();

// Log au chargement
console.log('🔌 Strapi Connector chargé, API URL:', window.strapiConnector.apiUrl);
