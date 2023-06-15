import { useDispatch, useSelector } from 'react-redux'
import { setTheme, switchTheme } from '../features/theme/themeSlice';
import { useEffect, useMemo, useState } from 'react';

export function useTheme() {

    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch();

    const getSysPreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDarkSystem, setIsDarkSystem] = useState(getSysPreference());

    function initTheme() {
        if (isDarkSystem && theme?.mode === "") {
            dispatch(setTheme('dark'))
        } else if (!isDarkSystem && theme?.mode === "") {
            dispatch(setTheme('light'))
        }
    }

    function sysPreferenceListner(event) {
        setIsDarkSystem(event?.matches);
        if (event?.matches) {
            dispatch(setTheme('dark'))
        } else {
            dispatch(setTheme('light'))
        }
    }

    function changeCssRootVariables(theme) {
        const cssRoot = document.querySelector(':root');

        /* light theme */
        const lightRootVariables = {
            '--bg-color': '#e9f1fa',
            '--font-color': '#020d1a',
            '--ui-element-color': '#c8d9ec',
            '--ui-element-hover-color': '#22303c',
            '--ui-element-hover-font-color': '#ffffff',
            '--button-bg-color': '#4182cb',
            '--button-font-color': '#fafafa',
            '--title-box-title-color': '#15202b',
            '--title-box-title-bg-color': '#d5e1ed',
            '--movie-modal-bg-color': 'rgb(255, 255, 255)',
            '--seasons-bg-color': 'rgba(255, 255, 255, 0)',
            '--tooltip-background-color': 'rgb(7, 52, 88)',
            '--tooltip-font-color': '#ffffff',
        }

        /* dark theme */
        const darkRootVariables = {
            '--bg-color': '#15202b',
            '--font-color': '#ffffff',
            '--ui-element-color': '#22303c',
            '--ui-element-hover-color': '#c8d9ec',
            '--ui-element-hover-font-color': '#020d1a',
            '--button-bg-color': '#9400d3',
            '--button-font-color': '#fafafa',
            '--title-box-title-color': '#ffffff',
            '--title-box-title-bg-color': '#192734',
            '--movie-modal-bg-color': 'rgb(255, 255, 255)',
            '--seasons-bg-color': 'rgba(255, 255, 255, 0)',
            '--tooltip-background-color': 'rgb(236 238 240)',
            '--tooltip-font-color': '#020d1a',
        }


        // Update the CSS variables
        if (theme === 'dark') {
            for (const variable in darkRootVariables) {
                cssRoot.style.setProperty(variable, darkRootVariables[variable]);
            }
        } else {
            for (const variable in lightRootVariables) {
                cssRoot.style.setProperty(variable, lightRootVariables[variable]);
            }
        }
    }

    const memoizedCssRootChangeHandler = useMemo(() => changeCssRootVariables(theme?.mode), [theme?.mode])

    useEffect(() => {
        initTheme();

        memoizedCssRootChangeHandler;

        document.body.setAttribute('data-theme', theme?.mode)

        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

        darkThemeMq.addEventListener('change', sysPreferenceListner)

        return () => {
            darkThemeMq.removeEventListener('change', sysPreferenceListner)
        }
    }, [theme?.mode])

    return {
        theme: theme?.mode,
        toogleTheme: () => dispatch(switchTheme())
    }
}
