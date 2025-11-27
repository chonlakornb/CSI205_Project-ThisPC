// This file will manage order data.
import { getCurrentUser } from './user';

const ORDERS_STORAGE_KEY = 'all_orders';

/**
 * Retrieves all orders from storage.
 * @returns {Array} An array of all order objects.
 */
export const getAllOrders = () => {
    const ordersJSON = localStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersJSON ? JSON.parse(ordersJSON) : [];
};

/**
 * Retrieves all orders for the currently logged-in user.
 * @returns {Array} The array of order objects.
 */
export const getOrders = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const allOrders = getAllOrders();
    return allOrders.filter(order => order.userEmail === currentUser.email);
};

/**
 * Adds a new order to the user's order history.
 * @param {Object} orderDetails - The details of the order to add.
 * @returns {Object} The newly created order object.
 */
export const addOrder = (orderDetails) => {
    const allOrders = getAllOrders();
    const currentUser = getCurrentUser();

    const newOrder = {
        id: `THPC-${new Date().getFullYear()}-${(allOrders.length + 1).toString().padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        userEmail: currentUser ? currentUser.email : 'guest', // Tag order with user email or 'guest'
        ...orderDetails,
    };

    const updatedOrders = [newOrder, ...allOrders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    return newOrder;
};

/**
 * Retrieves a single order by its ID for the current user.
 * @param {string} orderId - The ID of the order to retrieve.
 * @returns {Object|null} The order object or null if not found.
 */
export const getOrderById = (orderId) => {
    const currentUser = getCurrentUser();
    const allOrders = getAllOrders();
    const order = allOrders.find(o => o.id === orderId);

    if (!order) return null;

    // Admin and Staff can see any order. Regular users can only see their own.
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff' || order.userEmail === currentUser.email)) {
        return order;
    }

    return null;
};

/**
 * Updates the status of a specific order.
 * @param {string} orderId - The ID of the order to update.
 * @param {string} newStatus - The new status for the order.
 */
export const updateOrderStatus = (orderId, newStatus) => {
    const allOrders = getAllOrders();
    const updatedOrders = allOrders.map(order => {
        if (order.id === orderId) {
            return { ...order, status: newStatus };
        }
        return order;
    });
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
};