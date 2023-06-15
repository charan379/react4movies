/**
 * Handle error when loading an image by setting the source to a default image.
 * @param {Object} image - The image object that failed to load.
 */
const handleNextJSImageError = ({ image, setImageSrc, setIsLoading = null }) => {
    // Remove the onerror event to avoid infinite loops if the default image also fails to load.
    image.target.onerror = null;
    // Set the source of the failed image to the default image source.
    setImageSrc('/images/empty.svg')

    if (setIsLoading instanceof Function) {
        setIsLoading(false)
    }
};

export default handleNextJSImageError;