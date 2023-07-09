import { db } from './db'

const createTable = async () => {
  await db.none(
    'CREATE TABLE IF NOT EXISTS applicant (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, skills TEXT[], hobbies TEXT[], created_at TIMESTAMP DEFAULT NOW())'
  )
  console.log('Table created successfully.')
}

createTable()
