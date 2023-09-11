import express from 'express';
import { validationResult, check } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const serviceAccountKey = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

const router = express.Router();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

const verifyFirebaseToken = async (token) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid Firebase Token');
    }
};

const verifyTokenMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : undefined;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = await verifyFirebaseToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

router.use(verifyTokenMiddleware);

const randomNumberMaximum = 10000;
const generateRandomNumber = () => {
    return Math.floor(Math.random() * randomNumberMaximum);
};

router.post('/start-game', async (req, res) => {
    const randomNumber = generateRandomNumber();

    try {
        const game = await prisma.games.create({
            data: {
                game_id: uuidv4(),
                random_number: randomNumber,
                finished: false,
            },
        });
        res.send({ gameId: game.game_id, randomNumber: game.random_number });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// The 'gameId' parameter must be a valid UUID.
// The 'guess' parameter must be a valid integer between 0 and 10000.
const validateGuess = [check('gameId').isUUID(), check('guess').isFloat({ min: 0, max: 10000 })];

// Adding validation as a middleware
router.post('/make-guess', validateGuess, async (req, res) => {
    // Collect the validation errors
    const errors = validationResult(req);

    //Check if there are validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const gameId = req.body.gameId;
    const guess = req.body.guess;

    try {
        const game = await prisma.games.findUnique({
            where: {
                game_id: gameId,
            },
        });
        const { random_number, finished } = game;

        if (finished) {
            res.send({ gameOver: true, message: 'The game is already over.' });
        } else {
            // Check if the guess is correct.
            if (guess === random_number) {
                res.send({ correct: true });
            } else if (guess < random_number) {
                res.send({ guessIsSmaller: true });
            } else {
                res.send({ guessIsLarger: true });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing your guess.' });
    }
});

const validateGameId = [check('gameId').isUUID()];
router.get('/get-game', validateGameId, async (req, res) => {
    const { gameId } = req.query;

    if (!gameId) {
        return res.status(400).json({ error: 'Missing gameId' });
    }

    try {
        const game = await prisma.games.findUnique({
            where: {
                game_id: gameId,
            },
            select: {
                random_number: true,
                finished: true,
            },
        });

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json({
            gameId: gameId,
            randomNumber: game.random_number,
            finished: game.finished,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the game' });
    }
});

router.delete('/delete-game', validateGameId, async (req, res) => {
    const { gameId } = req.query;
    try {
        await prisma.games.delete({
            where: {
                game_id: gameId,
            },
        });
        res.send({ message: 'Game deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while deleting the game.' });
    }
});

export default router;
