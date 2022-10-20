// 'use strict';
// import { Model } from 'sequelize';

// interface InseminationAttributes {
//   id: number;
//   kpn: string;
//   operator: string;
//   check: boolean;
// }

// module.exports = (sequelize: any, DataTypes: any) => {
//   class Insemination extends Model {
//     id!: number;
//     kpn!: string;
//     operator!: string;
//     check!: boolean;

//     static associate(models: any) {
//       Insemination.belongsTo(models.User); // 작성자
//       Insemination.belongsTo(models.Farm);
//       Insemination.belongsTo(models.Cow);
//     }
//   }
//   Insemination.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       kpn: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       operator: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       operationDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       check: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Insemination',
//     },
//   );
//   return Insemination;
// };
