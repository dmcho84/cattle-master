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
      Boarn.belongsTo(models.Cow, { as: 'Children', foreignKey: 'CowId' });
      Boarn.belongsTo(models.Cow, { as: 'Self', foreignKey: 'selfId' });
      Boarn.belongsTo(models.User); // 작성자
      Boarn.belongsTo(models.Farm); // 작성자

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
    },
    {
      sequelize,
      modelName: 'Boarn',
    },
  );
  return Boarn;
};
