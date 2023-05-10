import axios from 'axios';

const petsApi = axios.create({
    baseURL: 'http://localhost:3000/api/v1/pets',
});

export default petsApi;
