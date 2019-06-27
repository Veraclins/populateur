import { humanize } from '.';

export const checkForRequiredFields = (body, requiredFields) => {
  const errors = {};
  const fields = {};

  // Removes empty spaces
  Object.entries(body).forEach(([key, value]) => {
    fields[key] = value.toString().trim();
  });
  // Checks that all required fields are present
  requiredFields.forEach(field => {
    if (!(field in fields)) {
      errors[field] = [humanize(`${field} is required`)];
    }
  });
  // throws the error (if any)
  if (Object.keys(errors).length !== 0) {
    return errors;
  }
  return false;
};

export const validateLocation = body => {
  const { name, male, female } = body;
  const errors = {};
  if (male && !Number(male)) {
    errors.male = ['male must be a number (the male population)'];
  }
  if (female && !Number(female)) {
    errors.male = ['female must be a number (the female population)'];
  }
  if (name && name.length < 3) {
    errors.message = ['name should be at least three (3) characters'];
  }
  if (Object.keys(errors).length !== 0) {
    return errors;
  }
  return false;
};

export const validateUser = body => {
  const { username, password } = body;
  const errors = {};
  if (username && username.length < 3) {
    errors.message = ['username should be at least three (3) characters'];
  }
  if (password && password.length < 6) {
    errors.message = ['password should be at least six (6) characters'];
  }
  if (Object.keys(errors).length !== 0) {
    return errors;
  }
  return false;
};
