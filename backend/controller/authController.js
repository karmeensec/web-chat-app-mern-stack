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

    const userName = fields.userName[0];
    const email = fields.email[0];
    const password = fields.password[0];
    const confirmPassword = fields.confirmPassword[0];
    const { image } = files;
    const errorMessage = [];

    console.log("ThisImage:", image);

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
          errorMessage: errorMessage,
        },
      });
    } else {
      const filesImage = files.image[0];
      console.log("files image: ", filesImage);

      const imageName = filesImage.originalFilename;
      console.log("IMage name: ", imageName);

      const randomNumber = Math.floor(Math.random() * 99999);
      const newImageName = randomNumber + imageName;

      console.log("New image name: ", newImageName);

      filesImage.originalFilename = newImageName;

      const newPath =
        __dirname +
        `../../../frontend/public/images/${filesImage.originalFilename}`;

      console.log("New Path: ", newPath);

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
          console.log("Filepath: ", filesImage.filepath);
          fs.copyFile(filesImage.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerSchema.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: filesImage.originalFilename,
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
