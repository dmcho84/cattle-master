// 'use strict';
// import { Model } from 'sequelize';

// interface FeedingAttributes {
//   id: number;
//   kg: number;
//   date: string;
// }
// module.exports = (sequelize: any, DataTypes: any) => {
//   class Feeding extends Model {
//     id!: number;
//     kg!: number;
//     date!: string;

//     static associate(models: any) {
//       Feeding.belongsTo(models.User); // 작성자
//       Feeding.belongsTo(models.Farm);
//       Feeding.belongsTo(models.Cow);
//       Feeding.belongsTo(models.Feed);
//     }
//   }
//   Feeding.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       kg: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       // FeedId: {
//       //   type: DataTypes.INTEGER,
//       //   allowNull: false,
//       //   primaryKey: true,
//       //   references: {
//       //     model: 'Feed',
//       //     key: 'id',
//       //   },
//       // },
//       // CowId: {
//       //   type: DataTypes.STRING,
//       //   allowNull: false,
//       //   primaryKey: true,
//       //   references: {
//       //     model: 'Cow',
//       //     key: 'id',
//       //   },
//       // },
//     },
//     {
//       sequelize,
//       modelName: 'Feeding',
//     },
//   );
//   return Feeding;
// };
