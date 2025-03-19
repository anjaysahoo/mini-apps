class ProductList {
    constructor() {
        this.container = document.querySelector('.products');
        this.init();
    }

    init() {
        document.addEventListener('productsFiltered', (e) => {
            this.render(e.detail.products);
        });
        
        this.container.addEventListener('click', this.handleProductClick.bind(this));
    }

    render(products) {
        this.container.innerHTML = products
            .map(product => Product.createProductCard(product))
            .join('');
    }

    handleProductClick(e) {
        const wishlistBtn = e.target.closest('.product__wishlist-btn');
        if (!wishlistBtn) return;

        const productEl = wishlistBtn.closest('.product');
        const productId = Number(productEl.dataset.id);
        const product = store.products.find(p => p.id === productId);

        document.dispatchEvent(new CustomEvent('showWishlistModal', { 
            detail: { product }
        }));
    }
} 