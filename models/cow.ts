'use strict';

import { Model, UUIDV4 } from 'sequelize';

interface CowAttributes {
  id: string;
  identification: string;
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
    identification!: string;
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
      Cow.belongsTo(models.User); // 작성자
      Cow.belongsTo(models.Farm);
      Cow.hasMany(models.Estrus);
      Cow.hasMany(models.Insemination);
      Cow.hasMany(models.Boarn, { as: 'Children', foreignKey: 'CowId' });
      Cow.hasMany(models.Feeding);
      // Cow.hasOne(models.Cow, { as: 'Mother', foreignKey: 'MotherId' });

      // Cow.hasOne(models.Boarn, { as: 'self', foreignKey: 'SelfId' });
      // Cow.belongsTo(models.Boarn, { as: 'Self', foreignKey: 'SelfId' });

      // Cow.belongsTo(models.Boarn, { as: 'Self' });
      // hasMany Delivery
      // hasMany Feeding
    }
  }
  Cow.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      identification: {
        type: DataTypes.STRING,
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
