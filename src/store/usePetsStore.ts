import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Pet } from '../modules/pets/interfaces/pet.interface';

interface PetsState {
    pets: Pet[];
    isOpenModal: boolean;
    isLoading: boolean;
    isErrorLoad: boolean;

    openModal: () => void;
    closeModal: () => void;
    setIsErrorLoad: (isErrorLoad: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;

    loadPets: (pets: Pet[]) => void;
    addPet: (pet: Pet) => void;
    updatePet: (pet: Pet) => void;
    deletePet: (id: number) => void;
}

export const usePetsStore = create<PetsState>()(
    devtools(
        // persist(
        (set) => ({
            pets: [],
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

            loadPets: (clients: Pet[]) => {
                set({ pets: clients });
            },
            addPet: (client: Pet) => {
                set((state) => ({ pets: [...state.pets, client] }));
            },
            updatePet: (client: Pet) => {
                set((state) => ({
                    pets: state.pets.map((c) => {
                        if (c.id === client.id) {
                            return client;
                        }
                        return c;
                    }),
                }));
            },
            deletePet: (id: number) => {
                set((state) => ({
                    pets: state.pets.filter((c) => c.id !== id),
                }));
            },
        }),
        {
            name: 'pets-storage',
        }
    )
    // )
);
