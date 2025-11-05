"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const Lab_1 = require("../models/Lab");
const Reservation_1 = require("../models/Reservation");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT || 5432),
    username: process.env.DATABASE_USER || 'dev',
    password: process.env.DATABASE_PASSWORD || 'dev',
    database: process.env.DATABASE_DB || 'devdb',
    models: [User_1.User, Lab_1.Lab, Reservation_1.Reservation],
    logging: false,
});
