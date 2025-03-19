class App {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize store with products
        const products = await API.fetchProducts();
        store.setProducts(products);

        // Initialize components
        new Header();
        new Sidebar();
        new ProductList();
        new WishlistManager();

        // Initial render
        document.dispatchEvent(new CustomEvent('productsFiltered', {
            detail: { products: store.products }
        }));

        // Handle tab switching
        this.initTabs();
    }

    initTabs() {
        const tabsContainer = document.querySelector('.tabs');
        const tabs = tabsContainer.querySelectorAll('.tabs__btn');

        tabsContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.tabs__btn');
            if (!tab) return;

            tabs.forEach(t => t.classList.remove('tabs__btn--active'));
            tab.classList.add('tabs__btn--active');

            const tabName = tab.dataset.tab;
            if (tabName === 'suggestions') {
                document.dispatchEvent(new CustomEvent('productsFiltered', {
                    detail: { products: store.products }
                }));
            } else {
                // Show Quick List view
                document.dispatchEvent(new CustomEvent('toggleWishlist'));
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 