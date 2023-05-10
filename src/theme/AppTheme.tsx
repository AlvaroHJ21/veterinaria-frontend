import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ColorModeContextProps {
    toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextProps>({} as ColorModeContextProps);

interface Props {
    children: React.ReactNode;
}

export default function AppTheme({ children }: Props) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                //font
                typography: {
                    fontFamily: 'Montserrat',
                },
                palette: {
                    mode,
                    primary: {
                        main: '#FDD138',
                    },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
