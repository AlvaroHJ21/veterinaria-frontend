import { useEffect } from 'react';

import HomeLayout from './layouts/HomeLayout';
import AppRouter from './router/AppRouter';
import { useClients } from './modules/clients/hooks';
import { usePets } from './modules/pets/hooks';

function App() {
    const { startRefreshClients } = useClients();
    const { startRefreshPets } = usePets();
    useEffect(() => {
        startRefreshClients();
        startRefreshPets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HomeLayout>
            <AppRouter />
        </HomeLayout>
    );
}

export default App;
