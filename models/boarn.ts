'use strict';
import { Model } from 'sequelize';

interface BoarnAttributes {
  id: number;
  birthday: string;
  gender: string;
  weight: number;
  status: string;
  etc: string;
  // selfId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Boarn extends Model<BoarnAttributes> implements BoarnAttributes {
    id!: number;
    birthday!: string;
    gender!: string;
    weight!: number;
    status!: string;
    etc!: string;
    // selfId!: number;

    static associate(models: any) {
      // Boarn.hasOne(models.Cow, { as: 'Self' });
      Boarn.belongsTo(models.Cow, { as: 'Children', foreignKey: 'MotherId' });
      Boarn.belongsTo(models.Cow, { as: 'Self', foreignKey: 'selfId' });
      // Boarn.hasOne(models.Cow, { as: 'Self', foreignKey: 'SelfId' });
    }
  }
  Boarn.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'steer'),
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      etc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // selfId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Cows',
      //     key: 'id',
      //   },
      // },
    },
    {
      sequelize,
      modelName: 'Boarn',
    },
  );
  return Boarn;
};
