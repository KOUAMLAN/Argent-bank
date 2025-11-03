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

// Wrapper fetch réutilisable pour gérer les requêtes et les erreurs
async function apiFetch(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'An API error occurred');
        }
        return data.body; // Retourne directement le corps de la réponse
    } catch (err: any) {
        // Relance avec un message d'erreur cohérent
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

export const fetchUserProfileApi = async (token: string) => {
    return apiFetch('/user/profile', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const updateUserProfileApi = async (token: string, profileData: UserProfileUpdate) => {
    return apiFetch('/user/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
    });
};

export const fetchTransactionsApi = async (token: string, accountId: string) => {
    return apiFetch(`/accounts/${accountId}/transactions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const updateTransactionApi = async (token: string, transactionId: string, updateData: TransactionUpdateData) => {
    return apiFetch(`/transactions/${transactionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
    });
};
