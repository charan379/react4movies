export default function isNonEmptyString(str, maxLength) {
    return typeof str === 'string' && str.trim().length > 0 && str.length <= maxLength;
}