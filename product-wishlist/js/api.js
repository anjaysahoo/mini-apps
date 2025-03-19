class API {
    static BASE_URL = 'https://www.jsonkeeper.com/b/H77S';

    static async fetchProducts() {
        try {
            const response = await fetch(this.BASE_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }
} 