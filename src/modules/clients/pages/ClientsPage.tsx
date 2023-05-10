import { useState } from 'react';

import {
    Stack,
    Typography,
    Box,
    Button,
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { MdAdd } from 'react-icons/md';

import { useClients } from '../hooks';
import Searchbox from '../../../components/Searchbox';
import ClientForm from '../components/ClientForm';
import ClientTable from '../components/ClientTable';
import { Client } from '../interfaces/client.interface';
import { useClientsStore } from '../../../store/useClientsStore';

export default function ClientsPage() {
    const { clients, isOpenModal, openModal, closeModal, isErrorLoad, isLoading } =
        useClientsStore();

    const { startDeleteClient, startRefreshClients } = useClients();

    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    const handleClickAdd = () => {
        setSelectedClient(null);
        setIsEditing(false);
        openModal();
    };

    const handleClickEdit = (client: Client) => {
        setSelectedClient(client);
        setIsEditing(true);
        openModal();
    };

    const handleClickDelete = (client: Client) => {
        setSelectedClient(client);
        setIsOpenDeleteConfirm(true);
    };

    const handleDelete = async () => {
        if (!selectedClient) return;
        const resp = await startDeleteClient(selectedClient?.id);
        if (resp) {
            setIsOpenDeleteConfirm(false);
        }
    };

    return (
        <>
            <Stack gap={2}>
                <Stack
                    sx={{
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                        alignItems: {
                            xs: 'flex-start',
                            md: 'center',
                        },
                    }}
                    gap={2}
                >
                    <Stack flex={1}>
                        <Typography variant="h1" fontSize={24}>
                            Clientes
                        </Typography>
                        <Typography color={'#C0BFBD'}>
                            Consulta, registra, actualiza y elimina clientes
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={2}>
                        <Searchbox placeholder="John Doe" />
                        <Button
                            onClick={handleClickAdd}
                            variant="contained"
                            color="primary"
                            sx={{
                                textTransform: 'none',
                            }}
                            startIcon={<MdAdd />}
                        >
                            Crear
                        </Button>
                    </Stack>
                </Stack>
                <ClientTable
                    clients={clients}
                    onClickDelete={handleClickDelete}
                    onClickEdit={handleClickEdit}
                    isErrorLoad={isErrorLoad}
                    onRefresh={startRefreshClients}
                    isLoading={isLoading}
                />
            </Stack>

            {/* Modal formulario */}

            <Modal
                open={isOpenModal}
                onClose={closeModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 400,
                        width: '95%',
                    }}
                >
                    <ClientForm isEditing={isEditing} client={selectedClient} />
                </Box>
            </Modal>

            {/* Dialogo de confirmacion */}
            <Dialog open={isOpenDeleteConfirm} onClose={() => setIsOpenDeleteConfirm(false)}>
                <DialogTitle id="alert-dialog-title">
                    {'¿Deseas eliminar este registro?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Si eliminas este registro no podrás recuperarlo. Se borrarán también sus
                        mascotas.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpenDeleteConfirm(false)}>Cancelar</Button>
                    <Button variant="outlined" onClick={() => handleDelete()}>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
