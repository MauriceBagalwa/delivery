module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "typeRequest",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATA,
        defaultValue: DataTypes.NOW,
      },
      updateAt: {
        type: DataTypes.DATA,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "typereRequest",
      timestamps: false,
    }
  );
};
