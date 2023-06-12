function makeURLComponent(url) {
    try {
        let newUrl;
        // Replace any non-alphanumeric characters with a hyphen
        newUrl = url.replace(/[^a-zA-Z0-9]/g, "-");

        // Convert all characters to lowercase
        newUrl = url.toLowerCase();

        // Add slashes to separate the different parts of the URL
        newUrl = url.replace(/^-+/, "").replace(/-+$/, "").replace(/-+/g, "-");

        return newUrl;
    } catch (error) {
        console.log(error);
        return url;
    }
}

export default makeURLComponent;
