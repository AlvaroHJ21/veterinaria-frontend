import { Box, TextField } from '@mui/material';

interface Props {
    placeholder?: string;
}

export default function Searchbox({ placeholder }: Props) {
    return (
        <Box>
            <TextField
                size="small"
                placeholder={placeholder}
                sx={
                    {
                        // pl: 8,
                    }
                }
            />
        </Box>
    );
}
