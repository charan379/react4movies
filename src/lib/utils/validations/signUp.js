import isValidEmail from "./Validators/isValidEmail";
import isValidPassword from "./Validators/isValidPassword";
import isValidUserName from "./Validators/isValidUserName";

const signupValidations = {
    validUsername: isValidUserName,
    validEmail: isValidEmail,
    validPassword: isValidPassword,
}

export default signupValidations;

