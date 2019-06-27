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
  if (!Number(male)) {
    errors.male = ['male must be a number (the male population)'];
  }
  if (!Number(female)) {
    errors.male = ['female must be a number (the female population)'];
  }
  if (name.length < 3) {
    errors.message = ['name should be at least three (3) characters'];
  }
  if (Object.keys(errors).length !== 0) {
    return errors;
  }
  return false;
};
