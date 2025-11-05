"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReservations = listReservations;
exports.getReservation = getReservation;
exports.createReservation = createReservation;
exports.deleteReservation = deleteReservation;
const Reservation_1 = require("../models/Reservation");
const Lab_1 = require("../models/Lab");
const User_1 = require("../models/User");
const sequelize_1 = require("sequelize");
async function listReservations(req, res) {
    const user = req.user;
    if (user.role === 'admin') {
        const all = await Reservation_1.Reservation.findAll({ include: [User_1.User, Lab_1.Lab] });
        return res.json(all);
    }
    const mine = await Reservation_1.Reservation.findAll({ where: { userId: user.id }, include: [Lab_1.Lab] });
    res.json(mine);
}
async function getReservation(req, res) {
    const r = await Reservation_1.Reservation.findByPk(req.params.id);
    if (!r)
        return res.status(404).json({ message: 'Reserva não encontrada' });
    res.json(r);
}
async function createReservation(req, res) {
    const { labId, startAt, endAt } = req.body;
    const user = req.user;
    const lab = await Lab_1.Lab.findByPk(labId);
    if (!lab)
        return res.status(400).json({ message: 'Lab inválido' });
    // overlap check
    const conflicts = await Reservation_1.Reservation.count({
        where: {
            labId,
            [sequelize_1.Op.not]: {
                [sequelize_1.Op.or]: [
                    { endAt: { [sequelize_1.Op.lte]: new Date(startAt) } },
                    { startAt: { [sequelize_1.Op.gte]: new Date(endAt) } }
                ]
            }
        }
    });
    if (conflicts > 0)
        return res.status(400).json({ message: 'Horário indisponível' });
    const reservation = await Reservation_1.Reservation.create({ labId, userId: user.id, startAt, endAt });
    res.status(201).json(reservation);
}
async function deleteReservation(req, res) {
    const r = await Reservation_1.Reservation.findByPk(req.params.id);
    if (!r)
        return res.status(404).json({ message: 'Reserva não encontrada' });
    await r.destroy();
    res.status(204).send();
}
