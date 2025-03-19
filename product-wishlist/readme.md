### Product Wishlist 

## **Problem Description**

You are required to build a quick commerce mobile compatible UI that allows users to browse  
products, filter them based on categories, and manage their wishlists. The application should  
have a clean UI, efficient state management, and an interactive user experience.

Products data: [https://www.jsonkeeper.com/b/H77S](https://www.jsonkeeper.com/b/H77S)  

### **Features & Requirements**

#### **1\. Product Browsing**

* Users should be able to view a list of products, each displaying:
    * Product Image
    * Name & Description
    * Price & Discounted Price
    * Weight/Quantity
    * Offer/Discount %
    * "Add to Wishlist" icon
    * “Add to Cart” button (non-interactive)
* The product list section should be independently scrollable.

#### **2\. Category Filtering**

* The application should have a category sidebar where users can select a category to filter products.
* Category sidebar should be independently scrollable.
* Selecting a category should dynamically update the product list.

#### **3\. Wishlist Management**

* Users can add products to one or more wishlists by clicking on the “Add to Wishlist” icon.
* Users can view their wishlists and create new ones.
* A user can have multiple wishlists (e.g., "Weekly Groceries", "Favorites").
* Users can remove items from a wishlist.

#### **4\. Navigation & UI**

* A **back button** should allow users to return to the previous view.
* A **tab-based navigation** should let users switch between "Quick List" and "Suggestions".
* **“Suggestions” tab is dummy and out of the scope of this problem statement. Clicking on it should render a simple “\<div\>suggestions\</div\>” text on the screen.**

### **Good to have features**

- Option to make a wishlist public/private

### **Bonus Features (Optional)**

* A **search bar** should allow users to search for products by name.
* Implement localStorage to persist the wishlist.
* Add **drag-and-drop** functionality to move items between different wishlists

### **Points to Consider**

* Modularity and performance should be key considerations in the design and implementation of the solution.
* The solution should be coded in vanilla JavaScript and CSS, without the use of plugins or libraries like jQuery, React, Angular, or Bootstrap. Tooling such as webpack, grunt, or gulp may be used.
* Data can be stored in a JSON file or an in-memory object.
* The app should be responsive and user-friendly.
* Code should be modular and follow best practices (separation of concerns).
* The final solution should work without errors.
* Solution should match the visual design to evaluate CSS knowledge.

### **Evaluation Criteria**

* Understanding of the problem statement.
* Explanation of the principle and approach taken for the solution.
* Correctness and completeness of the solution.
* Code design and quality.
* Optimal data structure.
* Visual aesthetics (UI should closely match the given design).
* Technology choices (e.g., ES 6/7 over ES 5, usage of latest CSS attributes, semantic HTML elements).


### API Response
```json
[
{
"id": 1,
"name": "Fresh Red Tomatoes",
"description": "Juicy, ripe red tomatoes perfect for salads and sauces.",
"category": "Vegetables",
"price": 40,
"discountedPrice": 30,
"discountPercent": 25,
"quantity": "500g",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
"attributes": {
"organic": true,
"freshness": "Very Fresh",
"origin": "Local Farm"
}
},
{
"id": 2,
"name": "Crisp Cucumbers",
"description": "Fresh and crunchy cucumbers, ideal for salads and pickling.",
"category": "Vegetables",
"price": 30,
"discountedPrice": 25,
"discountPercent": 16,
"quantity": "1 kg",
"image": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Cucumber_plants.jpg",
"attributes": {
"organic": false,
"freshness": "Fresh",
"origin": "Hydroponic Farm"
}
},
{
"id": 3,
"name": "Organic Carrots",
"description": "Sweet and crunchy organic carrots, rich in beta-carotene.",
"category": "Vegetables",
"price": 50,
"discountedPrice": 40,
"discountPercent": 20,
"quantity": "500g",
"image": "https://upload.wikimedia.org/wikipedia/commons/2/22/Carrots_at_a_farmers_market_in_the_Villages_Florida.png",
"attributes": {
"organic": true,
"freshness": "Very Fresh",
"origin": "Organic Farm"
}
},
{
"id": 4,
"name": "Green Spinach",
"description": "Leafy green spinach, packed with iron and vitamins.",
"category": "Vegetables",
"price": 35,
"discountedPrice": 30,
"discountPercent": 14,
"quantity": "250g",
"image": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Spinazie_vrouwelijke_plant_%28Spinacia_oleracea_female_plant%29.jpg",
"attributes": {
"organic": true,
"freshness": "Fresh",
"origin": "Local Farm"
}
},
{
"id": 5,
"name": "Mixed Bell Peppers",
"description": "A colorful mix of red, yellow, and green bell peppers.",
"category": "Vegetables",
"price": 80,
"discountedPrice": 70,
"discountPercent": 12,
"quantity": "3 pieces",
"image": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Red_bell_pepper.jpg",
"attributes": {
"organic": false,
"freshness": "Fresh",
"origin": "Imported"
}
},
{
"id": 6,
"name": "Fresh Broccoli",
"description": "Nutrient-rich broccoli, great for steaming and stir-fries.",
"category": "Vegetables",
"price": 90,
"discountedPrice": 80,
"discountPercent": 11,
"quantity": "1 piece",
"image": "https://upload.wikimedia.org/wikipedia/commons/0/03/Broccoli_and_cross_section_edit.jpg",
"attributes": {
"organic": true,
"freshness": "Very Fresh",
"origin": "Hydroponic Farm"
}
},
{
"id": 7,
"name": "Purple Eggplants",
"description": "Glossy purple eggplants, ideal for grilling and curries.",
"category": "Vegetables",
"price": 45,
"discountedPrice": 38,
"discountPercent": 15,
"quantity": "500g",
"image": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Aubergine.jpg",
"attributes": {
"organic": false,
"freshness": "Fresh",
"origin": "Local Market"
}
},
{
"id": 8,
"name": "Cauliflower",
"description": "Fresh white cauliflower, perfect for roasting and curries.",
"category": "Vegetables",
"price": 55,
"discountedPrice": 50,
"discountPercent": 9,
"quantity": "1 piece",
"image": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Chou-fleur_02.jpg",
"attributes": {
"organic": false,
"freshness": "Fresh",
"origin": "Local Farm"
}
},
{
"id": 9,
"name": "Green Zucchini",
"description": "Tender green zucchini, versatile for various dishes.",
"category": "Vegetables",
"price": 70,
"discountedPrice": 60,
"discountPercent": 14,
"quantity": "1 piece",
"image": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Zuchinni_1107.jpg",
"attributes": {
"organic": true,
"freshness": "Very Fresh",
"origin": "Imported"
}
},
{
"id": 10,
"name": "Fresh Green Beans",
"description": "Crisp green beans, perfect for steaming and salads.",
"category": "Vegetables",
"price": 50,
"discountedPrice": 42,
"discountPercent": 16,
"quantity": "250g",
"image": "https://upload.wikimedia.org/wikipedia/commons/4/4a/38_-_CIMG1598.JPG",
"attributes": {
"organic": true,
"freshness": "Fresh",
"origin": "Local Farm"
}
},
{
"id": 11,
"name": "Fresh Red Apples",
"description": "Crisp and juicy red apples, perfect for snacking.",
"category": "Fruits",
"price": 150,
"discountedPrice": 120,
"discountPercent": 20,
"quantity": "1 kg",
"image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
"attributes": {
"organic": true,
"freshness": "Very Fresh",
"origin": "Local Orchard"
}
}
]
```
