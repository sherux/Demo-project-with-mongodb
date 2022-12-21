const Joi = require("joi");
// ----------------------------------register validation---------------------------------
const registervalidation = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().trim().min(3).required(),
    user_email: Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

    user_password: Joi.string().min(6).trim().required(),
    user_mobile: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    user_country: Joi.string().trim().min(3).required(),
    user_city: Joi.string().trim().min(3).required(),
  });
  return schema.validate(data);
};

// ----------------------------------login validation---------------------------------

const loginvalidation = (data) => {
  const schema = Joi.object({
    user_email: Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    user_password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
// ------------------update validation------------------
const updatevalidation = (data) => {
  const schema = Joi.object({
    user_mobile: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    user_country: Joi.string().trim().min(3).required(),
    user_city: Joi.string().trim().min(3).required(),
  });
  return schema.validate(data);
};
// ---------------------------------change-password---------------------
const changepassvalidation = (data) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};
// ---------------------------------reset-password--------------------------
const resetpasswordvalidation = (data) => {
  const schema = Joi.object({
    user_password: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};
// --------------------------------------module export-----------------------

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;
module.exports.updatevalidation = updatevalidation;
module.exports.changepassvalidation = changepassvalidation;
module.exports.resetpasswordvalidation = resetpasswordvalidation;
