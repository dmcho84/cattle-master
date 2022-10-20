'use strict';
const { Model } = require('sequelize');

interface MemberAttributes {
  FarmId: number;
  UserId: string;
  position: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Member extends Model<MemberAttributes> implements MemberAttributes {
    FarmId!: number;
    UserId!: string;
    position!: string;

    static associate(models: any) {
      // define association here
    }
  }
  Member.init(
    {
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
      position: {
        allowNull: false,
        type: DataTypes.ENUM('owner', 'member', 'observer'),
        defaultValue: 'observer'
      }
    },
    {
      sequelize,
      modelName: 'Member',
    },
  );
  return Member;
};
