const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.schema");

const nodeMailer = require("nodemailer");
const {
  registervalidation,
  loginvalidation,
  updatevalidation,
  changepassvalidation,
  resetpasswordvalidation,
} = require("../validation/users.validation");

// ------------------------------send mail----------------------------------
const send = async (user, token) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true, // use SSL

      auth: {
        user: process.env.USER,
        pass: process.env.PASS2,
      },
    });

    const link = `http://localhost:5000/user/Reset-password?${token}`;
    console.log(link);
    const mailoptions = {
      from: process.env.USER,
      to: process.env.USER,
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
    console.log({ message: "email not sent" });
  }
};
// ---------------------serching api--------------------
const getSerachData = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const useralldata = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (req.body.user_name || req.body.user_email) {
      const user = await User.find({
        $or: [
          {
            user_name: { $regex: `${req.body.user_name}` },
          },
          {
            user_email: { $regex: `${req.body.user_email}` },
          },
        ],
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      if (user == "") {
        return res.status(200).json({
          message: "sorry,Data not found ",
        });
      } else {
        return res.status(200).json({
          message: "user data fetch succesfully ",
          totaluser: user.length,
          data: user,
        });
      }
    } else {
      return res.status(200).json({
        message: "user data fetch succesfully ",
        totaluser: useralldata.length,
        data: useralldata,
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "sorry,users are not found", data: err.message });
  }
};
//---------------------------- authentication--------------------------------------------
const auth = (req, res) => {
  res.status(200).json({ message: "user authentication", users: req.users });
};

// ---------------------------getall data-------------------------------------------
const getalldata = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const users = await User.find()
      .sort({ user_name: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "users data fetch succesfully", data: users });
  } catch (err) {
    res.status(400).json({ message: "sorry,users are not found" });
  }
};
//---------------------------------------get data by id-------------------------------------
const getonedata = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res
      .status(200)
      .json({ message: "user data fetch succesfully", data: user });
  } catch (err) {
    res.status(400).json({ message: "sorry,users are not found" });
  }
};
// -------------------register api------------------------
const registerdata = async (req, res) => {
  const { error } = registervalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  //checking email exist or not
  console.log(req.body);
  const emailexist = await User.findOne({ user_email: req.body.user_email });
  if (emailexist)
    return res.status(400).json({ message: "email alredy exists" });

  // hashpassword
  const hashpassword = await bcrypt.hash(req.body.user_password, 12);

  const users = new User({
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_password: hashpassword,
    user_mobile: req.body.user_mobile,
    user_gender: req.body.user_gender,
    user_country: req.body.user_country,
    user_city: req.body.user_city,
    user_img: req.file.location,
  });
  try {
    const user1 = await users.save();
    res.status(200).json({ message: "user create succesfully", data: user1 });
  } catch (err) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
const logout = async (req, res) => {
  try {
    const userId = req.users.id;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.token = null;
    user.save();
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------user login api--------------------------------------
const logindata = async (req, res) => {
  const { error } = loginvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  //checking email exist or not

  const users = await User.findOne({ user_email: req.body.user_email });
  if (!users) return res.status(400).json({ message: "email is not found" });
  //   password check
  const validpass = await bcrypt.compare(
    req.body.user_password,
    users.user_password
  );
  if (!validpass) return res.status(400).json({ message: "invalid password" });

  // ------------------------------create token--------------------------------------

  const token = jwt.sign({ id: users.id }, process.env.SECRET_TOKEN, {
    expiresIn: "365d",
  });
  console.log(process.env.SECRET_TOKEN);
  res
    .header("auth-token", token)
    .json({ message: "login successfully", token: token });
};

// -----------------------------------update data----------------------------------------------
const UpdateData = async (req, res) => {
  const { error } = updatevalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  try {
    if (req.file.location) {
      const users = {
        user_mobile: req.body.user_mobile,
        user_country: req.body.user_country,
        user_city: req.body.user_city,
        user_img: req.file.location,
      };
      console.log(users);
      const updatedusers = await User.findByIdAndUpdate(req.params.id, users);
      res
        .status(200)
        .json({ message: "user is succesfully updated", data: updatedusers });
    } else {
      const users = {
        user_mobile: req.body.user_mobile,
        user_country: req.body.user_country,
        user_city: req.body.user_city,
      };
      console.log(users);
      const updatedusers = await User.findByIdAndUpdate(req.params.id, users);
      res
        .status(200)
        .json({ message: "user is succesfully updated", data: updatedusers });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// -----------------------------------delete data-----------------------------------------------
const DeleteData = async (req, res) => {
  try {
    const deletusers = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user is succesfully deleted");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// -----------------------------------------updated password-----------------------------------
const changepassword = async (req, res) => {
  const { error } = changepassvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  try {
    const user_id = req.body.user_id;
    const user_oldpassword = req.body.oldpassword;
    const user_newpassword = req.body.newpassword;

    if (user_id === "") return res.status(400).json("please enter user_id");

    const user = await User.findOne({ _id: user_id });

    const current_user = user.user_password;

    if (bcrypt.compareSync(req.body.oldpassword, current_user)) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);

      await User.updateOne(
        {
          _id: User._id,
        },
        {
          password: hashedPassword,
        }
      );
      user.user_password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "password has been updated" });
    } else {
      res.status(200).json({ message: "incorrect old password" });
    }
  } catch (err) {
    res.status(400).json({ message: "sorry,users are not found" });
  }
};
// ------------------------------------------forget password- (enter a password real email id)----------------------------------
const forgetpassword = async (req, res) => {
  try {
    const user = await User.findOne({ user_email: req.body.user_email });
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.PASS);

      const data = await User.updateOne(
        { user_email: req.body.user_email },
        { $set: { token: token } }
      );

      await send(user.user_email, token);
      res.status(200).json({ message: "check your email" });
    } else {
      res.status(200).json({ message: "email not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "sorry,users are not found" });
  }
};
// ---------------------------------reset password------------------------------------
const resetpassword = async (req, res) => {
  const { error } = resetpasswordvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  try {
    const token = req.query.token;
    const tokendata = await User.findOne({ token: token });
    if (tokendata) {
      const password = req.body.user_password;
      const newpassword = await bcrypt.hash(password, 12);
      const usernewdata = await User.findByIdAndUpdate(
        { _id: tokendata._id },
        { $set: { user_password: newpassword, token: "" } },
        { new: true }
      );
      usernewdata.save();
      console.log(usernewdata, "usernewdata");
      res
        .status(200)
        .json({ message: " password reset succesfully", data: usernewdata });
    } else {
      res.status(200).json({ message: "link is expired" });
    }
  } catch (err) {
    res.status(400).json({ message: "sorry,users are not found" });
  }
};

//  ------------------------------------------------ module export----------------------------------
module.exports = {
  auth,
  getalldata,
  getSerachData,
  getonedata,
  registerdata,
  logindata,
  UpdateData,
  DeleteData,
  changepassword,
  forgetpassword,
  resetpassword,
  logout,
};
