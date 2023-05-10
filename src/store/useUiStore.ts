import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UiState {
    isOpenSidebar: boolean;

    openSidebar: () => void;
    closeSidebar: () => void;
    togleSidebar: () => void;
}

export const useUiStore = create<UiState>()(
    devtools(
        // persist(
        (set) => ({
            isOpenSidebar: false,

            openSidebar: () => {
                set({ isOpenSidebar: true });
            },
            closeSidebar: () => {
                set({ isOpenSidebar: false });
            },
            togleSidebar: () => {
                set((state) => ({ isOpenSidebar: !state.isOpenSidebar }));
            },
        }),
        {
            name: 'ui-storage',
        }
    )
    // )
);
