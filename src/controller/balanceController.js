const { sequelize } = require('../model')

const deposit = async (req, res) => {
  const { amount } = req.body
  const { userId } = req.params
  const { Job, Contract, Profile } = req.app.get('models')

  const jobs = await Job.findAll({
    include: [{
      model: Contract,
      where: { ClientId: userId },
      required: true,
    }],
    where: { paid: null }
  })

  const client = await Profile.findOne({
    where: {id: userId},
    attributes: ['balance']
  })
  const depositLimit = 0.25 * (jobs.reduce((acc, current)=> acc + current.dataValues.price, 0))

  if(amount > depositLimit) return res.status(400).json({ message: 'exceeded deposit amount' })

  const transaction = await sequelize.transaction()

  try {
    await Profile.update(
      { balance: client.dataValues.balance + amount },
      { where: { id: userId }, transaction }
    )
    
    await transaction.commit()
    res.status(201).end()
  } catch (error) {
    await transaction.rollback()
    console.log('error', error)
    res.status(500).json({ message: 'oops, something went wrong, please try again' })
  }

  res.status(201).end()
}

module.exports = {
  deposit
}