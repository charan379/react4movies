export default function isValidURL(url) {
    // Regular expression pattern for URL validation
    var pattern = new RegExp('^https?:\\/\\/([a-z0-9\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w\\.-]*)*\\/?$', 'i');
    return pattern.test(url);
}