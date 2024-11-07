import bcrypt from "bcrypt";

// Hashing password
export const encryptPass = (pass) => {
  // Returning promise
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(pass, salt, function (err, hash) {
        // Check for error
        if (err) reject(err);

        resolve(hash);
      });
    });
  });
};

//! Decrypt password
export const decryptPass = (dataPass, userPass) => {
  // Return promise
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPass, dataPass, function (err, result) {
      if (err) reject(err);

      resolve(result);
    });
  });
};
