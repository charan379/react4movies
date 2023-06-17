export default function isNonEmptyString(str, maxLength, minLength = 1) {
    return typeof str === 'string' && str.trim().length > 0 && str.length <= maxLength && str.length >= minLength;
}