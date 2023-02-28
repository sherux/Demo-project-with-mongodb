const Staff = require("../models/staffschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const {
  registervalidation,
  loginvalidation,
  updatevalidation,
  changepassvalidation,
  resetpasswordvalidation,
} = require("../validation/staff.validation");
// ------------------mail sent---------
const send = async (staff_email, token) => {
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

    const link = `http://localhost:5000/staff/Reset-password?${token}`;
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
    console.log({ message: "mail not sent" });
  }
};
// ---------------------------------authentication------------------
const auth = (req, res) => {
  res.json({ message: "user authentication", staffs: req.staffs });
};

// ----------------------------------get all data-----------------
const getalldata = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const staffs = await Staff.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "staffs data fetch succesfully", data: staffs });
  } catch (err) {
    res.status(400).json({ message: "sorry,staffs are not found" });
  }
};
//---------------------------------------get a one data--------------
const getonedata = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    res
      .status(200)
      .json({ message: "staff data fetch succesfully", data: staff });
  } catch (err) {
    res.status(400).json({ message: "sorry,staffs are not found" });
  }
};
//---------------------------- employee register and create data-------
const registerdata = async (req, res) => {
  const { error } = registervalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  //------checking email exist or not------------------

  const emailexist = await Staff.findOne({ staff_email: req.body.staff_email });
  if (emailexist)
    return res.status(400).json({ message: "email alredy exists" });

  // -------------------hashpassword--------------
  const hashpassword = await bcrypt.hash(req.body.staff_password, 12);

  const staffs = new Staff({
    roleId: req.body.role_id,
    staff_name: req.body.staff_name,
    staff_email: req.body.staff_email,
    staff_password: hashpassword,
    staff_mobile: req.body.staff_mobile,
    staff_gender: req.body.staff_gender,
    staff_address: req.body.staff_address,
    staff_city: req.body.staff_city,
  });
  try {
    const staff1 = await staffs.save();
    res
      .status(200)
      .json({ message: "staffs create succesfully", data: staffs });
  } catch (err) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
// -------------------------------staff login----------------------------

const logindata = async (req, res) => {
  const { error } = loginvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  //checking email exist or not

  const staffs = await Staff.findOne({ staff_email: req.body.staff_email });
  if (!staffs) return res.status(400).json({ message: "email is not found" });
  //   password check
  const validpass = bcrypt.compare(
    req.body.staff_password,
    staffs.staff_password
  );
  if (!validpass) return res.status(400).json({ message: "invalid password" });
  // -----------------------------------------token------------------------
  const token = jwt.sign({ id: staffs.id }, process.env.SECRET_TOKEN3, {
    expiresIn: "365d",
  });

  res.header("staff-token", token).status(400).json({
    message: "login successfully",
    staff_token: token,
  });
};
// ----------------------------------------update data-----------------------

const UpdateData = async (req, res) => {
  const { error } = updatevalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  try {
    const staffs = {
      staff_mobile: req.body.staff_mobile,
      staff_address: req.body.staff_address,
      staff_city: req.body.staff_city,
    };
    const updatedstaffs = await Staff.findByIdAndUpdate(req.params.id, staffs);
    res.status(200).json("staff is succesfully updated");
  } catch (err) {
    res.status(400).json({ message: "sorry,staff is not found" });
  }
};

// -------------------------delete data-----------------------------------------

const DeleteData = async (req, res) => {
  try {
    const deletstaffs = await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json("staff is succesfully  delete");
  } catch (err) {
    res.status(400).json({ message: "sorry,staff is not found" });
  }
};

// ---------------------------------------update password -----------------------
const changepassword = async (req, res) => {
  const { error } = changepassvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  try {
    const staff_id = req.body.staff_id;
    const staff_oldpassword = req.body.oldpassword;
    const staff_newpassword = req.body.newpassword;

    if (staff_id === "") return res.status(400).json("please enter staff_id");

    const staffpassword = await Staff.findOne({ _id: staff_id });

    const current_staff = staffpassword.staff_password;

    if (bcrypt.compare(req.body.oldpassword, current_staff)) {
      const hashedPassword = await bcrypt.hash(req.body.newpassword, 12);

      await Staff.updateOne(
        {
          _id: Staff._id,
        },
        {
          password: hashedPassword,
        }
      );
      staffpassword.staff_password = hashedPassword;
      await staffpassword.save();

      return res.status(200).json({ message: "password has been updated" });
    } else {
      res.status(200).json({ message: "incorrect old password" });
    }
  } catch (err) {
    res.status(400).json({ message: "sorry,staffs are not found" });
  }
};
// ---------------------------forget password---------------------------------
const forgetpassword = async (req, res) => {
  try {
    const staff = await Staff.findOne({ staff_email: req.body.staff_email });
    if (staff) {
      const token = jwt.sign({ _id: staff._id }, process.env.PASS);

      const data = await Staff.updateOne(
        { staff_email: req.body.staff_email },
        { $set: { staff_token: token } }
      );

      await send(staff.staff_email, token);
      res.status(200).json({ message: "check your email" });
    } else {
      res.status(200).json({ message: "email not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "sorry,staffs are not found" });
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
    const tokendata = await Staff.findOne({ staff_token: token });
    if (tokendata) {
      const password = req.body.staff_password;
      const newpassword = await bcrypt.hash(password, 12);
      const usernewdata = await Staff.findByIdAndUpdate(
        { _id: tokendata._id },
        { $set: { staff_password: newpassword, staff_token: "" } },
        { new: true }
      );
      usernewdata.save();

      res.status(200).json({ message: "staff password updated" });
    } else {
      res.status(200).json({ message: "link is expired" });
    }
  } catch (err) {
    res.status(400).json({ message: "sorry,staffs are not found" });
  }
};
// -------------------------------------module expert--------------------------
module.exports = {
  auth,
  getalldata,
  getonedata,
  registerdata,
  UpdateData,
  DeleteData,
  logindata,
  changepassword,
  forgetpassword,
  resetpassword,
};
