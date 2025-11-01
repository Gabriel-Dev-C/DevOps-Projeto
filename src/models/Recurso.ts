import { DataTypes } from "sequelize";
import { sequelize } from "../config/db"; // ajuste o caminho se necessário

export const Recurso = sequelize.define("Recurso", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "disponível", // disponível, manutenção, emprestado
  },
  dataAquisicao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
