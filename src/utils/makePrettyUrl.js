function makePrettyUrl(url) {
  // Replace any non-alphanumeric characters with a hyphen
  url = url.replace(/[^a-zA-Z0-9]/g, "-");

  // Convert all characters to lowercase
  url = url.toLowerCase();

  // Add slashes to separate the different parts of the URL
  url = url.replace(/^-+/, "").replace(/-+$/, "").replace(/-+/g, "-");

  return url;
}

export default makePrettyUrl;
