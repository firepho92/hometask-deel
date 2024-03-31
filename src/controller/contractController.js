const { Op } = require('sequelize');

const findAll = async (req, res) => {
  const { Contract } = req.app.get('models')
  const contract = await Contract.findAll({
    where: {
      [Op.or]: [
        { ContractorId: req.profile.dataValues.id },
        { ClientId: req.profile.dataValues.id }
      ],
      [Op.not]: [
        { status: 'terminated' }
      ]
    }
  })
  if(contract.length === 0) return res.status(404).end()
  res.json(contract)
}

const findById = async (req, res) => {
  const { Contract } = req.app.get('models')
  const {id} = req.params
  const contract = await Contract.findOne({
    where: {
      id: id,
      [Op.or]: [
        { ContractorId: req.profile.dataValues.id },
        { ClientId: req.profile.dataValues.id }
      ]
    }
  })
  if(!contract) return res.status(404).end()
  res.json(contract)
}

module.exports = {
  findAll,
  findById
}