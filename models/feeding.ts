'use strict';
import { Model } from 'sequelize';

interface FeedingAttributes {
  id: number;
  kg: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Feeding extends Model {
    id!: number;
    kg!: number;

    static associate(models: any) {
      Feeding.belongsTo(models.Feed);
    }
  }
  Feeding.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      kg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Feeding',
    },
  );
  return Feeding;
};
