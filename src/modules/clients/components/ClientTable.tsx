import { Alert, Box, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete, MdEdit } from 'react-icons/md';
import ReactLoading from 'react-loading';

import { Client } from '../interfaces/client.interface';

interface Props {
    clients: Client[];
    isLoading?: boolean;
    isErrorLoad?: boolean;
    onRefresh?: () => void;
    onClickEdit: (client: Client) => void;
    onClickDelete: (client: Client) => void;
}

export default function ClientTable({
    clients,
    onClickEdit,
    onClickDelete,
    isLoading,
    isErrorLoad,
    onRefresh,
}: Props) {
    const columns = [
        {
            field: 'dni',
            headerName: 'DNI',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'apellido',
            headerName: 'Apellido',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'telefono',
            headerName: 'Teléfono',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Acción',
            minWidth: 100,
            renderCell: ({ row }: { row: Client }) => {
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
                        Error al cargar los datos! {" "}
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
            <DataGrid rows={clients} columns={columns} />
        </Box>
    );
}
