export interface Pet {
    id: number;
    nombre: string;
    edad: number;
    cliente: {
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        dni: string;
    };
}

export interface CreatePetDto {
    nombre: string;
    edad: number;
    idCliente: number;
}

export interface UpdatePetDto {
    nombre?: string;
    edad?: number;
    idCliente?: number;
}
