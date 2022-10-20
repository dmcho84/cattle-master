// 'use strict';

// import { Model } from 'sequelize';

// interface EstrusAttributes {
//   id: number;
//   detection: string;
//   allow: string;
//   etc: string;
// }

// module.exports = (sequelize: any, DataTypes: any) => {
//   class Estrus extends Model<EstrusAttributes> implements EstrusAttributes {
//     id!: number;
//     detection!: string;
//     allow!: string;
//     etc!: string;

//     static associate(models: any) {
//       Estrus.belongsTo(models.User); // 작성자
//       Estrus.belongsTo(models.Farm);
//       Estrus.belongsTo(models.Cow);
//     }
//   }
//   Estrus.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       detection: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       allow: {
//         type: DataTypes.DATE,
//       },
//       etc: {
//         type: DataTypes.STRING,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Estrus',
//     },
//   );
//   return Estrus;
// };
