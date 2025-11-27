// This file will be the single source of truth for product data.
import { saveImage } from './imageStore';

const MOCK_PRODUCT_DATA = [
    { id: 1, name: 'EX DISPLAY - MSI Pro 16', description: 'Flex-GD6AU GLB MULTITOUCH All-in-On..', price: 14990.00, oldPrice: 650.00, rating: 4, inStock: true, stock: 15 },
    { id: 2, name: 'EX DISPLAY - MSI Pro 16', description: 'Flex-GD6AU GLB MULTITOUCH All-in-On..', price: 14990.00, oldPrice: 650.00, rating: 5, inStock: true, stock: 5 },
    { id: 3, name: 'EX DISPLAY - MSI Pro 16', description: 'Flex-GD6AU GLB MULTITOUCH All-in-On..', price: 14990.00, oldPrice: 650.00, rating: 4, inStock: false, stock: 0 },
    { id: 4, name: 'EX DISPLAY - MSI Pro 16', description: 'Flex-GD6AU GLB MULTITOUCH All-in-On..', price: 14990.00, oldPrice: 650.00, rating: 4, inStock: true, stock: 25 },
    { id: 5, name: 'EX DISPLAY - MSI Pro 16', description: 'Flex-GD6AU GLB MULTITOUCH All-in-On..', price: 14990.00, oldPrice: 650.00, rating: 4, inStock: true, stock: 8 },
    { id: 6, name: 'EX DISPLAY - MSI Pro 16', description: 'Flex-GD6AU GLB MULTITOUCH All-in-On..', price: 14990.00, oldPrice: 650.00, rating: 4, inStock: false, stock: 0 },
];

const PRODUCTS_STORAGE_KEY = 'products';

/**
 * Initializes and retrieves the product list from localStorage.
 * If not present, it seeds localStorage with mock data.
 */
export const getProducts = () => {
    const productsJSON = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (productsJSON) {
        return JSON.parse(productsJSON);
    } else {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(MOCK_PRODUCT_DATA));
        return MOCK_PRODUCT_DATA;
    }
};

/**
 * Adds a new product to the list in localStorage.
 */
export const addProduct = (name, price, stock, description, imageBase64) => {
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name: name,
        description: description || 'No description available.',
        price: price,
        oldPrice: price * 1.2, // Mock old price
        rating: 4, // Default rating
        inStock: stock > 0,
        stock: stock,
        // imageUrl is no longer stored directly in the product object
    };

    const updatedProducts = [newProduct, ...products];
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));

    // Save the image separately to avoid bloating the main products list
    if (imageBase64) {
        saveImage(newProduct.id, imageBase64);
    }

    return newProduct;
};

/**
 * Deletes a product from the list in localStorage.
 * @param {number} productId - The ID of the product to delete.
 */
export const deleteProduct = (productId) => {
    let products = getProducts().filter(p => p.id !== productId);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};
