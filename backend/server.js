const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-secure';

app.use(cors());
app.use(bodyParser.json());

// --- Définition Swagger ---
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Argent Bank API',
            version: '1.0.0',
            description: 'API for Argent Bank user authentication and profile management',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['backend/server.js', 'api-documentation.yaml'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// --- Base de données factice ---
let users = {
    "tony@stark.com": {
        password: "P@ssword123!",
        profile: {
            id: "1",
            email: "tony@stark.com",
            firstName: "Tony",
            lastName: "Stark",
            userName: "IronMan",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
        }
    }
};

let transactions = {
    '1': [ // Argent Bank Checking (x8349)
        { id: 'txn-1', date: '27/02/20', description: 'Golden Sun Bakery', amount: 8.00, balance: 2074.79, type: 'Electronic', category: 'Food', notes: 'Morning coffee' },
        { id: 'txn-2', date: '27/02/20', description: 'Movie Night', amount: 25.50, balance: 2049.29, type: 'Card', category: 'Shopping', notes: '' },
        { id: 'txn-3', date: '26/02/20', description: 'Gas Station', amount: 45.30, balance: 2003.99, type: 'Card', category: 'Transport', notes: 'Fuel for the car' },
    ],
    '2': [ // Argent Bank Savings (x6712)
        { id: 'txn-4', date: '25/02/20', description: 'Monthly Savings Deposit', amount: 500.00, balance: 10928.42, type: 'Transfer', category: 'Utilities', notes: 'Automatic transfer' },
    ],
    '3': [ // Argent Bank Credit Card (x5201)
        { id: 'txn-5', date: '24/02/20', description: 'Online Shopping', amount: 150.00, balance: 184.30, type: 'Electronic', category: 'Shopping', notes: 'New headphones' },
    ]
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- Points de terminaison de l'API ---

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestion des utilisateurs et authentification
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: tony@stark.com
 *               password:
 *                 type: string
 *                 example: P@ssword123!
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 body:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 */
app.post('/api/v1/user/login', (req, res) => {
    const { email, password } = req.body;
    const userAccount = users[email];

    if (userAccount && userAccount.password === password) {
        const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "User successfully logged in", body: { token } });
    } else {
        res.status(400).json({ message: "Invalid credentials", status: 400 });
    }
});


/**
 * @swagger
 * /api/v1/user/profile:
 *   post:
 *     summary: Get User Profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized
 */
app.post('/api/v1/user/profile', authenticateToken, (req, res) => {
    const userAccount = users[req.user.email];
    if (userAccount) {
        res.json({ status: 200, message: "Successfully got user profile data", body: userAccount.profile });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

/**
 * @swagger
 * /api/v1/user/profile:
 *   put:
 *     summary: Update User Profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: IronMan_updated
 *     responses:
 *       200:
 *         description: User profile successfully updated
 *       401:
 *         description: Unauthorized
 */
app.put('/api/v1/user/profile', authenticateToken, (req, res) => {
    const { userName } = req.body;
    const userAccount = users[req.user.email];
    if (userAccount) {
        userAccount.profile.userName = userName;
        userAccount.profile.updatedAt = new Date().toISOString();
        res.json({ status: 200, message: "User profile successfully updated", body: userAccount.profile });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// --- Transaction Endpoints ---

app.get('/api/v1/accounts/:accountId/transactions', authenticateToken, (req, res) => {
    const { accountId } = req.params;
    const accountTransactions = transactions[accountId];

    if (accountTransactions) {
        res.json({ status: 200, message: "Successfully retrieved transactions", body: accountTransactions });
    } else {
        res.status(404).json({ message: "Account not found or no transactions" });
    }
});

app.put('/api/v1/transactions/:transactionId', authenticateToken, (req, res) => {
    const { transactionId } = req.params;
    const { category, notes } = req.body;

    let found = false;
    let updatedTransaction = null;

    for (const accountId in transactions) {
        const transactionIndex = transactions[accountId].findIndex(t => t.id === transactionId);
        if (transactionIndex !== -1) {
            if (category !== undefined) {
                transactions[accountId][transactionIndex].category = category;
            }
            if (notes !== undefined) {
                transactions[accountId][transactionIndex].notes = notes;
            }
            updatedTransaction = transactions[accountId][transactionIndex];
            found = true;
            break;
        }
    }

    if (found) {
        res.json({ status: 200, message: "Transaction updated successfully", body: updatedTransaction });
    } else {
        res.status(404).json({ message: "Transaction not found" });
    }
});


app.listen(PORT, () => {
    console.log(`Argent Bank backend listening at http://localhost:${PORT}`);
    console.log(`Swagger documentation available at http://localhost:3001/api-docs`);
});
