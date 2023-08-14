const formidable = require("formidable");

module.exports.userRegister = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (error, field, files) => {
    console.log("Fields: ", field);
    console.log("Files: ", files);
  });

  console.log("Register is called");
};
