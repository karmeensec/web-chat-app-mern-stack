const formidable = require("formidable");
const validator = require("validator");
const registerSchema = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ********User Register******** */

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

              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  userName: userCreate.userName,
                  image: userCreate.image,
                  registerTime: userCreate.createdAt,
                },
                process.env.SECRET_KEY,
                { expiresIn: process.env.TOKEN_EXP }
              );

              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                ),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Registration successful",
                token,
              });

              console.log("TOKEN! : ", token);
              console.log("Registered successfully!", userCreate);
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server Error"],
                },
              });
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

/* ********User Login******** */

module.exports.userLogin = async (req, res) => {
  console.log("Req Body: ", req.body);

  const errorMessage = [];

  const { email, password } = req.body;

  if (!email) {
    errorMessage.push("Please add your email!");
  }

  if (!password) {
    errorMessage.push("Please add your password!");
  }

  if (email && !validator.isEmail(email)) {
    errorMessage.push("Please add your valid email!");
  }

  if (errorMessage.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: errorMessage,
      },
    });
  } else {
    try {
      const checkUser = await registerSchema
        .findOne({
          email: email,
        })
        .select("+password");

      console.log("Login Check User: ", checkUser);

      if (checkUser) {
        const matchPwd = await bcrypt.compare(password, checkUser.password);

        if (matchPwd) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXP }
          );

          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
            ),
          };

          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Login successful",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Your password is not valid!"],
            },
          });
        }
      } else {
        res.status(400).json({
          error: {
            errorMessage: ["Your email not found!"],
          },
        });
      }
    } catch (error) {
      res.status(404).json({
        error: {
          errorMessage: ["Not found!!!"],
        },
      });
    }
  }

  console.log("Login is called");
};

module.exports.userLogout = async (req, res) => {
  res.status(200).cookie("authToken", "").json({
    successMessage: "Logout successful",
  });
};
