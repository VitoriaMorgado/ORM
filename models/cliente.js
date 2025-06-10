const Sequelize = require("sequelize");
const database = require("../src/db/conn");
const Pedidos = require("./pedidos");

const Clientes = database.define(
  "clientes",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: Sequelize.STRING(14), // formato 000.000.000-00
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    underscored: true,
    freezeTableName: true,
  }
)

// has many - TEM VÁRIOS: neste caso um cliente pode ter vávios pedidos
Clientes.hasMany(Pedidos, { as: 'pedidos' })

// belongs To - PERTENCE A: cada pedido pertence à SOMENTE um cliente
Pedidos.belongsTo(Clientes, { foreignKey: 'clienteId' })

module.exports = Clientes;
