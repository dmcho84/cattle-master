'use strict';

import { Model } from 'sequelize';

interface CowAttributes {
  id: string;
  nickname: string;
  registration: string;
  birthday: string;
  gender: string;
  classification: string;
  passage: string;
  greatGrandFather: string;
  grandFather: string;
  father: string;
  mother: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Cow extends Model<CowAttributes> implements CowAttributes {
    id!: string;
    nickname!: string;
    registration!: string;
    birthday!: string;
    gender!: string;
    classification!: string;
    passage!: string;
    greatGrandFather!: string;
    grandFather!: string;
    father!: string;
    mother!: string;

    static associate(models: any) {
      Cow.belongsTo(models.Farm);
      Cow.hasMany(models.Estrus);
      // hasMany Insemination
      // hasMany Delivery
      // hasMany Feeding
    }
  }
  Cow.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'steer'),
        allowNull: false,
      },
      classification: {
        type: DataTypes.STRING,
      },
      passage: {
        type: DataTypes.STRING,
      },
      greatGrandFather: {
        type: DataTypes.STRING,
      },
      grandFather: {
        type: DataTypes.STRING,
      },
      father: {
        type: DataTypes.STRING,
      },
      mother: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Cow',
    },
  );
  return Cow;
};
