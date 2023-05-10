import axios from 'axios';

const clientsApi = axios.create({
    baseURL: 'http://localhost:3000/api/v1/clients',
});

export default clientsApi;
