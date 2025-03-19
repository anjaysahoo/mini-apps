const helpers = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    formatPrice(price) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(price);
    },

    generateShareableLink(listName) {
        const baseUrl = window.location.origin;
        const encodedName = encodeURIComponent(listName);
        return `${baseUrl}/share-list/${encodedName}`;
    },

    copyToClipboard(text) {
        return navigator.clipboard.writeText(text)
            .then(() => true)
            .catch(() => false);
    }
};

// Add this to enable drag and drop functionality
class DragDrop {
    static init() {
        const items = document.querySelectorAll('.wishlist-modal__item');
        const lists = document.querySelectorAll('.wishlist-modal__list');

        items.forEach(item => {
            item.setAttribute('draggable', true);
            item.addEventListener('dragstart', DragDrop.handleDragStart);
            item.addEventListener('dragend', DragDrop.handleDragEnd);
        });

        lists.forEach(list => {
            list.addEventListener('dragover', DragDrop.handleDragOver);
            list.addEventListener('drop', DragDrop.handleDrop);
        });
    }

    static handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', JSON.stringify({
            itemId: e.target.dataset.id,
            sourceList: e.target.closest('.wishlist-modal__list').dataset.list
        }));
    }

    static handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    static handleDragOver(e) {
        e.preventDefault();
    }

    static handleDrop(e) {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const targetList = e.target.closest('.wishlist-modal__list').dataset.list;
        
        if (data.sourceList !== targetList) {
            const item = store.wishlists[data.sourceList].items
                .find(item => item.id === Number(data.itemId));
            
            if (item) {
                store.removeFromWishlist(data.sourceList, item.id);
                store.addToWishlist(targetList, item);
                document.dispatchEvent(new CustomEvent('wishlistsUpdated'));
            }
        }
    }
} 