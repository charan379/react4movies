import { useDispatch, useSelector } from 'react-redux'
import { switchTheme } from '../features/theme/themeSlice';
import { useEffect } from 'react';

export function useTheme() {

    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.remove(theme?.mode === 'light' ? 'dark' : 'light');
        document.body.classList.add(theme?.mode);

        return () => {

        }
    }, [theme?.mode])

    return {
        theme: theme?.mode,
        toogleTheme: () => dispatch(switchTheme())
    }
}
