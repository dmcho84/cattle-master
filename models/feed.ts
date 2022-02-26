'use strict';
import { Model } from 'sequelize';

interface FeedAttributes {
  id: number;
  name: string;
  type: string;
  weight: number;
  price: number;
  status: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Feed extends Model {
    id!: number;
    name!: string;
    type!: string;
    weight!: number;
    price!: number;
    status!: boolean;

    static associate(models: any) {
      Feed.hasMany(models.Feeding);
    }
  }
  Feed.init(
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
      type: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Feed',
    },
  );
  return Feed;
};
