"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLabs = listLabs;
exports.getLab = getLab;
exports.createLab = createLab;
exports.updateLab = updateLab;
exports.deleteLab = deleteLab;
const Lab_1 = require("../models/Lab");
async function listLabs(req, res) {
    const labs = await Lab_1.Lab.findAll();
    res.json(labs);
}
async function getLab(req, res) {
    const lab = await Lab_1.Lab.findByPk(req.params.id);
    if (!lab)
        return res.status(404).json({ message: 'Lab não encontrado' });
    res.json(lab);
}
async function createLab(req, res) {
    const lab = await Lab_1.Lab.create(req.body);
    res.status(201).json(lab);
}
async function updateLab(req, res) {
    const lab = await Lab_1.Lab.findByPk(req.params.id);
    if (!lab)
        return res.status(404).json({ message: 'Lab não encontrado' });
    await lab.update(req.body);
    res.json(lab);
}
async function deleteLab(req, res) {
    const lab = await Lab_1.Lab.findByPk(req.params.id);
    if (!lab)
        return res.status(404).json({ message: 'Lab não encontrado' });
    await lab.destroy();
    res.status(204).send();
}
