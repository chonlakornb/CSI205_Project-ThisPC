// This file will manage financial statistics.

const FINANCE_STATS_KEY = 'finance_stats';

const initialStats = {
    revenue: 55250.00,
    expenses: 22100.00, // Assuming a 60% profit margin on the initial revenue (55250 * 0.4)
    profit: 33150.00,
};

/**
 * Retrieves financial stats from localStorage.
 * Initializes with default values if not present.
 * @returns {Object} The financial stats object.
 */
export const getFinanceStats = () => {
    const statsJSON = localStorage.getItem(FINANCE_STATS_KEY);
    if (statsJSON) {
        return JSON.parse(statsJSON);
    } else {
        localStorage.setItem(FINANCE_STATS_KEY, JSON.stringify(initialStats));
        return initialStats;
    }
};

/**
 * Saves the financial stats to localStorage.
 * @param {Object} stats - The stats object to save.
 */
const saveFinanceStats = (stats) => {
    localStorage.setItem(FINANCE_STATS_KEY, JSON.stringify(stats));
};

/**
 * Adds a new transaction and updates financial stats.
 * @param {number} totalAmount - The total revenue from the transaction.
 */
export const addTransaction = (totalAmount) => {
    const stats = getFinanceStats();
    
    // For mock purposes, let's assume a 60% profit margin.
    // Cost of goods sold (COGS) is 40% of the revenue.
    const costOfGoods = totalAmount * 0.4;

    stats.revenue += totalAmount;
    stats.expenses += costOfGoods;
    stats.profit = stats.revenue - stats.expenses;

    saveFinanceStats(stats);
};