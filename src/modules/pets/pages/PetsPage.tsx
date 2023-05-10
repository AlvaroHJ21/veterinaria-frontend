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

import { usePets } from '../hooks';
import Searchbox from '../../../components/Searchbox';
import PetForm from '../components/PetForm';
import PetTable from '../components/PetTable';
import { Pet } from '../interfaces/pet.interface';
import { usePetsStore } from '../../../store/usePetsStore';

export default function PetsPage() {
    const { pets, isOpenModal, openModal, closeModal, isErrorLoad, isLoading } = usePetsStore();

    const { startDeletePet, startRefreshPets } = usePets();

    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    const handleClickAdd = () => {
        setSelectedPet(null);
        setIsEditing(false);
        openModal();
    };

    const handleClickEdit = (client: Pet) => {
        setSelectedPet(client);
        setIsEditing(true);
        openModal();
    };

    const handleClickDelete = (client: Pet) => {
        setSelectedPet(client);
        setIsOpenDeleteConfirm(true);
    };

    const handleDelete = async () => {
        if (!selectedPet) return;
        const resp = await startDeletePet(selectedPet?.id);
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
                            Mascotas
                        </Typography>
                        <Typography color={'#C0BFBD'}>
                            Consulta, registra, actualiza y elimina mascotas
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={2}>
                        <Searchbox placeholder="Firulais" />
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
                <PetTable
                    pets={pets}
                    onClickDelete={handleClickDelete}
                    onClickEdit={handleClickEdit}
                    isLoading={isLoading}
                    isErrorLoad={isErrorLoad}
                    onRefresh={startRefreshPets}
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
                    <PetForm isEditing={isEditing} pet={selectedPet} />
                </Box>
            </Modal>

            {/* Dialogo de confirmacion */}
            <Dialog open={isOpenDeleteConfirm} onClose={() => setIsOpenDeleteConfirm(false)}>
                <DialogTitle id="alert-dialog-title">
                    {'¿Deseas eliminar este registro?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Si eliminas este registro no podrás recuperarlo
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
