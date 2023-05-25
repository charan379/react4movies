import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchTheme } from '../features/theme/themeSlice';

export function useTheme() {

    const theme = useSelector((state) => state.theme)

    const dispath = useDispatch();

    return {
        theme: theme?.mode,
        toogleTheme: () => dispath(switchTheme())
    }
}
