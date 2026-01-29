// admin.js - Gestion de l'interface d'administration

let articles = [];
let blockCounter = 0;

// Charger les articles existants depuis le localStorage
function loadArticles() {
    const stored = localStorage.getItem('adminArticles');
    if (stored) {
        articles = JSON.parse(stored);
        renderArticlesList();
    }
}

// Sauvegarder les articles dans le localStorage
function saveArticles() {
    localStorage.setItem('adminArticles', JSON.stringify(articles));
    renderArticlesList();
}

// Générer un ID unique à partir du titre
function generateId(title) {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Retirer les accents
        .replace(/[^a-z0-9]+/g, '-') // Remplacer les caractères spéciaux par des tirets
        .replace(/^-+|-+$/g, ''); // Retirer les tirets en début/fin
}

// Auto-générer l'ID quand le titre change
document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('articleTitle');
    const idInput = document.getElementById('articleId');
    
    titleInput.addEventListener('input', (e) => {
        idInput.value = generateId(e.target.value);
    });

    // Compter les caractères du résumé
    const excerptInput = document.getElementById('articleExcerpt');
    const excerptCount = document.getElementById('excerptCount');
    
    excerptInput.addEventListener('input', (e) => {
        const remaining = 150 - e.target.value.length;
        excerptCount.textContent = remaining;
    });

    // Date du jour par défaut
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('articleDate').value = today;

    // Gestionnaires pour les icônes
    document.querySelectorAll('.icon-option').forEach(icon => {
        icon.addEventListener('click', function() {
            document.querySelectorAll('.icon-option').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('articleIcon').value = this.dataset.icon;
        });
    });

    // Gestionnaires pour les gradients
    document.querySelectorAll('.gradient-option').forEach(gradient => {
        gradient.addEventListener('click', function() {
            document.querySelectorAll('.gradient-option').forEach(g => g.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('articleGradient').value = this.dataset.gradient;
        });
    });

    // Ajouter un bloc paragraphe par défaut
    addBlock('paragraph');

    // Charger les articles existants
    loadArticles();

    // Soumettre le formulaire
    document.getElementById('articleForm').addEventListener('submit', handleSubmit);
});

// Ajouter un bloc de contenu
function addBlock(type) {
    blockCounter++;
    const container = document.getElementById('contentBlocks');
    const blockId = `block-${blockCounter}`;
    
    let blockHtml = '';
    
    switch(type) {
        case 'paragraph':
            blockHtml = `
                <div class="content-block" id="${blockId}">
                    <div class="content-block-header">
                        <span class="content-block-type">📝 Paragraphe</span>
                        <div class="content-block-actions">
                            <button type="button" class="btn btn-danger btn-small" onclick="removeBlock('${blockId}')">Supprimer</button>
                        </div>
                    </div>
                    <textarea class="block-content" placeholder="Contenu du paragraphe... Vous pouvez utiliser <strong>gras</strong> et <em>italique</em>" rows="4"></textarea>
                    <input type="hidden" class="block-type" value="paragraph">
                </div>
            `;
            break;
            
        case 'heading':
            blockHtml = `
                <div class="content-block" id="${blockId}">
                    <div class="content-block-header">
                        <span class="content-block-type">📌 Titre</span>
                        <div class="content-block-actions">
                            <select class="block-level" style="padding: 4px 8px; border-radius: 5px; border: 1px solid #ddd; margin-right: 5px;">
                                <option value="2">Titre H2</option>
                                <option value="3" selected>Titre H3</option>
                                <option value="4">Titre H4</option>
                            </select>
                            <button type="button" class="btn btn-danger btn-small" onclick="removeBlock('${blockId}')">Supprimer</button>
                        </div>
                    </div>
                    <input type="text" class="block-content" placeholder="Texte du titre" style="width: 100%; padding: 10px; border: 2px solid #e8ecf1; border-radius: 8px;">
                    <input type="hidden" class="block-type" value="heading">
                </div>
            `;
            break;
            
        case 'list':
            blockHtml = `
                <div class="content-block" id="${blockId}">
                    <div class="content-block-header">
                        <span class="content-block-type">📋 Liste</span>
                        <div class="content-block-actions">
                            <button type="button" class="btn btn-danger btn-small" onclick="removeBlock('${blockId}')">Supprimer</button>
                        </div>
                    </div>
                    <div class="list-items">
                        <input type="text" class="list-item" placeholder="Élément 1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 5px;">
                        <input type="text" class="list-item" placeholder="Élément 2" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 5px;">
                        <input type="text" class="list-item" placeholder="Élément 3" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 5px;">
                    </div>
                    <button type="button" class="btn btn-secondary btn-small" onclick="addListItem('${blockId}')" style="margin-top: 5px;">+ Ajouter un élément</button>
                    <input type="hidden" class="block-type" value="list">
                </div>
            `;
            break;
    }
    
    container.insertAdjacentHTML('beforeend', blockHtml);
}

// Supprimer un bloc
function removeBlock(blockId) {
    const block = document.getElementById(blockId);
    if (block) {
        block.remove();
    }
}

// Ajouter un élément à une liste
function addListItem(blockId) {
    const block = document.getElementById(blockId);
    const listItems = block.querySelector('.list-items');
    const newItem = document.createElement('input');
    newItem.type = 'text';
    newItem.className = 'list-item';
    newItem.placeholder = `Élément ${listItems.children.length + 1}`;
    newItem.style.cssText = 'width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 5px;';
    listItems.appendChild(newItem);
}

