export default function isValidURL(url) {
    // Regular expression pattern for URL validation
    var pattern = new RegExp('^(https?|ftp):\\/\\/(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,})(:\\d+)?([\\/\\?#].*)?$', 'i');
    return pattern.test(url);
}