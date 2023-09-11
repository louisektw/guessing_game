import { useEffect, useState } from 'react';
import { Alert, Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { startNewGame, makeGuess, getGame } from '../utils/gameUtils';
import { UserAuth } from '../contexts/UserContext';
import GameControls from '../components/GameControls';
import GameBox from '../components/GameBox';

const GamePage = () => {
    const [numberInput, setNumberInput] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const { token } = UserAuth();

    useEffect(() => {
        const activeGameId = Cookies.get('activeGame');
        if (activeGameId) {
            setGameId(activeGameId);
            getGame(token, activeGameId, setRandomNumber);
        }
    }, [gameId, token]);

    const handleClear = () => {
        setNumberInput('');
        setResult(null);
    };

    const handleStartNewGame = async () => {
        startNewGame(token, setGameId, setRandomNumber, setResult, setNumberInput);
    };

    const handleGuess = async () => {
        makeGuess(token, gameId, numberInput, setRandomNumber, setResult);
    };

    useEffect(() => {
        console.log('For cheating: ', randomNumber);
    }, [randomNumber])

    
    const paperSx = {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    };

    return (
        <GameBox paperSx={paperSx}>
            <Typography variant="h4" >
                Guess the number
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(0,0,0, 0.5)', marginBottom: '1rem' }}>
                Make a guess between 0 and 10 000
            </Typography>
            {result && (
                <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                    {result}
                </Typography>
            )}
            {randomNumber && (
                <GameControls
                    numberInput={numberInput}
                    setNumberInput={setNumberInput}
                    handleGuess={handleGuess}
                    handleClear={handleClear}
                    setValidationError={setValidationError}
                />
            )}
            {!randomNumber && (
                <Button onClick={handleStartNewGame} variant="contained" sx={{ marginTop: 2 }}>
                    Start a new game
                </Button>
            )}
            {validationError && (<Alert severity="error" sx={{marginTop: 2}}>{validationError}</Alert>)}
        </GameBox>
    );
};

export default GamePage;
