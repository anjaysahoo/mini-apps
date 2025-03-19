class Product {
    static createProductCard(product) {
        return `
            <div class="product" data-id="${product.id}">
                <div class="product__image-container">
                    <img class="product__image" src="${product.image}" alt="${product.name}">
                    <button class="product__wishlist-btn">+</button>
                    ${product.discountPercent ? `
                        <div class="product__discount">${product.discountPercent}% off</div>
                    ` : ''}
                </div>
                <div class="product__info">
                    <h3 class="product__name">${product.name}</h3>
                    <p class="product__description">${product.description}</p>
                    <div class="product__quantity">${product.quantity}</div>
                    <div class="product__price">
                        <span class="product__price--current">₹${product.discountedPrice}</span>
                        <span class="product__price--original">₹${product.price}</span>
                    </div>
                    <button class="product__add-btn">Add</button>
                </div>
            </div>
        `;
    }
} 