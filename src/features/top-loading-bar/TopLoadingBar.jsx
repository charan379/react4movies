import React, { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useProgressBar } from 'hooks';

const TopLoadingBar = () => {
    // Use the `useProgressBar` hook to get the current progress and reset function.
    const { currentProgress, resetProgressBar } = useProgressBar();

    // Use state to keep track of the progress and update it when it changes.
    const [progress, setProgress] = useState(currentProgress?.progress ?? 0);

    useEffect(() => {
        // Update the progress when the `currentProgress` changes.
        setProgress(currentProgress?.progress ?? 0);
    }, [currentProgress?.progress]);

    return (
        <div>
            {/* Render the `LoadingBar` component with the progress and a few options. */}
            <LoadingBar
                color='#f11946'
                progress={progress}
                height={3}
                // Call the `resetProgressBar` function when the loader finishes.
                onLoaderFinished={() => {
                    setProgress(0);
                    resetProgressBar();
                }}
            />
        </div>
    );
};

export { TopLoadingBar };
