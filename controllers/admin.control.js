const Admin = require("../models/admin.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createvalidation,
  loginvalidation,
  changepassvalidation,
  resetpasswordvalidation,
} = require("../validation/admin.validation");
const nodeMailer = require("nodemailer");
// ------------------------------------mail set---------------------------
const send = async (admin_email, token) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      requireTLS: true,

      auth: {
        user: process.env.emailuser,
        pass: process.env.emailpassword,
      },
    });

    const link = `http://localhost:5000/admin/Reset-password?${token}`;
    console.log(link);
    const mailoptions = {
      from: process.env.emailuser,
      to: process.env.email,
      subject: "for Reset password",
      text: link,
    };
    transporter.sendMail(mailoptions, (err, info) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("mail has been sent:", info.response);
      }
    });
  } catch (err) {
    res.status(400).json({ message: "mail is not sent" });
  }
};
// ------------------------------------authentication-------------------
const adminauth = (req, res) => {
  res.status(200).json({ message: "user authentication", admins: req.admins });
};
// -------------------------------------------getone data---------------
const getdata = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res
      .status(200)
      .json({ message: "admin data fetch succesfully", data: admin });
  } catch (error) {
    res.status(400).json({ message: " admin data not found" });
  }
};
// -------------------------------------------getall data---------------
const getalldata = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const admins = await Admin.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "admins data fetch succesfully ", data: admins });
  } catch (error) {
    res.status(400).json({ message: " admin data not found" });
  }
};
// -----------------------------------------create data------------------

const createdata = async (req, res) => {
  const { error } = createvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  //checking email exist or not

  const emailexist = await Admin.findOne({ admin_email: req.body.admin_email });
  if (emailexist)
    return res.status(400).json({ message: "email alredy exists" });

  // hashpassword
  const hashpassword = await bcrypt.hash(req.body.admin_password, 12);

  const admins = new Admin({
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_password: hashpassword,
  });
  try {
    const admin = await admins.save();
    res.status(200).json({ message: "admin data create ", data: admin });
  } catch (err) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
// ---------------------delete admin------------
const DeleteData = async (req, res) => {
  try {
    const adminusers = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "data is successfully delete" });
  } catch (err) {
    res.status(400).json({ message: "data is not found" });
  }
};

// -------------------------------------------admin login----------------------
const logindata = async (req, res) => {
  const { error } = loginvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  //checking email

  const admins = await Admin.findOne({ admin_email: req.body.admin_email });
  if (!admins) return res.status(400).json({ message: "email is not found" });
  //   password check
  const validpass = await bcrypt.compare(
    req.body.admin_password,
    admins.admin_password
  );
  if (!validpass) return res.status(400).json({ message: "invalid password" });
  // -----------------------------------------token------------------------
  const token = jwt.sign({ id: admins.id }, process.env.SECRET_TOKEN2, {
    expiresIn: "365d",
  });
  res
    .header("admin-token", token)
    .status(200)
    .json({ message: "login successfully", token: token });
};

// ---------------------------------------update password -----------------------
const changepassword = async (req, res) => {
  const { error } = changepassvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  try {
    const admin_id = req.body.admin_id;
    const admin_oldpassword = req.body.oldpassword;
    const admin_newpassword = req.body.newpassword;

    if (admin_id === "")
      return res.status(400).json({ message: "please enter admin_id" });

    const adminpassword = await Admin.findOne({ _id: admin_id });

    const current_admin = adminpassword.admin_password;

    if (bcrypt.compareSync(req.body.oldpassword, current_admin)) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);

      await Admin.updateOne(
        {
          _id: Admin._id,
        },
        {
          password: hashedPassword,
        }
      );
      adminpassword.admin_password = hashedPassword;
      await adminpassword.save();

      return res.status(200).json({ message: "password has been updated" });
    } else {
      res.status(200).json({ message: "incorrect old password" });
    }
  } catch (err) {
    res.status(400).json({ message: "admin data not found" });
  }
};
// ---------------------------forget password---------------------------------
const forgetpassword = async (req, res) => {
  try {
    const admin = await Admin.findOne({ admin_email: req.body.admin_email });
    if (admin) {
      const token = jwt.sign({ _id: admin._id }, process.env.PASS);

      const data = await Admin.updateOne(
        { admin_email: req.body.admin_email },
        { $set: { token: token } }
      );

      await send(admin.admin_email, token);
      res.status(200).json({ message: "please,check your email" });
    } else {
      res.status(200).json({ message: "email not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "please,enter your email id" });
  }
};
// -------------------------------reset password------------------------
const resetpassword = async (req, res) => {
  const { error } = resetpasswordvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  try {
    const token = req.query.token;
    const tokendata = await Admin.findOne({ token: token });
    if (tokendata) {
      const password = req.body.admin_password;
      const newpassword = await bcrypt.hash(password, 12);
      const usernewdata = await Admin.findByIdAndUpdate(
        { _id: tokendata._id },
        { $set: { admin_password: newpassword, token: "" } },
        { new: true }
      );
      usernewdata.save();

      res.status(200).json({ message: "admin password successfully updated" });
    } else {
      res.status(200).json({ message: "link is expired" });
    }
  } catch (err) {
    res.status(400).json(message.err);
  }
};
// -------------------------------------------delated data----------------------

module.exports = {
  adminauth,
  getdata,
  getalldata,
  createdata,
  DeleteData,
  logindata,
  changepassword,
  forgetpassword,
  resetpassword,
};
