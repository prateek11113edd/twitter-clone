exports.validateRegisterData = (body) => {
  const { firstname, lastname, username, email, password } = body;

  const errors = {};

  if (!firstname || typeof firstname !== "string") {
    errors.firstname = "Firstname cannot be empty";
  }

  if (!lastname || typeof lastname !== "string") {
    errors.lastname = "lastname cannot be empty";
  }

  if (!username || typeof username !== "string") {
    errors.username = "username cannot be empty";
  }

  if (!email || typeof email !== "string") {
    errors.email = "email cannot be empty";
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    errors.emailFormat = "Invalid email";
  }

  if (!password || typeof password !== "string") {
    errors.password = "password cannot be empty";
  }

  if (password < 6) {
    errors.passwordLength = "password length cannot be less than 6";
  }

  const valid = Object.keys(errors).length < 1;

  return { errors, valid };
};

exports.validateLoginData = (body) => {
  const { username, password } = body;

  const errors = {};

  if (!username || typeof username !== "string") {
    errors.username = "username cannot be empty";
  }

  if (!password || typeof password !== "string") {
    errors.password = "password cannot be empty";
  }

  const valid = Object.keys(errors).length < 1;

  return { errors, valid };
};
