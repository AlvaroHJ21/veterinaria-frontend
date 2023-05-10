import { Alert, Box, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete, MdEdit } from 'react-icons/md';
import ReactLoading from 'react-loading';

import { Pet } from '../interfaces/pet.interface';

interface Props {
    pets: Pet[];
    isLoading?: boolean;
    isErrorLoad?: boolean;
    onRefresh?: () => void;
    onClickEdit: (pet: Pet) => void;
    onClickDelete: (pet: Pet) => void;
}

export default function PetTable({
    pets,
    onClickEdit,
    onClickDelete,
    isLoading,
    isErrorLoad,
    onRefresh,
}: Props) {
    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'edad',
            headerName: 'Edad',
            minWidth: 60,
            flex: 1,
        },
        {
            field: 'dueño',
            headerName: 'Dueño',
            minWidth: 140,
            flex: 1,
            renderCell: ({ row }: { row: Pet }) => {
                return (
                    <span>
                        {row.cliente.dni} - {row.cliente.nombre}
                    </span>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Acción',
            width: 150,
            renderCell: ({ row }: { row: Pet }) => {
                return (
                    <Stack direction="row">
                        <IconButton onClick={() => onClickEdit(row)}>
                            <MdEdit />
                        </IconButton>
                        <IconButton onClick={() => onClickDelete(row)}>
                            <MdDelete />
                        </IconButton>
                    </Stack>
                );
            },
        },
    ];

    if (isLoading) {
        return (
            <Box display={'flex'} gap={2} alignItems={'center'}>
                <ReactLoading type="spin" color={'#000'} height={32} width={32} />
                <Typography>Cargando...</Typography>
            </Box>
        );
    }

    if (isErrorLoad) {
        return (
            <Box>
                <Alert severity="error">
                    <Typography>
                        Error al cargar los datos!{' '}
                        <Typography
                            component={'span'}
                            sx={{ cursor: 'pointer' }}
                            onClick={onRefresh}
                            fontWeight={600}
                        >
                            Reintentar
                        </Typography>
                    </Typography>
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: 400,
                width: '100%',
            }}
        >
            <DataGrid rows={pets} columns={columns} />
        </Box>
    );
}
