import { Box, Stack, Typography } from '@mui/material';
import dogImage from '../../assets/dog.png';
import { MdPeople, MdPets } from 'react-icons/md';
import { useClientsStore } from '../../store/useClientsStore';
import { usePetsStore } from '../../store/usePetsStore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
    name: string;
    path: string;
    icon: JSX.Element;
    quantity: number;
}

export default function DashboardPage() {
    const { clients } = useClientsStore();
    const { pets } = usePetsStore();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    useEffect(() => {
        setMenuItems([
            {
                name: 'Clientes',
                path: '/clients',
                icon: <MdPeople size={64} />,
                quantity: clients.length,
            },
            { name: 'Mascotas', path: '/pets', icon: <MdPets size={64} />, quantity: pets.length },
        ]);
    }, [clients, pets]);

    return (
        <Stack gap={2}>
            {/*  */}
            <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                    bgcolor: '#69C9D7',
                    width: '100%',
                    borderRadius: 4,
                    p: 2,
                    gap: 2,
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                        md: 'row',
                    },
                }}
            >
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography
                        variant="h3"
                        color={'#fff'}
                        fontSize={24}
                        fontWeight={600}
                        textAlign={'center'}
                    >
                        Seguimiento de actividad
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        height: {
                            xs: 2,
                            sm: 160,
                            md: 160,
                        },
                        width: {
                            xs: '100%',
                            sm: 2,
                            md: 2,
                        },
                        bgcolor: '#fff',
                    }}
                />
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Typography variant="h3" color={'#FDD138'}>
                        Aseo
                    </Typography>
                    <Typography color={'#fff'} textAlign={'center'}>
                        Disponemos de estilistas de perros y gatos formados y certificados
                        profesionalmente.
                    </Typography>
                </Stack>
                <Stack justifyContent={'end'} pr={4}>
                    <img width={160} src={dogImage} alt="buldog" />
                </Stack>
            </Stack>

            {/*  */}
            <Stack direction={'row'} gap={2}>
                {menuItems.map((item) => {
                    return (
                        <Stack
                            key={item.name}
                            component={Link}
                            to={item.path}
                            sx={{
                                bgcolor: '#FAF6F3',
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                            // maxWidth={260}
                            borderRadius={4}
                            overflow={'hidden'}
                        >
                            <Stack
                                // direction="row"
                                sx={{
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'row',
                                        md: 'row',
                                    },
                                }}
                                bgcolor={'#FFF3C4'}
                                gap={2}
                                pt={1}
                                px={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Stack>
                                    <Typography fontSize={24} fontWeight={700} color={'#FDD138'}>
                                        {item.name}
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={600} color={'#C0BFBD'}>
                                        CRUD de {item.name}
                                    </Typography>
                                </Stack>
                                <Typography color={'#FDD138'}>{item.icon}</Typography>
                            </Stack>
                            <Stack direction="row" py={1} px={2} justifyContent={'center'}>
                                <Typography color="#FDD138" fontSize={32} fontWeight={700}>
                                    {item.quantity}
                                </Typography>
                            </Stack>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
}
