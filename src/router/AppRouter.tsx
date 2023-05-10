import { Routes, Route, Navigate } from 'react-router-dom';
import ClientsPage from '../modules/clients/pages/ClientsPage';
import PetsPage from '../modules/pets/pages/PetsPage';
import DashboardPage from '../modules/dashboard/DashboardPage';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
    );
}
