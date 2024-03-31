const request = require('supertest')
const app = require('../../src/app')

describe('Given the Profile id 5 and contract id 1', () => {
  test('When trying to fetch contracts with id 1', async () => {
    //Then I
    const profileId = '5'
    const contractId = 1
    const response = await request(app)
      .get(`/contracts/${contractId}`)
      .set('profile_id', profileId)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.any(Object))
  })
})

describe('Given the Profile id 4', () => {
  test('When trying to fetch contracts belonging to that Profile', async () => {
    //Then I
    const profileId = '4'
    const response = await request(app)
      .get(`/contracts`)
      .set('profile_id', profileId)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.any(Array))
    expect(response.body.length).toBeGreaterThan(0)
  })
})

describe('Given the Profile id 10', () => {
  test('When trying to fetch contracts belonging to that Profile', async () => {
    //Then I
    const profileId = '10'
    const response = await request(app)
      .get(`/contracts`)
      .set('profile_id', profileId)

    expect(response.status).toBe(401)
  })
})