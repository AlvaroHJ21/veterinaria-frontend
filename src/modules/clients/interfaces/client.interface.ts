export interface Client {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
}

export interface CreateClientDto {
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
}

export interface UpdateClientDto {
    dni: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
}
