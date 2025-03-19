class Store {
    constructor() {
        this.products = [];
        this.categories = new Set();
        this.wishlists = this.loadWishlists();
        this.selectedCategory = null;
        this.activeTab = 'suggestions';
    }

    loadWishlists() {
        const saved = localStorage.getItem('wishlists');
        return saved ? JSON.parse(saved) : {
            'Suggested List': { items: [], isPublic: false },
            'Weekly List': { items: [], isPublic: false }
        };
    }

    saveWishlists() {
        localStorage.setItem('wishlists', JSON.stringify(this.wishlists));
    }

    addToWishlist(listName, product) {
        if (!this.wishlists[listName]) {
            this.wishlists[listName] = { items: [], isPublic: false };
        }
        if (!this.wishlists[listName].items.find(item => item.id === product.id)) {
            this.wishlists[listName].items.push(product);
            this.saveWishlists();
        }
    }

    removeFromWishlist(listName, productId) {
        if (this.wishlists[listName]) {
            this.wishlists[listName].items = this.wishlists[listName].items
                .filter(item => item.id !== productId);
            this.saveWishlists();
        }
    }

    setProducts(products) {
        this.products = products;
        this.categories = new Set(products.map(p => p.category));
    }
}

const store = new Store(); 