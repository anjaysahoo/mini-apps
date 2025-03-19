class CreateWishlist {
    constructor() {
        this.modal = document.querySelector('.wishlist-modal');
    }

    show() {
        this.modal.innerHTML = `
            <div class="wishlist-modal__content">
                <h3>Create New List</h3>
                <div class="wishlist-modal__form">
                    <input type="text" 
                           class="wishlist-modal__input" 
                           placeholder="Enter list name">
                    <label class="wishlist-modal__toggle">
                        <span>Public</span>
                        <input type="checkbox" class="wishlist-modal__public" hidden>
                        <span class="wishlist-modal__slider"></span>
                    </label>
                </div>
                <div class="wishlist-modal__actions">
                    <button class="wishlist-modal__create">Create</button>
                    <button class="wishlist-modal__close">Close</button>
                </div>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const closeBtn = this.modal.querySelector('.wishlist-modal__close');
        const createBtn = this.modal.querySelector('.wishlist-modal__create');
        const input = this.modal.querySelector('.wishlist-modal__input');
        const publicToggle = this.modal.querySelector('.wishlist-modal__public');

        closeBtn.addEventListener('click', () => this.modal.hidden = true);
        createBtn.addEventListener('click', () => {
            const name = input.value.trim();
            if (name) {
                store.wishlists[name] = {
                    items: [],
                    isPublic: publicToggle.checked
                };
                store.saveWishlists();
                this.modal.hidden = true;
            }
        });
    }
} 