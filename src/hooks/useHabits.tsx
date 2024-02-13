import { DataContext } from '@/context';
import { useContext } from 'react';

function useHabits() {
    return useContext(DataContext);
}
export default useHabits;
