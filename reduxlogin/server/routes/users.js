import express from 'express';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
import bcrypt from 'bcrypt';

import User from '../models/user';

let router = express.Router();

const validateInput = (data) => {
  let errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "The field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "The field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "The field is required";
  }

  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "The field is required";
  }

  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (isValid) {
    const { username, password, email } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);

    User.forge({
      username, password_digest, email
    }, { hasTimestamps: true }).save()
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ errors: err }))
  } else {
    res.status(400).json(errors);
  }
});

export default router;