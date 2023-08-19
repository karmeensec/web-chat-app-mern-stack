const formidable = require("formidable");
const validator = require("validator");
const registerSchema = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");

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

    if (email && !validator.isEmail(email)) {
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

    if (password && password.length < 5) {
      errorMessage.push("Password must be at least 8 characters!");
    }

    if (Object.keys(files).length === 0) {
      errorMessage.push("Please add your image!");
    }

    if (errorMessage.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const imageName = files.image.originalFilename;
      console.log(imageName);

      const randomNumber = Math.floor(Math.random() * 99999);
      const newImageName = randomNumber + imageName;

      console.log(newImageName);

      files.image.originalFilename = newImageName;

      const newPath =
        __dirname +
        `../../../frontend/public/images/${files.image.originalFilename}`;

      try {
        const checkUser = await registerSchema.findOne({
          email: email,
        });

        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Your email address is already exists."],
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerSchema.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename,
              });
              console.log("Registered successfully!", userCreate);
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Internal Server Error"],
          },
        });
      }
    }
  });

  console.log("Register is called");
};
