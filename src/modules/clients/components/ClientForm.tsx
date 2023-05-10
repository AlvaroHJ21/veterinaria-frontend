import { Button, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { MdSave } from 'react-icons/md';
import { useClients } from '../hooks';
import { useClientsStore } from '../../../store/useClientsStore';
import { Client } from '../interfaces/client.interface';

interface Props {
    isEditing?: boolean;
    client?: Client | null;
}

export default function ClientForm({ isEditing = false, client }: Props) {
    const [name, setName] = useState(client?.nombre ?? '');
    const [lastName, setLastName] = useState(client?.apellido ?? '');
    const [dni, setDni] = useState(client?.dni ?? '');
    const [phone, setPhone] = useState(client?.telefono ?? '');

    const { startAddClient, startUpdateClient } = useClients();
    const { closeModal } = useClientsStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEditing) {
            if (!client) return;
            const resp = await startUpdateClient(client.id, {
                nombre: name,
                apellido: lastName,
                dni,
                telefono: phone,
            });
            if (resp) {
                closeModal();
                console.log('Actualizado');
            } else {
                console.log('Error al actualizar');
            }
        } else {
            const resp = await startAddClient({
                nombre: name,
                apellido: lastName,
                dni,
                telefono: phone,
            });
            if (resp) {
                closeModal();
                console.log('Agregado');
            } else {
                console.log('Error al agregar');
            }
        }
    };

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
                Cliente
            </Typography>
            <Stack component={'form'} gap={2} onSubmit={handleSubmit}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} label="Nombre" />
                <TextField
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    label="Apellido"
                />
                <TextField value={dni} onChange={(e) => setDni(e.target.value)} label="DNI" />
                <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    label="Teléfono"
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