// Gérer la soumission du formulaire
function handleSubmit(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const article = {
        id: document.getElementById('articleId').value,
        title: document.getElementById('articleTitle').value,
        icon: document.getElementById('articleIcon').value,
        badge: document.getElementById('articleBadge').value || null,
        category: document.getElementById('articleCategory').value,
        date: document.getElementById('articleDate').value,
        readTime: document.getElementById('articleReadTime').value,
        excerpt: document.getElementById('articleExcerpt').value,
        gradient: document.getElementById('articleGradient').value,
        featured: document.getElementById('articleFeatured').checked,
        author: "Rédaction Le Ptit Score",
        content: []
    };
    
    // Récupérer les blocs de contenu
    const blocks = document.querySelectorAll('.content-block');
    blocks.forEach(block => {
        const type = block.querySelector('.block-type').value;
        
        if (type === 'paragraph') {
            const text = block.querySelector('.block-content').value;
            if (text.trim()) {
                article.content.push({
                    type: 'paragraph',
                    text: text
                });
            }
        } else if (type === 'heading') {
            const text = block.querySelector('.block-content').value;
            const level = parseInt(block.querySelector('.block-level').value);
            if (text.trim()) {
                article.content.push({
                    type: 'heading',
                    level: level,
                    text: text
                });
            }
        } else if (type === 'list') {
            const items = Array.from(block.querySelectorAll('.list-item'))
                .map(input => input.value)
                .filter(value => value.trim());
            if (items.length > 0) {
                article.content.push({
                    type: 'list',
                    items: items
                });
            }
        }
    });
    
    // Vérifier qu'il y a du contenu
    if (article.content.length === 0) {
        alert('⚠️ Veuillez ajouter au moins un bloc de contenu à votre article.');
        return;
    }
    
    // Ajouter l'article
    articles.push(article);
    saveArticles();
    
    // Afficher un message de succès
    const successAlert = document.getElementById('successAlert');
    successAlert.classList.add('show');
    setTimeout(() => {
        successAlert.classList.remove('show');
    }, 3000);
    
    // Réinitialiser le formulaire
    document.getElementById('articleForm').reset();
    document.getElementById('contentBlocks').innerHTML = '';
    blockCounter = 0;
    addBlock('paragraph');
    
    // Remettre la date du jour
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('articleDate').value = today;
    
    // Remettre les sélections par défaut
    document.querySelectorAll('.icon-option').forEach(i => i.classList.remove('selected'));
    document.querySelector('.icon-option').classList.add('selected');
    document.getElementById('articleIcon').value = '🎲';
    
    document.querySelectorAll('.gradient-option').forEach(g => g.classList.remove('selected'));
    document.querySelector('.gradient-option').classList.add('selected');
}

// Afficher la liste des articles
function renderArticlesList() {
    const container = document.getElementById('articlesList');
    
    if (articles.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">Aucun article pour le moment. Créez-en un !</p>';
        return;
    }
    
    const articlesHtml = articles.map((article, index) => {
        const featuredBadge = article.featured ? '<span class="badge badge-featured">En vedette</span>' : '';
        return `
            <div class="article-item">
                <div class="article-info">
                    <div class="article-title">
                        ${article.icon} ${article.title}
                        ${featuredBadge}
                    </div>
                    <div class="article-meta">
                        ${article.category} • ${article.date} • ${article.content.length} blocs
                    </div>
                </div>
                <div class="article-actions">
                    <button class="btn btn-secondary btn-small" onclick="previewArticle(${index})">👁️ Voir</button>
                    <button class="btn btn-danger btn-small" onclick="deleteArticle(${index})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = articlesHtml;
}

// Supprimer un article
function deleteArticle(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        articles.splice(index, 1);
        saveArticles();
    }
}

// Prévisualiser un article
function previewArticle(index) {
    const article = articles[index];
    const contentHtml = article.content.map(block => {
        switch(block.type) {
            case 'paragraph':
                return `<p>${block.text}</p>`;
            case 'heading':
                return `<h${block.level}>${block.text}</h${block.level}>`;
            case 'list':
                return `<ul>${block.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
            default:
                return '';
        }
    }).join('');
    
    const previewWindow = window.open('', 'preview', 'width=800,height=600');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${article.title}</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    max-width: 700px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    line-height: 1.6;
                }
                .header {
                    background: ${article.gradient};
                    color: white;
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                }
                h1 {
                    margin: 0;
                }
                .meta {
                    margin-top: 10px;
                    opacity: 0.9;
                }
                .excerpt {
                    background: #f5f7fa;
                    padding: 20px;
                    border-radius: 10px;
                    border-left: 4px solid #4a90e2;
                    margin-bottom: 30px;
                }
                h2, h3, h4 {
                    margin-top: 30px;
                    margin-bottom: 15px;
                    color: #2c3e50;
                }
                p {
                    margin-bottom: 20px;
                }
                ul {
                    margin-bottom: 20px;
                    margin-left: 25px;
                }
                li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="icon">${article.icon}</div>
                <h1>${article.title}</h1>
                <div class="meta">${article.category} • ${article.date} • ${article.readTime}</div>
            </div>
            <div class="excerpt">${article.excerpt}</div>
            <div class="content">${contentHtml}</div>
        </body>
        </html>
    `);
}

// Télécharger le fichier JSON
function downloadJSON() {
    if (articles.length === 0) {
        alert('⚠️ Aucun article à exporter. Créez-en au moins un !');
        return;
    }
    
    const jsonData = {
        articles: articles
    };
    
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'articles.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ Fichier articles.json téléchargé ! Remplacez-le sur votre serveur pour mettre à jour les articles.');
}
