import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Client } from '../modules/clients/interfaces/client.interface';

interface ClientsState {
    clients: Client[];
    isOpenModal: boolean;
    isLoading: boolean;
    isErrorLoad: boolean;

    openModal: () => void;
    closeModal: () => void;
    setIsErrorLoad: (isErrorLoad: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;

    loadClients: (clients: Client[]) => void;
    addClient: (client: Client) => void;
    updateClient: (client: Client) => void;
    deleteClient: (id: number) => void;
}

export const useClientsStore = create<ClientsState>()(
    devtools(
        // persist(
        (set) => ({
            clients: [],
            isOpenModal: false,
            isLoading: false,
            isErrorLoad: false,
            
            openModal: () => {
                set({ isOpenModal: true });
            },
            closeModal: () => {
                set({ isOpenModal: false });
            },

            setIsErrorLoad: (isErrorLoad: boolean) => {
                set({ isErrorLoad: isErrorLoad });
            },
            setIsLoading: (isLoading: boolean) => {
                set({ isLoading: isLoading });
            },

            loadClients: (clients: Client[]) => {
                set({ clients: clients });
            },
            addClient: (client: Client) => {
                set((state) => ({ clients: [...state.clients, client] }));
            },
            updateClient: (client: Client) => {
                set((state) => ({
                    clients: state.clients.map((c) => {
                        if (c.id === client.id) {
                            return client;
                        }
                        return c;
                    }),
                }));
            },
            deleteClient: (id: number) => {
                set((state) => ({
                    clients: state.clients.filter((c) => c.id !== id),
                }));
            },
        }),
        {
            name: 'clients-storage',
        }
    )
    // )
);
