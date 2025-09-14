const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(20).required(),
  company: Joi.string().min(2).max(100).required(),
  street: Joi.string().min(5).max(200).required(),
  city: Joi.string().min(2).max(100).required(),
  zipcode: Joi.string().min(3).max(20).required(),
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id || id <= 0) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  req.params.id = id;
  next();
};

module.exports = { validateUser, validateUserId };
