import clientsApi from '../../../api/clientsApi';
import { ResponseAPI } from '../../../interfaces/api-response.interface';
import { Client, CreateClientDto, UpdateClientDto } from '../interfaces/client.interface';
import { useClientsStore } from '../../../store/useClientsStore';

export default function useClients() {
    const { loadClients, addClient, updateClient, deleteClient, setIsErrorLoad, setIsLoading } =
        useClientsStore();
    const startRefreshClients = async () => {
        try {
            setIsLoading(true);
            setIsErrorLoad(false);
            const { data } = await clientsApi.get<ResponseAPI<Client[]>>('/');
            const clients = data.data;
            loadClients(clients);
            return true;
        } catch (error) {
            console.log(error);
            setIsErrorLoad(true);
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    const startAddClient = async (createClientDto: CreateClientDto) => {
        try {
            const { data } = await clientsApi.post<ResponseAPI<Client>>('/', createClientDto);
            const client = data.data;
            addClient(client);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    const startUpdateClient = async (id: number, updateClientDto: UpdateClientDto) => {
        try {
            const { data } = await clientsApi.patch<ResponseAPI<Client>>(`/${id}`, updateClientDto);
            const client = data.data;
            updateClient(client);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    const startDeleteClient = async (id: number) => {
        try {
            await clientsApi.delete<ResponseAPI<Client>>(`/${id}`);
            deleteClient(id);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    return {
        startRefreshClients,
        startAddClient,
        startUpdateClient,
        startDeleteClient,
    };
}
