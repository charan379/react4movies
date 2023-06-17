import isNonEmptyString from "./Validators/isNonEmptyString";
import isValidEmail from "./Validators/isValidEmail";
import isValidPassword from "./Validators/isValidPassword";

const signupValidations = {
    validUsername: isNonEmptyString,
    validEmail: isValidEmail,
    validPassword: isValidPassword,
}

export default signupValidations;

