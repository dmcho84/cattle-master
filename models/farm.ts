'use strict';

import { Model } from 'sequelize';

interface FarmAttributes {
  id: number;
  name: string;
  code: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Farm extends Model<FarmAttributes> implements FarmAttributes {
    id!: number;
    name!: string;
    code!: string;

    static associate(models: any) {
      Farm.belongsToMany(models.User, {
        through: 'Members',
      });
      Farm.hasMany(models.Cow);
    }
  }
  Farm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Farm',
    },
  );
  return Farm;
};
