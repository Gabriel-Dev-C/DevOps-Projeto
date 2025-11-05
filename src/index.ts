import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { sequelize } from './config/database'

const PORT = process.env.PORT || 3000

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync() // quick sync for testing
    console.log('Database connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (err) {
    console.error('Startup error', err)
    process.exit(1)
  }
}

start()
