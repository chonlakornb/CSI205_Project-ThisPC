// This file will manage all user-related data and authentication logic.
import { mergeGuestCart } from './cart';

const MOCK_USERS_DATA = [
    {
        email: 'admin@thispc.com',
        password: '123', // In a real app, this would be hashed
        name: 'Admin User',
        role: 'admin',
        profileImageUrl: 'https://i.pravatar.cc/40?u=admin@thispc.com',
        address: { street: '1 Admin Way', city: 'Adminville', state: 'State', zip: '10001', country: 'Thailand' }
    },
    {
        email: 'staff@thispc.com',
        password: '123',
        name: 'Staff User',
        role: 'staff',
        profileImageUrl: 'https://i.pravatar.cc/40?u=staff@thispc.com',
        address: null
    },
    {
        email: 'customer@example.com',
        password: '123',
        name: 'Chonlakorn B.',
        role: 'customer',
        profileImageUrl: 'https://i.pravatar.cc/40?u=customer@example.com',
        address: { street: '123 Customer Lane', city: 'Bangkok', state: 'BKK', zip: '10210', country: 'Thailand' }
    }
];

const USERS_STORAGE_KEY = 'users_db';
const CURRENT_USER_KEY = 'user';

/**
 * Initializes and retrieves the user list from localStorage.
 */
const getUsers = () => {
    const usersJSON = localStorage.getItem(USERS_STORAGE_KEY);
    if (usersJSON) {
        return JSON.parse(usersJSON);
    } else {
        // Seed with mock data if no users exist
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(MOCK_USERS_DATA));
        return MOCK_USERS_DATA;
    }
};

/**
 * Retrieves the currently logged-in user from localStorage.
 */
export const getCurrentUser = () => {
    const userJSON = localStorage.getItem(CURRENT_USER_KEY);
    return userJSON ? JSON.parse(userJSON) : null;
};

/**
 * Simulates user login.
 * @returns {Object|null} The user object if login is successful, otherwise null.
 */
export const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user && user.password === password) { // Simple password check for mock
        const { password: _, ...userToStore } = user; // Don't store password in session
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));
        mergeGuestCart(userToStore.email);
        return userToStore;
    }
    return null;
};

/**
 * Simulates user registration.
 * @returns {Object|null} The new user object if registration is successful, otherwise null.
 */
export const register = (name, email, password) => {
    const users = getUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        alert('This email is already registered.');
        return null;
    }

    const newUser = {
        name,
        email,
        password, // In a real app, hash this
        role: 'customer',
        profileImageUrl: `https://i.pravatar.cc/40?u=${email}`,
        address: null
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Automatically log in the new user
    const { password: _, ...userToStore } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));
    
    return userToStore;
};

/**
 * Logs the user out by removing their data from the session storage.
 */
export const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    // Dispatch event to notify other components like Navbar
    window.dispatchEvent(new Event('storage'));
};