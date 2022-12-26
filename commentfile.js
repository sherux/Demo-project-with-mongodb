//---------------------forget password-------------------
// if (!user) return res.status(400).json("email not exist");
// const token = await Token.findOne({ userId: User.id });
// if (!token) {
//   token = await new Token({
//     userId: User.id,
//     token: crypto.randomBytes(32).toString("hex"),
//   }).save();
// }

// const link = `http://localhost:3000/api/users/Reset-password?${token}`;
// console.log(link);
// await mail(user.email, link);
// res.send("send link your email");

// let token = await Token.findOne({ userId: user._id });
// if (!token) {
//   token = await new Token({
//     userId: user._id,
//     token: crypto.randomBytes(32).toString("hex"),
//   }).save();
// }

// const link = `http://localhost:5000/api/users/Reset-password${token}`;
// console.log(link);
// await mail(user.email, "Password reset", link);

// res.send("password reset link sent to your email account");

// ------------------------------reset pasword---------

// try {
//   const user = await User.findOne({ _id: req.params.id });
//   if (!user) return res.status(400).send("invalid link or expired");
//   const token = await Token.findOne({
//     userId: user._id,
//     token: req.params.token,
//   });
//   if (token) {
//     // res.status(200).json("valid url");
//     // return res.status(400).send("invalid link or or expired");
//     const newpassword = await bcrypt.hash(req.body.password, 12);
//     user.password = newpassword;
//     await user.save();
//     await token.delete();
//     res.send("password reset sucessfully.");
//   }
// } catch (error) {
//   res.send("An error occured");
//   res.send(error.message);
// }

// ---------------------------------update password---------------------
// try {
//   const user_id = req.body.user_id;
//   const password = req.body.password;

//   if (user_id === "") return res.status(400).json("please enter user_id");
//   const data = await User.findOne({ _id: user_id });
//   if (data) {
//     const updatepassword = await bcrypt.hash(password, 12);
//     const userdata = await User.findByIdAndUpdate(
//       { _id: user_id },
//       {
//         $set: {
//           password: updatepassword,
//         },
//       }
//     );
//     res.status(200).json({ message: "password succesfully updated" });
//   } else {
//     res.status(200).json({ message: "User id not found" });
//   }

// schema
// orderID: {
//   type: String,
// },
// paymentID: {
//   type: String,
// },
// paymentSignature: {
//   type: String,
// },

// schema

// customer: {
//   authID: {
//     type: String,
//     required: true,
//   },
//   databaseID: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
// }

// LOGIN
// -----------------------------------staff a login--------------------------------------
// const logindata = async (req, res) => {
//     const { error } = loginvalidation(req.body);
//     if (error) {
//       res.send(error.details[0].message);
//       return;
//     }
//     //checking email exist or not

//     const staffs = await Staff.findOne({ staff_email: req.body.staff_email });
//     if (!staffs) return res.status(400).json("email is not found");

//     //   password check
//     const validpass = await bcrypt.compare(
//       req.body.staff_password,
//       staffs.staff_password
//     );
//     if (!validpass) return res.status(400).json("invalid password");

//     // ------------------------------create token and assign--------------------------------------

//     const token = jwt.sign({ id: staffs.id }, process.env.SECRET_TOKEN3, {
//       expiresIn: "7d",
//     });
//     res
//       .header("staff-token", token)
//       .json({ message: "login successfully", token: token });
//   };

// const sum = (a, ...b) => {
//   console.log(b);
// };
// sum(4, 5, 7, 8, 1, 2, 3);

// const p1 = await Permission.updateMany(
//   { role_id: element.role_id, module_id: element.module_id },

//   {
//     $set: {
//       role_id: element.role_id,
//       module_id: element.module_id,
//       permission_add: element.permission_add,
//       permission_edit: element.permission_edit,
//       permission_delete: element.permission_delete,
//       permission_view: element.permission_view,
//     },
//   }
// );

// const staffauth = async (req, res, next, module_id) => {
//   const token = req.header("staff-token");
//   if (!token) return res.status(401).json("");

//   try {
//     const varifield = jwt.verify(token, process.env.SECRET_TOKEN3);
//     req.staffs = varifield;
//     const getid = varifield.id;
//     const v = await staff.find({ _id: { $in: getid } });

//     const getroleid = v[0].roleId;
//     const v2 = await permission.find({
//       role_id: { $in: getroleid },
//     });
//     // console.log(v2);

//     var allow = false;
//     v2.forEach((element) => {
//       // console.log(element.module_id);
//       if (
//         element.module_id == module_id &&
//         req.method == "POST" &&
//         element.permission_add
//       )
//         allow = true;
//       else if (
//         element.module_id == 2 &&
//         req.method === "GET" &&
//         element.permission_view
//       )
//         allow = true;
//       else if (
//         element.module_id == 2 &&
//         req.method === "PUT" &&
//         element.permission_edit
//       )
//         allow = true;
//       else if (
//         element.module_id == 2 &&
//         req.method === "DELETE" &&
//         element.permission_delete
//       )
//         allow = true;
//     });
//     if (allow) next();
//     else {
//       return res.json("you don't have permision");
//     }
//   } catch (err) {
//     res.status(400).json("staff_id not found  ");
//   }
// };

// look up

// const v = await Order.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "_id",
//         foreignField: "user",
//         as: "users",
//       },
//     },
// {
//   $project: { user_mobile: 1, user_name: 1 },
// },
//   ]);

// ------------------dagsk[p-]
// const menu = await Menu.find({});

//     const order = await Order.find({});
//     const customer = await User.find();

//     const totalorderpending = await Order.find({
//       status: { $in: ["pending"] },
//     });
//     const totalorderpreparing = await Order.find({
//       status: { $in: ["preparing"] },
//     });
//     const totalordercancelled = await Order.find({
//       status: { $in: ["cancelled"] },
//     });
//     const totalorderrejected = await Order.find({
//       status: { $in: ["rejected"] },
// });
// const totalordercompleted = await Order.find({
//   status: { $in: ["completed"] },
// });

// const obj = {
//   totalorderpending: totalorderpending.length,
//   totalorderpreparing: totalorderpreparing.length,
//   totalordercancelled: totalordercancelled.length,
//   totalorderrejected: totalorderrejected.length,
//   totalordercompleted: totalordercompleted.length,
// };
// res.status(200).json({
//   message: "data fetch succesfully",
//   totalmenus: menu.length,
//   totalorders: order.length,
//   totalcustomers: customer.length,
//   data: obj,
// });
