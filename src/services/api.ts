import { Transaction, User } from '../types';

const API_BASE_URL = 'http://localhost:3001/api/v1';

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface UserProfileUpdate {
    userName: string;
}

export interface TransactionUpdateData {
    category?: string;
    notes?: string;
}

async function apiFetch(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'An API error occurred');
        }
        return data.body;
    } catch (err: any) {
        throw new Error(err.message || 'Network error or server is unreachable.');
    }
}

export const loginApi = async (credentials: LoginCredentials): Promise<string> => {
    const data = await apiFetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!data.token) {
        throw new Error("Login failed: Token not found in response.");
    }
    return data.token;
};

export const fetchUserProfileApi = async (token: string): Promise<User> => {
    return apiFetch('/user/profile', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const updateUserProfileApi = async (token: string, profileData: UserProfileUpdate): Promise<User> => {
    return apiFetch('/user/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
    });
};

export const fetchTransactionsApi = async (token: string, accountId: string): Promise<Transaction[]> => {
    console.log(`Fetching transactions for account ${accountId} with token ${token}... (using mock data)`);
    // NOTE: C'est une fausse liste, comme demandé. Dans une vraie application, on parlerait au serveur ici.
    return Promise.resolve([
      { id: 'tx1', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.00, balance: 298.00, type: 'Electronic', category: 'Food', notes: 'lorem ipsum' },
      { id: 'tx2', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.00, balance: 298.00, type: 'Electronic', category: 'Food', notes: 'lorem ipsum' },
      { id: 'tx3', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.00, balance: 298.00, type: 'Electronic', category: 'Food', notes: 'lorem ipsum' },
      { id: 'tx4', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.00, balance: 298.00, type: 'Electronic', category: 'Food', notes: 'lorem ipsum' },
      { id: 'tx5', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.00, balance: 298.00, type: 'Electronic', category: 'Food', notes: 'lorem ipsum' }
    ]);
};

export const updateTransactionApi = async (token: string, transactionId: string, updateData: TransactionUpdateData): Promise<Transaction> => {
    console.log(`Updating transaction ${transactionId} with token ${token} and data`, updateData, "(simulated)");
    // NOTE: C'est aussi une simulation. La vraie fonction parlerait au serveur.
    return Promise.resolve({
        id: transactionId,
        date: '27/02/20',
        description: 'Golden Sun Bakery',
        amount: 8.00,
        balance: 298.00,
        type: 'Electronic',
        category: updateData.category || 'Food',
        notes: updateData.notes ?? 'lorem ipsum'
    });
};