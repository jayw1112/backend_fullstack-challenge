import request from 'supertest'
import app from './index'
import { db } from './db'

describe('Applicant routes', () => {
  describe('GET /awesome/applicant', () => {
    it('responds with json', async () => {
      // Send a GET request to the /awesome/applicant route
      const response = await request(app)
        .get('/awesome/applicant')
        .expect('Content-Type', /json/)
        .expect(200)

      // Log the response body to the console
      console.log(response.body)
    })
  })

  describe('POST /awesome/applicant', () => {
    it('creates an applicant and responds with json', async () => {
      // Send a POST request to the /awesome/applicant route with test data
      const response = await request(app)
        .post('/awesome/applicant')
        .send({
          first_name: 'Test',
          last_name: 'User',
          email: 'test@example.com',
          skills: ['testing'],
          hobbies: ['testing'],
        })
        .expect('Content-Type', /json/)
        .expect(200)

      // Log the response body to the console
      console.log(response.body)

      // Delete the test data from the database
      await db.none(
        'DELETE FROM applicant WHERE email = $1',
        'test@example.com'
      )
    })
  })
  // Close the database connection after all tests have been run
  afterAll(() => {
    db.$pool.end()
  })

  // Add similar blocks for the other routes...
})
