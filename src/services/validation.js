function validateEmail(value) {
  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return "Email is not valid";
  }

  return "";
}

function validatePassword(value) {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 8) {
    return "At least 8 characters";
  }

  return "";
}

export const validationService = { validateEmail, validatePassword };
