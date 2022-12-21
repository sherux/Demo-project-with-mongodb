const Joi = require("joi");
const registervalidation = (data) => {
  const schema = Joi.object({
    role_name: Joi.string().trim().min(3).required(),
    role_description: Joi.string().trim().max(300).required(),
    role_status: Joi.string().required(),
  });
  return schema.validate(data);
};

const updatevalidation = (data) => {
  const schema = Joi.object({
    role_name: Joi.string().trim().min(3).required(),
    role_description: Joi.string().trim().max(300).required(),
    role_status: Joi.string().required(),
  });
  return schema.validate(data);
};
module.exports.registervalidation = registervalidation;
module.exports.updatevalidation = updatevalidation;
