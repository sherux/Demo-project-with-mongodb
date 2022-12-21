const Joi = require("joi");
// -------------------------------createvalidation----------------------
const createvalidation = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string().trim().min(3).required(),
    admin_email: Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    admin_password: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};

// -------------------------------loginlidation----------------------

const loginvalidation = (data) => {
  const schema = Joi.object({
    admin_email: Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    admin_password: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};

// -------------------------------changepassvalidation----------------------
const changepassvalidation = (data) => {
  const schema = Joi.object({
    admin_id: Joi.string().required(),
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};

// -------------------------------resetpassvalidation----------------------
const resetpasswordvalidation = (data) => {
  const schema = Joi.object({
    admin_password: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};

module.exports.createvalidation = createvalidation;
module.exports.loginvalidation = loginvalidation;
module.exports.changepassvalidation = changepassvalidation;
module.exports.resetpasswordvalidation = resetpasswordvalidation;
