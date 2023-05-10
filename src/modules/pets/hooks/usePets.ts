import petsApi from '../../../api/petsApi';
import { ResponseAPI } from '../../../interfaces/api-response.interface';
import { Pet, CreatePetDto, UpdatePetDto } from '../interfaces/pet.interface';
import { usePetsStore } from '../../../store/usePetsStore';

export default function usePets() {
    const { loadPets, addPet, updatePet, deletePet, setIsErrorLoad, setIsLoading } = usePetsStore();
    const startRefreshPets = async () => {
        try {
            setIsLoading(true);
            setIsErrorLoad(false);
            const { data } = await petsApi.get<ResponseAPI<Pet[]>>('/');
            const pets = data.data;
            loadPets(pets);
            return true;
        } catch (error) {
            console.log(error);
            setIsErrorLoad(true);
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    const startAddPet = async (createPettDto: CreatePetDto) => {
        try {
            const { data } = await petsApi.post<ResponseAPI<Pet>>('/', createPettDto);
            const pet = data.data;
            addPet(pet);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    const startUpdatePet = async (id: number, updatePetDto: UpdatePetDto) => {
        try {
            const { data } = await petsApi.patch<ResponseAPI<Pet>>(`/${id}`, updatePetDto);
            const pet = data.data;
            updatePet(pet);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    const startDeletePet = async (id: number) => {
        try {
            await petsApi.delete<ResponseAPI<Pet>>(`/${id}`);
            deletePet(id);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    return {
        startRefreshPets,
        startAddPet,
        startUpdatePet,
        startDeletePet,
    };
}
