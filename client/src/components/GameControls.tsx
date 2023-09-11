import { FC } from 'react';
import { TextField, Stack, Button, Box, alpha } from '@mui/material';

interface IGameControls {
    numberInput: string;
    setNumberInput: (value: React.SetStateAction<string>) => void;
    handleGuess: () => Promise<void>;
    handleClear: () => void;
    setValidationError: React.Dispatch<React.SetStateAction<string | null>>;
}

const GameControls: FC<IGameControls> = ({ numberInput, setNumberInput, handleGuess, handleClear, setValidationError }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        let error = '';

        if (!/^[0-9]*$/.test(input)) { 
            error = "Only integers are allowed.";
        } else if (Number(input) > 10000) {
            error = "The number is too big."
        }
        if (error){
            setValidationError(error)
        }
        else{
            // Input is valid, update the state
            setNumberInput(input);
            setValidationError(null)
        }
    };

    return (
        <>
            <TextField
                fullWidth
                value={numberInput}
                onChange={handleInputChange}
                sx={{ backgroundColor: alpha('#fff', 0.5) }}
            />
            <Box sx={{ width: '100%', marginTop: 3 }}>
                <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleGuess} variant="contained" sx={{ width: '50%' }}>
                        Guess
                    </Button>
                    <Button
                        onClick={handleClear}
                        variant="contained"
                        sx={{ width: '50%', backgroundColor: alpha('#007bff', 0.7) }}
                    >
                        Clear
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default GameControls;
