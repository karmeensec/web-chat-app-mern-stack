const formidable = require("formidable");
const validator = require("validator");

module.exports.userRegister = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (error, fields, files) => {
    console.log("Fields: ", fields);
    console.log("Files: ", files);

    const { userName, email, password, confirmPassword } = fields;
    const { image } = files;
    const errorMessage = [];

    if (!userName) {
      errorMessage.push("Please add your username!");
    }

    if (!email) {
      errorMessage.push("Please add your email!");
    }

    if (email && validator.isEmail(email)) {
      errorMessage.push("Please add your valid email!");
    }

    if (!password) {
      errorMessage.push("Please add your password!");
    }

    if (!confirmPassword) {
      errorMessage.push("Please confirm your password!");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errorMessage.push("Passwords did not match!");
    }

    if (password && password.length < 8) {
      errorMessage.push("Password must be at least 8 characters!");
    }

    if (Object.keys(files).length === 0) {
      errorMessage.push("Please add your image!");
    }

    if (errorMessage.length > 0) {
      res.status(400).json({
        errorMessage: {
          errMessage: errorMessage,
        },
      });
    }
  });

  console.log("Register is called");
};
