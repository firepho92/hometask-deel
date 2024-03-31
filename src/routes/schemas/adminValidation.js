const Joi = require('joi');

const bestProfessionValidation = (req, res, next) => {
  const schema = Joi.object({
    start: Joi.string().required(),
    end: Joi.string().required(),
  }).options({ allowUnknown: true })
  const { error } = schema.validate(req.query)
  if(error) return res.status(400).json({ error: error.details[0].message });
  next()
}

const bestClientsValidation = (req, res, next) => {
  const schema = Joi.object({
    start: Joi.string().required(),
    end: Joi.string().required(),
    limit: Joi.number().optional().default(2)
  }).options({ allowUnknown: true })
  const { error } = schema.validate(req.query)
  if(error) return res.status(400).json({ error: error.details[0].message });
  next()
}

module.exports = {
  bestProfessionValidation,
  bestClientsValidation
}