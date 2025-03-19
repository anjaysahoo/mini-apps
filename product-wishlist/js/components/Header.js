class Header {
    constructor() {
        this.searchInput = document.querySelector('.header__search-input');
        this.menuBtn = document.querySelector('.header__menu-btn');
        this.backBtn = document.querySelector('.header__back-btn');
        this.init();
    }

    init() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.menuBtn.addEventListener('click', this.toggleWishlistPanel.bind(this));
        this.backBtn.addEventListener('click', () => window.history.back());
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const filteredProducts = store.products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        document.dispatchEvent(new CustomEvent('productsFiltered', { 
            detail: { products: filteredProducts }
        }));
    }

    toggleWishlistPanel() {
        document.dispatchEvent(new CustomEvent('toggleWishlist'));
    }
} 