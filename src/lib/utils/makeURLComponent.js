function makeURLComponent(url) {
    try {
        let newUrl = url;
        // Replace any non-alphanumeric characters with a hyphen
        newUrl = newUrl?.replace(/[^a-zA-Z0-9]/g, "-");

        // Convert all characters to lowercase
        newUrl = newUrl?.toLowerCase();

        // Add slashes to separate the different parts of the URL
        newUrl = newUrl?.replace(/^-+/, "").replace(/-+$/, "").replace(/-+/g, "-");

        return newUrl;
    } catch (error) {
        console.log(error);
        return url;
    }
}

export default makeURLComponent;
