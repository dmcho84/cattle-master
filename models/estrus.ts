'use strict';

import { Model } from 'sequelize';

interface CowAttributes {
  id: number;
  detection: string;
  allow: string;
  etc: string;
}

module.exports = (sequelize, DataTypes) => {
  class Estrus extends Model {
    id!: number;
    detection!: string;
    allow!: string;
    etc!: string;

    static associate(models) {
      Estrus.belongsTo(models.Cow);
    }
  }
  Estrus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      detection: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      allow: {
        type: DataTypes.DATE,
      },
      etc: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Estrus',
    },
  );
  return Estrus;
};
