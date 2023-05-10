import { Avatar, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import petsLogo from '../assets/pets.svg';
const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Clientes', path: '/clients' },
    { name: 'Mascotas', path: '/pets' },
];

export default function Sidebar() {
    const location = useLocation();
    return (
        <Stack
            sx={{
                bgcolor: '#FAF6F3',
                height: '100vh',
                width: {
                    xs: 220,
                    sm: 280,
                    md: 320,
                },
            }}
        >
            <Stack
                direction={'row'}
                justifyContent={'end'}
                alignItems={'end'}
                height={96}
                pr={3}
                gap={2}
            >
                <Avatar
                    alt="perfil de usuario"
                    src="https://peru21.pe/resizer/leYkMLx5bybuPj1Gl9yiMGqhAdc=/1200x1200/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/WQ4FZ6J6XNCT7AL6OBDNOQBXTE.jpg"
                />
                <Stack>
                    <Typography variant="h2" fontSize={16} fontWeight={700}>
                        Alvaro Huaysara
                    </Typography>
                    <Typography color={'#C0BFBD'} fontSize={12} fontWeight={600}>
                        Admin
                    </Typography>
                </Stack>
            </Stack>
            <Stack flex={1} justifyContent={'center'}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            component={RouterLink}
                            to={item.path}
                            key={item.name}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                bgcolor: isActive ? '#FAE79A' : 'transparent',
                                textDecoration: 'none',
                                ':after': {
                                    content: '""',
                                    display: 'block',
                                    width: 6,
                                    height: '100%',
                                    bgcolor: isActive ? '#FDD138' : 'transparent',
                                    transition: 'width 0.3s ease',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    p: 2,
                                    color: isActive ? '#000' : '#C0BFBD',
                                    fontWeight: 500,
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Link>
                    );
                })}
            </Stack>
            <Stack direction={'row'} justifyContent={'end'} p={2}>
                <img src={petsLogo} width={200} alt="logo de mascotas" />
            </Stack>
        </Stack>
    );
}
