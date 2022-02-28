'use strict';

import { Model } from 'sequelize';

interface FarmAttributes {
  id: number;
  name: string;
  code: string;
  // owner: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Farm extends Model<FarmAttributes> implements FarmAttributes {
    id!: number;
    name!: string;
    code!: string;
    // owner!: string;

    static associate(models: any) {
      Farm.belongsToMany(models.User, {
        through: 'Members',
      });
      Farm.belongsTo(models.User, { as: 'Master', foreignKey: 'MasterId' });
      Farm.hasMany(models.Cow); // 개체정보
      Farm.hasMany(models.Boarn); // 분만
      Farm.hasMany(models.Estrus); // 발정
      Farm.hasMany(models.Feeding); // 사료 급여
      Farm.hasMany(models.Insemination); // 인공수정
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
      // owner: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //   },
      // },
    },
    {
      sequelize,
      modelName: 'Farm',
    },
  );
  return Farm;
};
