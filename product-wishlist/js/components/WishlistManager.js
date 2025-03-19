class WishlistManager {
    constructor() {
        this.modal = document.querySelector('.wishlist-modal');
        this.init();
    }

    init() {
        document.addEventListener('showWishlistModal', (e) => {
            this.showModal(e.detail.product);
        });
        document.addEventListener('toggleWishlist', () => {
            this.showWishlists();
        });
    }

    showModal(product) {
        const lists = Object.keys(store.wishlists);
        this.modal.innerHTML = `
            <div class="wishlist-modal__content">
                <div class="wishlist-modal__header">
                    <h3>Add to List</h3>
                    <button class="wishlist-modal__close-btn">Close</button>
                </div>
                <div class="wishlist-modal__lists">
                    ${lists.map(list => `
                        <button class="wishlist-modal__list-btn" data-list="${list}">
                            ${list}
                        </button>
                    `).join('')}
                </div>
                <button class="wishlist-modal__create-btn">+ Create New List</button>
            </div>
        `;
        this.modal.hidden = false;

        this.modal.querySelector('.wishlist-modal__close-btn')
            .addEventListener('click', () => this.modal.hidden = true);

        this.modal.querySelector('.wishlist-modal__create-btn')
            .addEventListener('click', () => new CreateWishlist().show());

        this.modal.querySelector('.wishlist-modal__lists')
            .addEventListener('click', (e) => {
                const btn = e.target.closest('.wishlist-modal__list-btn');
                if (!btn) return;
                store.addToWishlist(btn.dataset.list, product);
                this.modal.hidden = true;
            });
    }

    showWishlists() {
        const lists = Object.entries(store.wishlists);
        this.modal.innerHTML = `
            <div class="wishlist-modal__content">
            <div class="wishlist-modal__header">
                <h3>Quick Lists</h3>
                <button class="wishlist-modal__close-btn">Close</button>
            </div>
                <div class="wishlist-modal__lists">
                    ${lists.map(([name, list]) => `
                        <div class="wishlist-modal__list">
                            <div class="wishlist-modal__list-header">
                                <h4>${name}</h4>
                                ${list.isPublic ? 
                                    '<span class="wishlist-modal__share-icon">🔗</span>' : 
                                    '<span class="wishlist-modal__lock-icon">🔒</span>'
                                }
                            </div>
                            <div class="wishlist-modal__items">
                                ${list.items.map(item => `
                                    <div class="wishlist-modal__item">
                                        <img src="${item.image}" alt="${item.name}">
                                        <div class="wishlist-modal__item-info">
                                            <span>${item.name}</span>
                                            <span>₹${item.discountedPrice}</span>
                                        </div>
                                        <button class="wishlist-modal__remove-btn" 
                                                data-list="${name}" 
                                                data-id="${item.id}">×</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="wishlist-modal__create-btn">+ Create New List</button>
                
            </div>
        `;
        this.modal.hidden = false;
        this.addWishlistEventListeners();
    }

    addWishlistEventListeners() {
        this.modal.querySelector('.wishlist-modal__close-btn')
            .addEventListener('click', () => this.modal.hidden = true);

        this.modal.querySelector('.wishlist-modal__create-btn')
            .addEventListener('click', () => new CreateWishlist().show());

        this.modal.querySelectorAll('.wishlist-modal__remove-btn')
            .forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const { list, id } = e.target.dataset;
                    store.removeFromWishlist(list, Number(id));
                    this.showWishlists(); // Refresh the list
                });
            });

        this.modal.querySelectorAll('.wishlist-modal__share-icon')
            .forEach(icon => {
                icon.addEventListener('click', (e) => {
                    const listName = e.target.closest('.wishlist-modal__list')
                        .querySelector('h4').textContent;
                    // Implement sharing functionality here
                    alert(`Sharing link for ${listName} copied to clipboard!`);
                });
            });
    }
} 
