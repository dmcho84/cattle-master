'use strict';
const {
  Model
} = require('sequelize');

interface FarmAttributes {
  FarmId: number;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Member extends Model {

    FarmId!: number;
    UserId!: string;
    
    static associate(models: any) {
      // define association here
    }
  }
  Member.init({

    FarmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Farms',
        key: 'id',
      },
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};