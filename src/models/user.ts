'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      User.belongsToMany(models.Farm, {
        through: 'Members',
      });
      User.hasMany(models.Farm, { as: 'Master', foreignKey: 'MasterId' });
      User.hasMany(models.Cow); // 개체정보
      User.hasMany(models.Boarn); // 분만
      User.hasMany(models.Estrus); // 발정
      User.hasMany(models.Feeding); // 사료 급여
      User.hasMany(models.Insemination); // 인공수정
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
