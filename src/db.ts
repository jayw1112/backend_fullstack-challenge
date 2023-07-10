import pgPromise from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const pgp = pgPromise()

const config = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'), // Default PostgreSQL port is 5432
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}
console.log(config)

export const db = pgp(config)
