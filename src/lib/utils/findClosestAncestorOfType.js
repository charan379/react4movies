/**
 * Recursively finds the closest ancestor element of the specified type in the DOM tree.
 * @param {htmlElement} element - The current element being checked.
 * @param {string} requiredElementType - The type of element (HTML tag name) to search for.
 * @param {number} limit - The maximum number of levels to traverse.
 * @returns {htmlElement|null} The closest ancestor element of the specified type if found, or null if not found within the specified limit.
 */
const findClosestAncestorOfType = (element, requiredElementType, limit) => {
    if (limit === 0) {
        return null;
    }

    if (element?.nodeName === requiredElementType) {
        return element;
    } else {
        return findClosestAncestorOfType(element?.parentNode, requiredElementType, --limit);
    }
};


export default findClosestAncestorOfType;