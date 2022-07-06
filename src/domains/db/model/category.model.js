const { Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'category';

const categorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class category extends Model {
  static associate(models) {
    this.hasMany(models.product, {
      as: 'product',
      foreignKey: 'id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'category',
      timestamps: false,
    };
  }
}

module.exports = { CATEGORY_TABLE, categorySchema, category };
