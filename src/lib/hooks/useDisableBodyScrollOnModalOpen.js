import { useEffect } from 'react';

export const useDisableBodyScrollOnModalOpen = (open) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);
};