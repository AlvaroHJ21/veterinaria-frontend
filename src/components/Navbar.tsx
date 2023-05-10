import { IconButton, Stack } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useUiStore } from '../store/useUiStore';
export default function Navbar() {
    const { togleSidebar } = useUiStore();
    return (
        <Stack
            direction={'row'}
            justifyContent={'end'}
            alignItems={'center'}
            height={96}
            px={4}
            gap={2}
        >
            <FiSearch size={24} />
            <IconButton
                sx={{
                    display: {
                        xs: 'flex',
                        md: 'none',
                    },
                }}
                onClick={togleSidebar}
            >
                <HiMenuAlt3 size={24} />
            </IconButton>
            <IconButton
                sx={{
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                <HiMenuAlt3 size={24} />
            </IconButton>
        </Stack>
    );
}
