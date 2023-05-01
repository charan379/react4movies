import empty from "assets/empty.svg"; // default image source

/**
 * Handle error when loading an image by setting the source to a default image.
 * @param {Object} image - The image object that failed to load.
 */
const handleImageError = ({ image, setIsLoading }) => {
    // Remove the onerror event to avoid infinite loops if the default image also fails to load.
    image.target.onerror = null;
    // Set the source of the failed image to the default image source.
    image.target.src = empty;

    setIsLoading(false)
};

export { handleImageError };