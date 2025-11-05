"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = listUsers;
const User_1 = require("../models/User");
async function listUsers(req, res) {
    const users = await User_1.User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
    res.json(users);
}
