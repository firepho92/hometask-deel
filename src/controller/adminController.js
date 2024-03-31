const { fn, col, Op } = require('sequelize');

const bestProfession = async (req, res) => {
  const { Job, Contract, Profile } = req.app.get('models')
  const { start, end } = req.query
  const jobsByProfession = await Job.findAll({
    attributes: [
      'Contract.ContractorId',
      [fn('SUM', col('Job.price')), 'totalPaid'],
    ],
    include: [{
      model: Contract,
      required: true,
      include: [{
        model: Profile,
        as: 'Contractor'
      }]
    }],
    group: ['Contract.ContractorId'],
    where: { 
      paid: true,
      [Op.and]: [
        {
          paymentDate: {
            [Op.between]: [start, end]
          }
        }
      ]
    },
    order: [['totalPaid', 'DESC']],
    limit: 1
  })

  res.json({'bestProfession': jobsByProfession[0].dataValues.Contract.dataValues.Contractor.profession})
}

const bestClients = async (req, res) => {
  const { Job, Contract, Profile } = req.app.get('models')
  const { start, end, limit = 2 } = req.query
  const jobsByClient = await Job.findAll({
    attributes: [
      'Contract.ClientId',
      [fn('SUM', col('Job.price')), 'totalPaid'],
    ],
    include: [{
      model: Contract,
      required: true,
      include: [{
        model: Profile,
        as: 'Client'
      }]
    }],
    group: ['Contract.ClientId'],
    where: { 
      paid: true,
      [Op.and]: [
        {
          paymentDate: {
            [Op.between]: [start, end]
          }
        }
      ]
    },
    order: [['totalPaid', 'DESC']],
    limit
  })
  const bestClients = jobsByClient.map(jobsByClient => {
    const client = jobsByClient.dataValues.Contract.dataValues.Client
    return `${client.firstName} ${client.lastName}`
  })
  res.json({'best clients': bestClients})
}

module.exports = {
  bestProfession,
  bestClients
}