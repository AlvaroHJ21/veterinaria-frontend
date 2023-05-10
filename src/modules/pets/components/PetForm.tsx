import { FormEvent, useEffect, useState } from 'react';

import { Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
import { MdSave } from 'react-icons/md';

import { usePets } from '../hooks';
import { Pet } from '../interfaces/pet.interface';
import { usePetsStore } from '../../../store/usePetsStore';
import { useClientsStore } from '../../../store/useClientsStore';

interface Props {
    isEditing?: boolean;
    pet?: Pet | null;
}

export default function PetForm({ isEditing = false, pet: pet }: Props) {
    const [name, setName] = useState(pet?.nombre ?? '');
    const [age, setAge] = useState(pet?.edad ?? '');
    const [selectedClient, setSelectedClient] = useState<{
        label: string;
        id: number;
    } | null>(null);
    const { startAddPet, startUpdatePet } = usePets();
    const { closeModal } = usePetsStore();
    const { clients } = useClientsStore();

    useEffect(() => {
        if (pet) {
            setSelectedClient({
                label: `${pet.cliente.dni} - ${pet.cliente.nombre}`,
                id: pet.cliente.id,
            });
        }
    }, [pet, clients]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEditing) {
            if (!pet) return;
            if (!selectedClient) return;

            const resp = await startUpdatePet(pet.id, {
                nombre: name,
                edad: Number(age),
                idCliente: selectedClient.id,
            });

            if (resp) {
                closeModal();
                console.log('Actualizado');
            } else {
                console.log('Error al actualizar');
            }
        } else {
            if (!selectedClient) return;

            const resp = await startAddPet({
                nombre: name,
                edad: Number(age),
                idCliente: selectedClient.id,
            });

            if (resp) {
                closeModal();
                console.log('Agregado');
            } else {
                console.log('Error al agregar');
            }
        }
    };

    const clientOptions = clients.map((client) => ({
        label: `${client.dni} - ${client.nombre}`,
        id: client.id,
    }));

    return (
        <Stack
            sx={{
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                gap: 2,
            }}
        >
            <Typography variant="h1" fontSize={24}>
                Mascota
            </Typography>
            <Stack component={'form'} gap={2} onSubmit={handleSubmit}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} label="Nombre" />
                <TextField value={age} onChange={(e) => setAge(e.target.value)} label="Edad" />
                <Autocomplete
                    disablePortal
                    options={clientOptions}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    value={selectedClient}
                    onChange={(_, newValue) => {
                        setSelectedClient(newValue);
                    }}
                    inputValue={selectedClient?.label ?? ''}
                    renderInput={(params) => (
                        <TextField {...params} value={selectedClient?.label} label="Dueño" />
                    )}
                />
                <Stack direction={'row'} justifyContent={'end'} gap={1}>
                    <Button onClick={closeModal} variant="text">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" startIcon={<MdSave />}>
                        {isEditing ? 'Actualizar' : 'Guardar'}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
