import isNonEmptyString from "./Validators/isNonEmptyString";
import isValidURL from "./Validators/isValidURL";

const linkValidations = {
    validateUrl: isValidURL,
    validStringInput: isNonEmptyString,
}

export default linkValidations;

