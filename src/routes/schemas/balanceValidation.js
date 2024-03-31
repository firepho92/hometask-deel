const Joi = require('joi');

const depositValidation = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().greater(0),
  }).options({ allowUnknown: true })
  const { error } = schema.validate(req.body)
  if(error) return res.status(400).json({ error: error.details[0].message });
  next()
}

module.exports = {
  depositValidation
}