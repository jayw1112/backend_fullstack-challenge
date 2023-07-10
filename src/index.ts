import express, { Request, Response } from 'express'
import { db } from './db'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/awesome/applicant', async (req: Request, res: Response) => {
  try {
    const applicant = await db.one('SELECT * FROM applicant WHERE id = $1', [1])
    console.log(applicant) // Log data here
    res.json(applicant)
    console.log(`Response sent: ${JSON.stringify(applicant)}`) // Log response here
  } catch (error) {
    const err = error as Error
    res.json({ error: err.message })
    console.log(
      `Error response sent: ${JSON.stringify({ error: err.message })}`
    ) // Log error response here
  }
})

app.get('/awesome/applicant/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const applicant = await db.one('SELECT * FROM applicant WHERE id = $1', [
      id,
    ])
    res.json(applicant)
  } catch (error) {
    const err = error as Error
    console.log(`Error caught: ${err.message}`) // Log error here
    res.json({ error: err.message })
  }
})

app.post('/awesome/applicant', async (req: Request, res: Response) => {
  try {
    const newApplicant = await db.one(
      'INSERT INTO applicant(first_name, last_name, email, skills, hobbies) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.skills,
        req.body.hobbies,
      ]
    )
    res.json(newApplicant)
  } catch (error) {
    const err = error as Error
    console.log(`Error caught: ${err.message}`) // Log error here
    res.json({ error: err.message })
  }
})

app.put('/awesome/applicant/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const updatedApplicant = await db.one(
      'UPDATE applicant SET first_name = $1, last_name = $2, email = $3, skills = $4, hobbies = $5 WHERE id = $6 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.skills,
        req.body.hobbies,
        id,
      ]
    )
    res.json(updatedApplicant)
  } catch (error) {
    const err = error as Error
    console.log(`Error caught: ${err.message}`) // Log error here
    res.json({ error: err.message })
  }
})

app.delete('/awesome/applicant/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deletedApplicant = await db.one(
      'DELETE FROM applicant WHERE id = $1 RETURNING *',
      [id]
    )
    res.json(deletedApplicant)
  } catch (error) {
    const err = error as Error
    console.log(`Error caught: ${err.message}`) // Log error here
    res.json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
