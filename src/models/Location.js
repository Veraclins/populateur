export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
      },
      male: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      female: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      total: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {}
  );
  Location.associate = models => {
    Location.hasMany(models.Location, {
      foreignKey: 'parentId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'subLocation',
    });
    Location.belongsTo(models.Location, {
      foreignKey: 'parentId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'parent',
    });
  };
  return Location;
};
