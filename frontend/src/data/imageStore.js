// This file manages image data in localStorage to avoid exceeding quota.

const IMAGE_PREFIX = 'product_image_';

/**
 * Saves an image's Base64 data to a unique key in localStorage.
 * @param {number} productId - The ID of the product.
 * @param {string} imageBase64 - The Base64 string of the image.
 */
export const saveImage = (productId, imageBase64) => {
    if (!imageBase64) return;
    localStorage.setItem(`${IMAGE_PREFIX}${productId}`, imageBase64);
};

/**
 * Retrieves an image's Base64 data from localStorage.
 * @param {number} productId - The ID of the product.
 * @returns {string|null} The Base64 string or null if not found.
 */
export const getImage = (productId) => {
    return localStorage.getItem(`${IMAGE_PREFIX}${productId}`);
};