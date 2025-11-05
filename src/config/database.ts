import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/User'
import { Lab } from '../models/Lab'
import { Reservation } from '../models/Reservation'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER || 'dev',
  password: process.env.DATABASE_PASSWORD || 'dev',
  database: process.env.DATABASE_DB || 'devdb',
  models: [User, Lab, Reservation],
  logging: false,
})
