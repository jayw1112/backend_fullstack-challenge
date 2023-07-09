import express, { Request, Response } from 'express'
import { db } from './db'

const app = express()
const port = process.env.PORT || 3000

app.get('/awesome/applicant', async (req: Request, res: Response) => {
  try {
    const applicant = await db.one('SELECT * FROM applicant WHERE id = $1', [1])
    res.json(applicant)
  } catch (error) {
    const err = error as Error
    res.json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
