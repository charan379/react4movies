export default function isValidPassword(password) {
    // Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character
    // Regular expression pattern for password validation
    var pattern = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,26})/);
    return pattern.test(password);
}