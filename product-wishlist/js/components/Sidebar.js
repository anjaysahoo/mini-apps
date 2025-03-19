class Sidebar {
    constructor() {
        this.container = document.querySelector('.categories');
        this.init();
    }

    init() {
        this.render();
        this.container.addEventListener('click', this.handleCategoryClick.bind(this));
    }

    render() {
        const categories = Array.from(store.categories);
        const html = categories.map(category => `
            <button class="categories__btn ${store.selectedCategory === category ? 'categories__btn--active' : ''}" 
                    data-category="${category}">
                <div class="categories__icon">
                    <img src="assets/icons/${category.toLowerCase()}.png" alt="${category}">
                </div>
                <span class="categories__text">${category}</span>
            </button>
        `).join('');
        
        this.container.innerHTML = html;
    }

    handleCategoryClick(e) {
        const btn = e.target.closest('.categories__btn');
        if (!btn) return;

        const category = btn.dataset.category;
        store.selectedCategory = category;
        this.render();

        const filteredProducts = category === null 
            ? store.products 
            : store.products.filter(p => p.category === category);

        document.dispatchEvent(new CustomEvent('productsFiltered', { 
            detail: { products: filteredProducts }
        }));
    }
} 