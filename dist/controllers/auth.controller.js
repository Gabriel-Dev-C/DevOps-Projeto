"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jwt_1 = require("../utils/jwt");
async function register(req, res) {
    const { name, email, password, role } = req.body;
    const existing = await User_1.User.findOne({ where: { email } });
    if (existing)
        return res.status(400).json({ message: 'Email já cadastrado' });
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const user = await User_1.User.create({ name, email, passwordHash, role: role || 'aluno' });
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
}
async function login(req, res) {
    const { email, password } = req.body;
    const user = await User_1.User.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ message: 'Credenciais inválidas' });
    const ok = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ message: 'Credenciais inválidas' });
    const token = (0, jwt_1.signPayload)({ id: user.id, email: user.email, role: user.role });
    res.json({ token });
}
