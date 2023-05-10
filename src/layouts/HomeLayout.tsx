import { Box, Container, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { Navbar } from '../components';
import { useUiStore } from '../store/useUiStore';

interface Props {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
    const { isOpenSidebar } = useUiStore();

    return (
        <Stack direction={'row'} height={'100vh'}>
            <Box
                sx={{
                    height: '100vh',
                    display: {
                        xs: isOpenSidebar ? 'block' : 'none',
                        md: 'block',
                    },
                    position: {
                        xs: isOpenSidebar ? 'absolute' : 'relative',
                        md: 'relative',
                    },
                    zIndex: 99,
                }}
            >
                <Sidebar />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    minHeight: '100vh',
                }}
            >
                <Navbar />
                <Container>{children}</Container>
            </Box>
        </Stack>
    );
}
