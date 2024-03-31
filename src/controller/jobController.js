const { Op } = require('sequelize')
const { sequelize } = require('../model')

const findUnpaid = async (req, res) => {
  const { Job, Contract } = req.app.get('models')
  const unpaidJobs = await Job.findAll({
    include: [{
      model: Contract,
      required: true,
      where: {
        [Op.or]: [
          { ContractorId: req.profile.dataValues.id },
          { ClientId: req.profile.dataValues.id }
        ],
        status: 'in_progress'
      }
    }],
    where: {
      paid: null
    }
  })
  if(unpaidJobs.length === 0) return res.status(404).end()
  res.json(unpaidJobs)
}

const pay = async (req, res) => {
  const { amount } = req.body
  const { job_id } = req.params
  const { Profile, Job, Contract } = req.app.get('models')

  if(req.profile.dataValues.balance < amount) return res.status(400).json({ message: 'insufficient funds' })

  const job = await Job.findOne({
    include: [{
      model: Contract,
      attributes: ['ContractorId'],
      required: true
    }],
    where: {
      id: job_id
    }
  })
  const contractorProfile = await Profile.findOne({
    where: { id: job.dataValues.Contract.dataValues.ContractorId },
    attributes: ['balance']
  })

  const transaction = await sequelize.transaction()
  try {
    await Profile.update(
      { balance: req.profile.dataValues.balance - amount },
      { where: { id: req.profile.dataValues.id }, transaction },
    )
    await Profile.update(
      { balance: contractorProfile.dataValues.balance + amount },
      { where: { id: job.dataValues.Contract.dataValues.ContractorId }, transaction }
    )

    await transaction.commit()
    res.status(201).end()
  } catch (error) {
    await transaction.rollback()
    console.log('error', error)
    return res.status(500).json({ message: 'oops, something went wrong, please try again' })
  }
}

module.exports = {
  findUnpaid,
  pay
}